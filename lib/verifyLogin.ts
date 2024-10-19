"use server"

import { IronSession, getIronSession } from "iron-session";
import Session from "./iron-session/SessionInterface";
import { cookies } from "next/headers";
import ironSessionConfig from "./iron-session/IronSessionConf";
import connectDB from "@/middleware/DBConfig";
import User from "@/models/User";

const verifyLogin = async () => {
    const session: IronSession<Session> = await getIronSession(cookies(), ironSessionConfig);
    if (session.user == undefined || session.user == null) {
        return false;
    }
    await connectDB()
    const findUser = await User.findOne({ email: session.user.email })
    if (findUser !== null && typeof findUser !== undefined && Object.keys(findUser).length > 0) {
        if (findUser.suspended) {
            return false
        }
    }
    else {
        return false
    }
    return true
}

export default verifyLogin