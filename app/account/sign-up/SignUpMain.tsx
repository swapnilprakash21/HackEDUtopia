"use client"

import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Step, StepIcon, StepLabel, Stepper } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AuthBox from '../components/AuthBox'
import SignUPMainContext from './SignUpMainContext'
import { SignUpStepOne, SignUpStepThree, SignUpStepTwo } from './SignUpSteps'
import StepIconComponent from '../components/StepIconComponent'


const SignUpMain = () => {
    const router = useRouter()
    const [fullName, setFullName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [response, setResponse] = useState("")
    const [activeStep, setActiveStep] = useState(0)
    const [email, setEmail] = useState("")
    const [otp, setOTP] = useState("")
    const [token, setToken] = useState("")

    const providerValues = {
        activeStep,
        setActiveStep,
        email,
        setEmail,
        otp,
        setOTP,
        password,
        setPassword,
        fullName,
        setFullName,
        confirmPassword,
        setConfirmPassword,
        setError,
        setSuccess,
        setResponse,
        token,
        setToken
    }
    return (
        <>
            <SignUPMainContext.Provider value={providerValues}>
                <AuthBox page="signup" error={error} success={success} response={response} errorTitle='Error'>
                    <div className="mb-8 -mx-3">
                        <Stepper activeStep={activeStep}>
                            <Step key={1} >
                                <StepLabel StepIconComponent={(props) => <StepIconComponent {...props} step={1} activeStep={activeStep} />}>Enter Email</StepLabel>
                            </Step>
                            <Step key={2}>
                                <StepLabel StepIconComponent={(props) => <StepIconComponent {...props} step={2} activeStep={activeStep} />}>Verify Email</StepLabel>
                            </Step>
                            <Step key={3}>
                                <StepLabel StepIconComponent={(props) => <StepIconComponent {...props} step={3} activeStep={activeStep} />}>Create Account</StepLabel>
                            </Step>
                        </Stepper>
                    </div>

                    {
                        activeStep === 0 && <SignUpStepOne />
                    }
                    {
                        activeStep === 1 && <SignUpStepTwo />
                    }
                    {
                        activeStep === 2 && <SignUpStepThree />
                    }
                </AuthBox>
            </SignUPMainContext.Provider>
        </>
    )
}

export default SignUpMain