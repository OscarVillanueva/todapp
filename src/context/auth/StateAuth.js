import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/authToken';
import ContextAuth from './ContextAuth';
import ReducerAuth from './ReducerAuth';

import { 
    SUCCESS_SIGNUP, 
    ERROR_SIGNUP,
    GET_USER,
    SUCCESS_SIGNIN,
    ERROR_SIGNIN,
    SIGN_OUT,
    START_SPINNER
} from "../../types";

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem("token"),
        authenticated: null,
        user: null,
        message: null,
        loading: false
    }

    const [state, dispatch] = useReducer(ReducerAuth, initialState)

    // Funciones
    const registerUser = async data => {

        try {

            dispatch({
                type: START_SPINNER,
                payload: true
            })
            
            const response = await axiosClient.post("/api/users", data)

            dispatch({
                type: SUCCESS_SIGNUP,
                payload: response.data
            })

            authenticatedUser()

        } catch (error) {
            // console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: "alerta-error"
            }

            dispatch({
                type: ERROR_SIGNUP,
                payload: alert
            })

        }
        
    }

    // Retorna el usuario autenticado
    const authenticatedUser = async () => {
        const token = localStorage.getItem("token")

        if(token) {
            tokenAuth(token)
        }

        try {

            dispatch({
                type: START_SPINNER,
                payload: true
            })
            
            const response = await axiosClient.get("/api/auth")

            dispatch({
                type: GET_USER,
                payload: response.data.user
            })

        } catch (error) {
            dispatch({
                type: ERROR_SIGNIN
            })
        }

    }

    // Cuando el usuario inicia sesion
    const login = async data => {

        try {
            
            dispatch({
                type: START_SPINNER,
                payload: true
            })

            const response = await axiosClient.post("/api/auth", data)

            dispatch({
                type: SUCCESS_SIGNIN,
                payload: response.data
            })

            authenticatedUser()

        } catch (error) {

            let message = (error.response.data.errors) ? 
                    error.response.data.errors[0].msg : error.response.data.msg 

            const alert = {
                msg: message,
                category: "alerta-error"
            }

            dispatch({
                type: ERROR_SIGNIN,
                payload: alert
            })

        }

    }

    // Cerrar sesión
    const logout = () => {
        dispatch({
            type: SIGN_OUT
        })
    }

    return ( 
        <ContextAuth.Provider
            value = {{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                registerUser,
                login,
                authenticatedUser,
                logout
            }}
        >
            {props.children}
        </ContextAuth.Provider>
     );
}
 
export default AuthState;