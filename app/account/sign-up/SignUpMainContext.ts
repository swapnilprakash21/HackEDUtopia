import React, { Context, Dispatch, SetStateAction } from "react";
import { createContext } from "react";

interface SignUpContext {
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
    fullName: string,
    setFullName: Dispatch<SetStateAction<string>>,
    setError: Dispatch<SetStateAction<boolean>>,
    setSuccess: Dispatch<SetStateAction<boolean>>,
    setResponse: Dispatch<SetStateAction<string>>,
}

const SignUPMainContext = createContext<SignUpContext>({
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
    fullName: "",
    setFullName: () => { },
    setError: () => { },
    setSuccess: () => { },
    setResponse: () => { },
});

export default SignUPMainContext;