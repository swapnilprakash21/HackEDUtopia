import React from 'react'
import { IronSession, getIronSession } from 'iron-session';
import Session from '@/lib/iron-session/SessionInterface';
import { cookies } from 'next/headers';
import ironSessionConfig from '@/lib/iron-session/IronSessionConf';
import { redirect } from 'next/navigation';
import SignUpMain from './SignUpMain'

const SignUpPage = async () => {
    const session: IronSession<Session> = await getIronSession(cookies(), ironSessionConfig);
    if (session.hasOwnProperty("user") && session.user.hasOwnProperty("loggedin") && session.user.loggedin === true) {
        redirect("/dashboard")
    }
    return (
        <>
            <title>{`Sign Up - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
            <div className="min-h-screen bg-[#ECECEC]">
                <div className="flex justify-center items-center">
                    <SignUpMain />
                </div>
            </div>
        </>
    )
}

export default SignUpPage
