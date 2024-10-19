import ironSessionConfig from '@/lib/iron-session/IronSessionConf';
import Session from '@/lib/iron-session/SessionInterface';
import connectDB from '@/middleware/DBConfig';
import User from '@/models/User';
import { IronSession, getIronSession } from 'iron-session';
import bcrypt from "bcrypt"
import { cookies } from 'next/headers';

export async function POST(request: Request, response: Response) {
    const body = await request.json()
    const session : IronSession<Session> = await getIronSession(cookies(), ironSessionConfig)
    if (session.hasOwnProperty("user") && session.user.hasOwnProperty("loggedin") && session.user.loggedin === true) {
        return Response.json({ message: "Already Logged In" }, { status: 400 })
    }
    if (body.hasOwnProperty("email") && body.hasOwnProperty("password")) {
        let {email, password} = body
        email = email.trim()
        password = password.trim()
        if (email === "" || password === "") {
            return Response.json({ message: "Please enter a valid email address and password to proceed." }, { status: 400 })
        }
        await connectDB()
        const findUser = await User.findOne({ email })
        if(findUser !== null && findUser !== undefined){
            if(bcrypt.compareSync(password, findUser.password)){
                session.user = {
                    loggedin: true,
                    email: findUser.email,
                    userID: findUser._id
                }
                await session.save()
                return Response.json({ message: "Logged In Successfully" }, { status: 200 })
            }
            else{
                return Response.json({ message: "The credentials you have provided are invalid. Please double-check the information and try again." }, { status: 400 })
            }
        }
        else{
            return Response.json({ message: "The credentials you have provided are invalid. Please double-check the information and try again." }, { status: 400 })
        }
    }
}