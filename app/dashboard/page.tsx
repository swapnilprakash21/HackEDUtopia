import ironSessionConfig from '@/lib/iron-session/IronSessionConf';
import { cookies } from 'next/headers';
import React from 'react'
import { IronSession, getIronSession } from 'iron-session';
import Session from '@/lib/iron-session/SessionInterface';
import { redirect } from 'next/navigation';
import DashboardMain from './DashboardMain';
import Sidebar from '@/components/dashboard/Sidebar';
import Footer from '@/components/Footer';

const DashboardPage = async () => {
    const session: IronSession<Session> = await getIronSession(cookies(), ironSessionConfig);
    if (session.hasOwnProperty("user") && session.user.hasOwnProperty("loggedin") && session.user.loggedin === true) {
        return (
            <>
                <title>{`Dashboard - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
                <Sidebar page='dashboard' />
                <div className="ml-80">
                    <DashboardMain />
                    <Footer />
                </div>
            </>
        )
    }
    else {
        redirect("/account/login")
    }
}

export default DashboardPage
