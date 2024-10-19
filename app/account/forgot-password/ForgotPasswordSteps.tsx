"use client"

import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import ForgotPasswordMainContext from "./ForgotPasswordMainContext"
import Input from "../components/Input"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import Link from "next/link"
import SubmitButton from "../components/SubmitButton"
import axios from "axios"
import { faKey, faLock } from "@fortawesome/free-solid-svg-icons"

const ForgotPasswordStepOne = () => {
    const [processing, setProcessing] = useState(false)
    const context = useContext(ForgotPasswordMainContext)
    const handleSubmit = async () => {
        setProcessing(true)
        context.setError(false)
        context.setSuccess(false)
        context.setResponse("")
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/reset-pwd`, { action: "SEND_VERIFICATION_CODE", email: context.email })
            if (res.status === 200) {
                context.setSuccess(true)
                context.setResponse(res.data.message)
                context.setToken(res.data.token)
                context.setActiveStep(context.activeStep + 1)
                setProcessing(false)
            }
        } catch (error: any) {
            setProcessing(false)
            if (error.hasOwnProperty("response") && error.response.hasOwnProperty("data") && error.response.data.hasOwnProperty("message")) {
                context.setError(true)
                context.setResponse(error.response.data.message)
                window.scrollTo({ top: 0, behavior: "smooth" })
            }
            else {
                context.setError(true)
                context.setResponse("An error occurred. Please try again later.")
                window.scrollTo({ top: 0, behavior: "smooth" })
            }
        }
    }
    return (
        <>
            <Input label="Email Address:" icon={faEnvelope} inputType="email" inputName="email" inputID="email" placeholder="Email Address" value={context.email} changeValue={context.setEmail} />
            <div className="my-3">
                <Link href="/account/sign-up" className="text-gray-600 hover:text-gray-900 hover:underline text-sm sm:text-base">
                    Don&apos;t have an account? Sign Up
                </Link>
            </div>
            <SubmitButton text="Continue" processing={processing} onClick={handleSubmit} />
        </>
    )
}



const ForgotPasswordStepTwo = () => {
    const [processing, setProcessing] = useState(false)
    const context = useContext(ForgotPasswordMainContext)
    const handleSubmit = async () => {
        setProcessing(true)
        context.setError(false)
        context.setSuccess(false)
        context.setResponse("")
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/reset-pwd`, { action: "VERIFY_OTP", email: context.email, otp: context.otp })
            if (res.status === 200) {
                context.setToken(res.data.token)
                context.setActiveStep(context.activeStep + 1)
                setProcessing(false)
            }
        } catch (error: any) {
            setProcessing(false)
            if (error.hasOwnProperty("response") && error.response.hasOwnProperty("data") && error.response.data.hasOwnProperty("message")) {
                context.setError(true)
                context.setResponse(error.response.data.message)
                window.scrollTo({ top: 0, behavior: "smooth" })
            }
            else {
                context.setError(true)
                context.setResponse("An error occurred. Please try again later.")
                window.scrollTo({ top: 0, behavior: "smooth" })
            }
        }
    }
    return (
        <>
            <Input label="Verification Code:" icon={faLock} inputType="text" inputName="otp" inputID="otp" placeholder="Six Digit Verification Code" value={context.otp} changeValue={context.setOTP} />
            <SubmitButton text="Continue" processing={processing} onClick={handleSubmit} />
        </>
    )
}


const ForgotPasswordStepThree = () => {
    const router = useRouter()
    const [processing, setProcessing] = useState(false)
    const context = useContext(ForgotPasswordMainContext)
    const handleSubmit = async () => {
        setProcessing(true)
        context.setError(false)
        context.setSuccess(false)
        context.setResponse("")
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/reset-pwd`, { action: "RESET_PASSWORD", password: context.password, confirm_password: context.confirmPassword, token: context.token })
            if (res.status === 200) {
                context.setSuccess(true)
                context.setResponse(res.data.message)
                context.setActiveStep(context.activeStep + 1)
                setProcessing(false)
                setTimeout(() => {
                    router.push("/account/login")
                }, 5000);
            }
        } catch (error : any) {
            setProcessing(false)
            if (error.hasOwnProperty("response") && error.response.hasOwnProperty("data") && error.response.data.hasOwnProperty("message")) {
                context.setError(true)
                context.setResponse(error.response.data.message)
                window.scrollTo({ top: 0, behavior: "smooth" })
            }
            else {
                context.setError(true)
                context.setResponse("An error occurred. Please try again later.")
                window.scrollTo({ top: 0, behavior: "smooth" })
            }
        }
    }
    return (
        <>
            <Input label="Password:" icon={faKey} inputType="password" inputName="password" inputID="password" placeholder="Password" value={context.password} changeValue={context.setPassword} />

            <Input label="Confirm Password:" icon={faKey} inputType="password" inputName="confirm_password" inputID="confirm_password" placeholder="Confirm Password" value={context.confirmPassword} changeValue={context.setConfirmPassword} />


            <SubmitButton text="Reset Password" processing={processing} onClick={handleSubmit} />
        </>
    )
}

export { ForgotPasswordStepOne, ForgotPasswordStepTwo, ForgotPasswordStepThree }