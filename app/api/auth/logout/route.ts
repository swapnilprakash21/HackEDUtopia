import ironSessionConfig from '@/lib/iron-session/IronSessionConf';
import Session from '@/lib/iron-session/SessionInterface';
import { IronSession, getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export async function POST(request: Request, response: Response) {
    const body = await request.json()
    const session: IronSession<Session> = await getIronSession(cookies(), ironSessionConfig)
    session.destroy()
    return Response.json({ message: "You have been successfully logged out of your account" }, { status: 200 })
}