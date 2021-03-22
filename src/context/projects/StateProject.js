import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';
import contextProject from './ContextProject';
import reducerProject from './ReducerProject';

import { 
    PROJECT_FORM, 
    FETCH_PROJECTS,
    ADD_PROJECT,
    ERROR_PROJECT,
    VALIDATE_FORM,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    START_SPINNER
} from "../../types";

const StateProject = props => {

    const initialState = {
        form: false,
        projects: [],
        formError: false,
        currentProject: null,
        message: null,
        loading: false
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(reducerProject, initialState)

    // Serie de funciones para el CRUD
    const showForm = () => {
        dispatch({
            type: PROJECT_FORM
        })   
    }

    // Obtener los projectos
    const fetchProjects = async () => {
        

        try {

            dispatch({
                type: START_SPINNER,
                payload: true
            })

            const response = await axiosClient.get("/api/projects")
            // console.log(response.data);

            dispatch({
                type: FETCH_PROJECTS,
                payload: response.data.projects
            })

        } catch (error) {
            const alert = {
                msg: "Hubo un error, recuperar los projectos",
                category: "alerta-error"
            }

            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })
        }

    }

    // Agregar proyecto
    const addProject = async project => {

        try {

            dispatch({
                type: START_SPINNER,
                payload: true
            })

            const response = await axiosClient.post("/api/projects", project)
            // console.log(response);

            // Guardamos el proyecto en el state
            dispatch({
                type: ADD_PROJECT,
                payload: response.data
            })

        } catch (error) {

            const alert = {
                msg: "Hubo un error, al agregar el proyecto",
                category: "alerta-error"
            }

            if ( error.response.data.msg && error.response.data.msg === "token no válido") {

                alert.msg = "Tu sesión expiro, reinicia tu sesión"
                alert.category = -1

            }


            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })
        }

    }

    // Valida Formulario por errores
    const showError = () => {
        dispatch({
            type: VALIDATE_FORM
        })
    }

    // Selecciona el proyecto que el usuario dio click
    const changeCurrentProject = idProject => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: idProject
        })
    }

    // Borrar un proyecto
    const deleteProject = async idProject => {

        try {

            await axiosClient.delete(`/api/projects/${idProject}`)

            dispatch({
                type: DELETE_PROJECT,
                payload: idProject
            })

        } catch (error) {

            const alert = {
                msg: "Hubo un error al borrar el proyecto",
                category: "alerta-error"
            }

            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })

        }
    }

    return (
        <contextProject.Provider
            value = {{
                form: state.form,
                formError: state.formError,
                projects: state.projects,
                currentProject: state.currentProject,
                message: state.message,
                loading: state.loading,
                showForm,
                showError,
                fetchProjects,
                addProject,
                changeCurrentProject,
                deleteProject
            }}
        >
            {props.children}
        </contextProject.Provider>
    )
}

export default StateProject