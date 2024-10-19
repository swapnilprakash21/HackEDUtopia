import connectDB from "@/middleware/DBConfig"
import User from "@/models/User"
import nodemailer, { TransportOptions } from "nodemailer"
import OTP from "@/models/OTP"
import jwt, { decode } from "jsonwebtoken"
import validator from "validator"
import verifyJWT from "@/lib/verifyJWT"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
    const body = await request.json()
    if (body.hasOwnProperty("action") && body.action === "SEND_VERIFICATION_CODE") {
        let { email } = body
        email = email.trim()
        if (email === "" || !validator.isEmail(email)) {
            return Response.json({ error: true, message: "Please enter a valid email address to proceed." }, { status: 400 })
        }
        await connectDB()
        let mailTransporter = nodemailer.createTransport({
            host: process.env.SMTPHOST, // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            auth: {
                user: process.env.SMTPAUTHUSER,
                pass: process.env.SMTPAUTHPASS,
            }
        } as TransportOptions);
        const findUser = await User.findOne({ email })
        if (findUser !== null && typeof findUser !== undefined && Object.keys(findUser).length !== 0) {
            const otp = Math.floor(100000 + Math.random() * 900000)
            const mailDetails = {
                from: `${process.env.NEXT_PUBLIC_APP_NAME} <hyiandar.com@gmail.com>`,
                to: email,
                subject: `Password Reset Verification - ${process.env.NEXT_PUBLIC_APP_NAME}`,
                html: `<!DOCTYPE html> <html lang="en"> <body> <p> Dear ${findUser.name},</p><p>A password reset attempt on <a href="${process.env.NEXT_PUBLIC_HOST}" target="_blank" rel="noopener noreferrer">${process.env.NEXT_PUBLIC_APP_NAME}</a> requires further verification. Please enter the OTP given below to continue with the password reset process: </p> <h2><strong>${otp}</strong></h2><p>If this wasn&apos;t you, someone may have mistyped their email address. Keep this code to yourself, and no other action is needed at this moment.</p><p><strong>Please do not share this OTP with anyone.</strong></p><p>Sincerely,</p> <p>${process.env.NEXT_PUBLIC_APP_NAME} Team</p> </body> </html>`

            }
            if (await OTP.findOne({ email })) {
                await OTP.findOneAndUpdate({ email }, { otp, action: "RESET_PASSWORD", attempts: 0 })
                if (await mailTransporter.sendMail(mailDetails)) {
                    return Response.json({ success: true, message: "An email with the OTP has been sent to your email address" })
                }
                else {
                    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 })
                }
            }
            else {
                if (await new OTP({ email, otp, action: "RESET_PASSWORD" }).save()) {
                    if (await mailTransporter.sendMail(mailDetails)) {
                        return Response.json({ success: true, message: "An email with the OTP has been sent to your email address" })
                    }
                    else {
                        return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 })
                    }
                }
                else {
                    return Response.json({ success: false, message: "An error occured. Please refresh the page and try again." }, { status: 500 })
                }
            }
        }
        else{
            return Response.json({ success: false, message: "We couldn't find any account associated with the email address you provided. Please consider signing up for a new account." }, { status: 400 })
        }
    }
    else if (body.hasOwnProperty("action") && body.action === "VERIFY_OTP") {
        let { email, otp } = body
        email = email.trim()
        await connectDB()
        const verifyOTP = await OTP.findOne({ email, action: "RESET_PASSWORD" })
        if (verifyOTP !== null && typeof verifyOTP !== undefined && Object.keys(verifyOTP).length !== 0) {
            if (verifyOTP.otp === parseInt(otp) && verifyOTP.attempts <= 5) {
                // generate a jwt token which will be used later during the sign up process
                let token = jwt.sign({ otp, email, action: "RESET_PASSWORD" }, process.env.JWTSECRET!, { expiresIn: "30m" })
                return Response.json({ success: true, message: "", token })
            }
            else {
                if (verifyOTP.attempts < 5) {
                    await OTP.findOneAndUpdate({ email, action: "RESET_PASSWORD" }, { attempts: verifyOTP.attempts + 1 })
                    return Response.json({ success: false, message: `Please enter a valid OTP to proceed. You have ${5 - verifyOTP.attempts} attempts remaining.` }, { status: 400 })
                }
                else {
                    return Response.json({ success: false, message: "You have exceeded the number of attempts to verify your email." }, { status: 400 })
                }
            }
        }
        else {
            return Response.json({ success: false, message: "Something went wrong. Please refresh the page and try again." }, { status: 500 })
        }
    }
    else if (body.hasOwnProperty("action") && body.action === "RESET_PASSWORD") {
        let { password, confirm_password, token } = body
        if (verifyJWT(token)) {
            let tokenDetails = decode(token)
            const { email, action: tokenAction } = tokenDetails as { email: string, action: string }

            if (tokenAction !== "RESET_PASSWORD") {
                return Response.json({ success: false, message: "Malformed Request" }, { status: 400 })
            }

            if (validator.isEmpty(password) || !validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
                return Response.json({ success: false, message: "Your password should be a minimum of 8 characters long and should include at least one uppercase letter, one lowercase letter, one number, and one special symbol." }, { status: 400 })
            }
            if (validator.contains(password, " ")) {
                return Response.json({ success: false, message: "Your password should not contain any spaces" }, { status: 400 })
            }
            if (!validator.equals(password, confirm_password)) {
                return Response.json({ success: false, message: "Passwords do not match" }, { status: 400 })
            }
            await connectDB()
            const findUser = await User.findOne({ email })
            if (findUser !== null && typeof findUser !== undefined && Object.keys(findUser).length !== 0) {
                await OTP.findOneAndDelete({ email, action: "RESET_PASSWORD" })
                const hashedPassword = await bcrypt.hash(password, 10)
                const updatePassword = await User.findOneAndUpdate({ email }, { password: hashedPassword })
                if(updatePassword){
                    return Response.json({ success: true, message: "Your password has been successfully reset. You can now login using your new password." })
                }
                else{
                    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 })
                }
            }
            else{
                return Response.json({ success: false, message: "An error occured. Please refresh the page and try again." }, { status: 500 })
            }
        }
        else{
            return Response.json({ success: false, message: "Malformed Request" }, { status: 400 })
        }
    }
    else{
        return Response.json({ success: false, message: "Malformed Request" }, { status: 400 })
    }
}