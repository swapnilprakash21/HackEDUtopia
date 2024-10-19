import { Alert, AlertTitle } from '@mui/material'
import Link from 'next/link'
import React from 'react'

interface Props {
    page: string,
    children: React.ReactNode,
    error: boolean,
    success?: boolean,
    response: string,
    errorTitle: string
}

const AuthBox = (props: Props) => {
    return (
        <>
            <div className="my-8 mx-auto w-full sm:w-[30rem] p-4 flex flex-col justify-center bg-white shadow-xl rounded-2xl">
                <div className="my-6 self-center">
                    <div className="bg-slate-300 rounded-lg px-2 md:px-3 py-2 flex space-x-2 md:space-x-3 w-fit">
                        <Link href={"/account/login"}>
                            <div className={`${props.page === "login" ? "bg-gray-900 text-white" : "bg-transparent hover:bg-pink-600 hover:text-white text-gray-800"} p-3 w-36 sm:w-40 text-center rounded-lg`}>
                                <span className="font-bold text-xl">Login</span>
                            </div>
                        </Link>
                        <Link href={"/account/sign-up"}>
                            <div className={`${props.page === "signup" ? "bg-gray-900 text-white" : "bg-transparent hover:bg-pink-600 hover:text-white text-gray-800"} p-3 w-36 sm:w-40 text-center rounded-lg`}>
                                <span className="font-bold text-xl">Sign Up</span>
                            </div>
                        </Link>
                    </div>
                </div>
                {props.error && <div className="mb-4 px-6">
                    <Alert severity="error" variant="outlined" >
                        <AlertTitle>
                            <div className="flex justify-between">
                                <strong className="text-red-700">{props.errorTitle}</strong>
                            </div>
                        </AlertTitle>
                        <span className="text-red-500 font-semibold">{props.response}</span>
                    </Alert>
                </div>}
                {props.success && <div className="mb-4 px-6">
                    <Alert severity="success" variant="outlined" >
                        <AlertTitle>
                            <div className="flex justify-between">
                                <strong className="text-green-700">Success</strong>
                            </div>
                        </AlertTitle>
                        <span className="text-green-500 font-semibold">{props.response}</span>
                    </Alert>
                </div>}
                <h1 className="text-3xl font-bold mb-4 text-center">{props.page === "login" ? "Login" : props.page === "signup" ? "Sign Up" : props.page === "forgot-password" ? "Reset Your Password" : ""}</h1>
                <div className="my-4 flex flex-col px-1.5 sm:px-6">
                    {props.children}
                </div>
            </div>
        </>
    )
}

export default AuthBox
