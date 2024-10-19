const ironSessionConfig = {
    password: process.env.SECRET_COOKIE_PASSWORD!,
    cookieName: "HCS",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true : false
    }
}

export default ironSessionConfig