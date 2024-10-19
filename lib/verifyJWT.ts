import jwt from "jsonwebtoken"

const verifyJWT = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWTSECRET!)
    } catch (err) {
        return false
    }
}

export default verifyJWT