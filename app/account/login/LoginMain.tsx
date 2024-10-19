"use client"

import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AuthBox from '../components/AuthBox'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'


const LoginMain = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState(false)
    const [response, setResponse] = useState("")

    const handleLogin = async () => {
        setProcessing(true)
        setError(false)
        setResponse("")
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/login`, { email, password })
            if (res.status === 200) {
                setError(false)
                setResponse(res.data.message)
                router.push("/dashboard")
                router.refresh()
            }
            else {
                setProcessing(false)
                setError(true)
                setResponse(res.data.message)
                window.scrollTo({ top: 0, behavior: "smooth" })
            }
        } catch (error: any) {
            setProcessing(false)
            if (error.hasOwnProperty("response") && error.response.hasOwnProperty("data") && error.response.data.hasOwnProperty("message")) {
                setError(true)
                setResponse(error.response.data.message)
                window.scrollTo({ top: 0, behavior: "smooth" })
            }
            else {
                setError(true)
                setResponse("An error occurred. Please try again later.")
                window.scrollTo({ top: 0, behavior: "smooth" })
            }
        }
    }
    return (
        <>

            <AuthBox page="login" error={error} response={response} errorTitle={"Login Failed"}>
                <Input label="Email Address:" icon={faEnvelope} inputType="email" inputName="email" inputID="email" placeholder="Email Address" value={email} changeValue={setEmail} />
                <Input label="Password:" icon={faKey} inputType="password" inputName="password" inputID="password" placeholder="Password" value={password} changeValue={setPassword} />
                <div className="my-3 flex justify-between">
                    <Link href="/account/forgot-password" className="text-gray-600 hover:text-gray-900 hover:underline text-sm sm:text-base">
                        Forgot Password?
                    </Link>
                    <Link href="/account/sign-up" className="text-gray-600 hover:text-gray-900 hover:underline text-sm sm:text-base">
                        Create New Account
                    </Link>
                </div>
                <div className="relative w-full my-4 self-center flex">
                    <SubmitButton text="Login" onClick={handleLogin} processing={processing} />
                </div>
            </AuthBox >
        </>
    )
}

export default LoginMain
