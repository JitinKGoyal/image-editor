import { loginService, signupService } from "../services/auth.service"
import dispatchFunction from "./dispatchFunction"

// Action for login
export const authActionLogin = (data) => {
    return dispatch => {
        loginService(data).then((loginErr) => {
            dispatch(dispatchFunction({loginErr}))
        })
    }
}

// Action for signup
export const authActionSignup = (data) => {
    return dispatch => {
        signupService(data).then((signupErr) => {
            dispatch(dispatchFunction({signupErr}))
        })
    }
}


