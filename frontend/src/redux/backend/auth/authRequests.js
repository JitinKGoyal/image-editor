import { baseUrl } from "../../../config"

export const loginRequest = async ({ email, password }) => {
    try {
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email?.toLowerCase(),
                password: password
            })
        })
        const data = await response.json()
        return data
    } catch (err) {
        console.error("error in login: ", err)
    }
}


export const signupRequest = async ({name, email, password }) => {
    try {
        const response = await fetch(`${baseUrl}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        const data = await response.json()
        return data
    } catch (err) {
        console.error("error in signup: ", err)
    }
}