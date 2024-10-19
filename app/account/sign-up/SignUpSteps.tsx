"use client"

import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons'
import { faKey, faLock } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'
import SignUPMainContext from './SignUpMainContext'


const SignUpStepOne = () => {
    const [processing, setProcessing] = useState(false)
    const context = useContext(SignUPMainContext)

    const handleSubmit = async () => {
        setProcessing(true)
        context.setError(false)
        context.setSuccess(false)
        context.setResponse("")
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/register`, {
                action: "SEND_VERIFICATION_CODE",
                email: context.email
            })
            if (res.status === 200) {
                context.setSuccess(true)
                context.setResponse(res.data.message)
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
                <Link href="/account/login" className="text-gray-600 hover:text-gray-900 hover:underline text-sm sm:text-base">
                    Already have an account? Login
                </Link>
            </div>
            <SubmitButton text="Continue" processing={processing} onClick={handleSubmit} />
        </>
    )
}

const SignUpStepTwo = () => {
    const [processing, setProcessing] = useState(false)
    const context = useContext(SignUPMainContext)
    const handleSubmit = async () => {
        setProcessing(true)
        context.setError(false)
        context.setSuccess(false)
        context.setResponse("")
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/register`, {
                action: "VERIFY_OTP",
                email: context.email,
                otp: context.otp
            })
            if (res.status === 200) {
                context.setToken(res.data.token)
                context.setActiveStep(context.activeStep + 1)
                setProcessing(false)
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
            <Input label="Verification Code:" icon={faLock} inputType="text" inputName="otp" inputID="otp" placeholder="Six Digit Verification Code" value={context.otp} changeValue={context.setOTP} />
            <SubmitButton text="Continue" processing={processing} onClick={handleSubmit} />
        </>
    )
}
const SignUpStepThree = () => {
    const router = useRouter()
    const [processing, setProcessing] = useState(false)
    const context = useContext(SignUPMainContext)
    const handleSubmit = async () => {
        setProcessing(true)
        context.setError(false)
        context.setSuccess(false)
        context.setResponse("")
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/register`, {
                action: "REGISTER",
                token: context.token,
                full_name: context.fullName,
                password: context.password,
                confirm_password: context.confirmPassword
            })
            if (res.status === 201) {
                router.push("/dashboard")
                router.refresh()
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
            <Input label="Full Name:" icon={faUser} inputType="text" inputName="full_name" inputID="full_name" placeholder="Full Name" value={context.fullName} changeValue={context.setFullName} />

            <Input label="Password:" icon={faKey} inputType="password" inputName="password" inputID="password" placeholder="Password" value={context.password} changeValue={context.setPassword} />

            <Input label="Confirm Password:" icon={faKey} inputType="password" inputName="confirm_password" inputID="confirm_password" placeholder="Confirm Password" value={context.confirmPassword} changeValue={context.setConfirmPassword} />


            <SubmitButton text="Create Account" processing={processing} onClick={handleSubmit} />
        </>
    )
}

export { SignUpStepOne, SignUpStepThree, SignUpStepTwo }
