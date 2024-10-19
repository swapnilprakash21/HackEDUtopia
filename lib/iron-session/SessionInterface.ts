interface Session {
    user: {
        loggedin: boolean,
        email: string,
        userID: string
    }

}

export default Session