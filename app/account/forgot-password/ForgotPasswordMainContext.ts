import React, { Context, Dispatch, SetStateAction } from "react";
import { createContext } from "react";

interface ForgotPasswordContext {
    activeStep: number,
    setActiveStep: Dispatch<SetStateAction<number>>,
    email: string,
    setEmail: Dispatch<SetStateAction<string>>,
    otp: string,
    setOTP: Dispatch<SetStateAction<string>>,
    token: string,
    setToken: Dispatch<SetStateAction<string>>,
    password: string,
    setPassword: Dispatch<SetStateAction<string>>,
    confirmPassword: string,
    setConfirmPassword: Dispatch<SetStateAction<string>>
    setError: Dispatch<SetStateAction<boolean>>,
    setSuccess: Dispatch<SetStateAction<boolean>>,
    setResponse: Dispatch<SetStateAction<string>>,
}

const ForgotPasswordMainContext = createContext<ForgotPasswordContext>({
    activeStep: 0,
    setActiveStep: () => { },
    email: "",
    setEmail: () => { },
    otp: "",
    setOTP: () => { },
    token: "",
    setToken: () => { },
    password: "",
    setPassword: () => { },
    confirmPassword: "",
    setConfirmPassword: () => { },
    setError: () => { },
    setSuccess: () => { },
    setResponse: () => { },
});

export default ForgotPasswordMainContext;