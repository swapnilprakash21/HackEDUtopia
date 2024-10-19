"use client"

import { Step, StepLabel, Stepper } from '@mui/material'
import { useState } from 'react'
import AuthBox from '../components/AuthBox'
import StepIconComponent from '../components/StepIconComponent'
import ForgotPasswordMainContext from './ForgotPasswordMainContext'
import { ForgotPasswordStepOne, ForgotPasswordStepThree, ForgotPasswordStepTwo } from './ForgotPasswordSteps'

const ForgotPasswordMain = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)
    const [response, setResponse] = useState("")
    const [activeStep, setActiveStep] = useState(0)
    const [otp, setOTP] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [token, setToken] = useState("")
    const [success, setSuccess] = useState(false)

    const providerValues = {
        activeStep,
        setActiveStep,
        email,
        setEmail,
        otp,
        setOTP,
        password,
        setPassword,
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
            <ForgotPasswordMainContext.Provider value={providerValues}>
                <AuthBox page="forgot-password" error={error} success={success} response={response} errorTitle="Error">
                <div className="mb-8 -mx-3">
                        <Stepper activeStep={activeStep}>
                            <Step key={1} >
                                <StepLabel StepIconComponent={(props) => <StepIconComponent {...props} step={1} activeStep={activeStep} />}>Enter Email</StepLabel>
                            </Step>
                            <Step key={2}>
                                <StepLabel StepIconComponent={(props) => <StepIconComponent {...props} step={2} activeStep={activeStep} />}>Verify Email</StepLabel>
                            </Step>
                            <Step key={3}>
                                <StepLabel StepIconComponent={(props) => <StepIconComponent {...props} step={3} activeStep={activeStep} />}>Reset Password</StepLabel>
                            </Step>
                        </Stepper>
                    </div>
                    {
                        activeStep === 0 && <ForgotPasswordStepOne />
                    }
                    {
                        activeStep === 1 && <ForgotPasswordStepTwo />
                    }
                    {
                        activeStep === 2 && <ForgotPasswordStepThree />
                    }
                </AuthBox>
            </ForgotPasswordMainContext.Provider>
        </>
    )

}
export default ForgotPasswordMain
