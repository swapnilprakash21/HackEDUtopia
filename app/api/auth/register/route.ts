import ironSessionConfig from "@/lib/iron-session/IronSessionConf"
import Session from "@/lib/iron-session/SessionInterface"
import verifyJWT from "@/lib/verifyJWT"
import connectDB from "@/middleware/DBConfig"
import OTP from "@/models/OTP"
import User from "@/models/User"
import bcrypt from "bcrypt"
import { IronSession, getIronSession } from "iron-session"
import jwt, { decode } from "jsonwebtoken"
import { cookies } from "next/headers"
import nodemailer, { TransportOptions } from "nodemailer"
import validator from "validator"

export async function POST(request: Request) {
    const body = await request.json()
    if (body.action === "SEND_VERIFICATION_CODE") {
        let mailTransporter = nodemailer.createTransport({
            host: process.env.SMTPHOST, // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            auth: {
                user: process.env.SMTPAUTHUSER,
                pass: process.env.SMTPAUTHPASS,
            }
        } as TransportOptions);
        let { email } = body
        email = email.trim()
        if (!validator.isEmail(email)) {
            return Response.json({ message: "Please enter a valid email address to proceed." }, { status: 400 })
        }

        await connectDB()

        const findUser = await User.findOne({ email })

        if (findUser !== null && typeof findUser !== undefined && Object.keys(findUser).length !== 0) {
            return Response.json({ message: "An account with this email address already exists. Please login or try again with a different email address." }, { status: 400 })
        }
        // generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000)
        // send OTP to email
        let mailDetails = {
            from: `${process.env.NEXT_PUBLIC_APP_NAME} <hyiandar.com@gmail.com>`,
            to: email,
            subject: `Email Address Verification - ${process.env.NEXT_PUBLIC_APP_NAME}`,
            html: `<!DOCTYPE html> <html lang="en"> <body> <p> Dear valued user,</p><p>A sign up attempt on <a href="${process.env.NEXT_PUBLIC_HOST}" target="_blank" rel="noopener noreferrer">${process.env.NEXT_PUBLIC_APP_NAME}</a> requires further verification. Please enter the OTP given below to continue with the sign up process: </p> <h2><strong>${otp}</strong></h2><p>If this wasn&apos;t you, someone may have mistyped their email address. Keep this code to yourself, and no other action is needed at this moment.</p><p><strong>Please do not share this OTP with anyone.</strong></p><p>Sincerely,</p> <p>${process.env.NEXT_PUBLIC_APP_NAME} Team</p> </body> </html>`
        };
        if (await OTP.findOne({ email })) {
            await OTP.findOneAndUpdate({ email }, { otp, action: "SIGNUP", attempts: 0 })
            if (await mailTransporter.sendMail(mailDetails)) {
                return Response.json({ success: true, message: "An email with the OTP has been sent to your email address" })
            }
            else {
                return Response.json({ success: false, message: "Internal Server Error" })
            }
        }
        else {
            if (await new OTP({ email, otp, action: "SIGNUP" }).save()) {
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
    else if (body.action === "VERIFY_OTP") {
        const { email, otp } = body
        if (validator.isEmpty(otp) || !validator.isInt(otp, { min: 100000, max: 999999 })) {
            return Response.json({ success: false, message: "Please enter a valid OTP" }, { status: 400 })
        }
        await connectDB()
        let verifyOTP = await OTP.findOne({ email, action: "SIGNUP" })
        if (verifyOTP !== null && typeof verifyOTP !== undefined) {
            if (verifyOTP.otp === parseInt(otp) && verifyOTP.attempts <= 5) {
                // generate a jwt token which will be used later during the sign up process
                let token = jwt.sign({ otp, email, action: "SIGNUP" }, process.env.JWTSECRET!, { expiresIn: "30m" })
                return Response.json({ success: true, message: "", token })
            }
            else {
                if (verifyOTP.attempts < 5) {
                    await OTP.findOneAndUpdate({ email, action: "SIGNUP" }, { attempts: verifyOTP.attempts + 1 })
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
    else if (body.action === "REGISTER") {
        const { token } = body
        if (verifyJWT(token)) {

            // extracting payload from the jwt token
            let tokenDetails = decode(token)
            const { email, action: tokenAction } = tokenDetails as { email: string, action: string }

            if (tokenAction !== "SIGNUP") {
                return Response.json({ success: false, message: "Malformed Request" }, { status: 400 })
            }

            // extracting the name and password from the request body
            let { full_name, password, confirm_password } = body
            full_name = full_name.trim()

            if (validator.isEmpty(password) || !validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
                return Response.json({ success: false, message: "Your password should be a minimum of 8 characters long and should include at least one uppercase letter, one lowercase letter, one number, and one special symbol." }, { status: 400 })
            }
            if (validator.contains(password, " ")) {
                return Response.json({ success: false, message: "Your password should not contain any spaces" }, { status: 400 })
            }
            if (!validator.equals(password, confirm_password)) {
                return Response.json({ success: false, message: "Passwords do not match" }, { status: 400 })
            }
            if (validator.isEmpty(full_name) || !validator.contains(full_name, " ") || !validator.isLength(full_name, { min: 3, max: 50 })) {
                return Response.json({ success: false, message: "Please enter a valid full name" }, { status: 400 })
            }
            await connectDB()
            const user = await User.findOne({ email })
            if (user !== null && user !== undefined && Object.keys(user).length !== 0) {
                return Response.json({ success: false, message: "An account with this email address already exists. Please login or try again with a different email address." }, { status: 400 })
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            if (await new User({ email, password: hashedPassword, name: full_name }).save()) {
                const session: IronSession<Session> = await getIronSession(cookies(), ironSessionConfig)
                const findUser = await User.findOne({ email })
                if (findUser === null || findUser === undefined || Object.keys(findUser).length === 0) {
                    return Response.json({ success: false, message: "An error occured. Please refresh the page and try again." }, { status: 500 })
                }
                session.user = {
                    loggedin: true,
                    email: email,
                    userID: findUser._id
                }
                await session.save()
                return Response.json({ success: true, message: "Account created successfully" }, { status: 201 })
            }
            else {
                return Response.json({ success: false, message: "An error occured. Please refresh the page and try again." }, { status: 500 })
            }
        }
        else {
            return Response.json({ success: false, message: "Malformed Request" }, { status: 400 })
        }
    }
    else {
        return Response.json({ success: false, message: "Malformed Request" }, { status: 400 })
    }
}