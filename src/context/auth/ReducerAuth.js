import { 
    SUCCESS_SIGNUP, 
    ERROR_SIGNUP,
    GET_USER,
    SUCCESS_SIGNIN,
    ERROR_SIGNIN,
    SIGN_OUT
} from "../../types";

export default (state, action) => {
    switch (action.type) {

        case SUCCESS_SIGNIN:
        case SUCCESS_SIGNUP:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                authenticated: true,
                message: null,
                loading: false
            }

        case GET_USER: 
            return {
                ...state,
                authenticated: true,
                user: action.payload,
                loading: false
            }

        case SIGN_OUT:
        case ERROR_SIGNIN:
        case ERROR_SIGNUP:
            localStorage.removeItem("token")
            return {
                ...state,
                token: null,
                message: action.payload,
                user: null,
                authenticated: null,
                loading: false
            }

        default:
            return state
    }
}