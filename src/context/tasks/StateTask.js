import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';
import ContextTask from './ContextTask';
import ReducerTask from './ReducerTask';

import { 
    TASK_PROJECT,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    CURRENT_TASK,
    EDIT_TASK,
    CLEAN_TASK,
    START_SPINNER
} from "../../types";

const StateTask = props => {

    const initialState = {
        projectTasks: [], 
        errorTask: false,
        currentTask: null,
        loading: false
    }

    // Crear el dispatch y state
    const [state, dispatch] = useReducer(ReducerTask, initialState)

    // Crear las funciones
    // Obtener tareas de un proyecto
    const fetchTask = async projectId => {

        try {

            dispatch({
                type: START_SPINNER,
            })

            const response = await axiosClient.get("/api/tasks", { params: { projectId } })

            dispatch({
                type: TASK_PROJECT,
                payload: response.data.tasks
            })

        } catch (error) {
            console.log(error.response);
        }

    }

    // Agregar una tarea al state seleccionado
    const addTask = async task => {

        try {
            
            const response = await axiosClient.post("/api/tasks", task)

            dispatch ({
                type: ADD_TASK,
                payload: response.data.task
            })

        } catch (error) {
            console.log(error.response);
        }

    }

    // Valida y muestra un error 
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }

    // Eliminar tarea por id
    const deleteTask = async (id, currentProject) => {
        
        try {
            
            await axiosClient.delete(`/api/tasks/${id}`, {params: { projectId: currentProject }})

            dispatch({
                type: DELETE_TASK,
                payload: id
            }) 

        } catch (error) {
            console.log(error.response);
        }
        
    }

    // Cambiar el estado de una tarea
    // const changeTaskStatus = task => {
    //     dispatch({
    //         type: STATE_TASK,
    //         payload: task
    //     })
    // }

    // Modifica una tarea
    const editTask = async task => {

        try {
            const response = await axiosClient.put(`/api/tasks/${task._id}`, task)

            dispatch({
                type: EDIT_TASK,
                payload: response.data.task
            })
        } catch (error) {
            console.log(error.response);
        }

    }

    // Extrar una tarea para edición
    const changeCurrentTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }

    // Limpiar la tarea
    const cleanCurrentTask = () => {
        dispatch({
            type: CLEAN_TASK,
        })
    }

    return (
        <ContextTask.Provider
            value ={{
                projectTasks: state.projectTasks,
                errorTask: state.errorTask,
                currentTask: state.currentTask,
                fetchTask,
                addTask,
                validateTask,
                deleteTask,
                changeCurrentTask,
                editTask,
                cleanCurrentTask
            }}
        >
            {props.children}
        </ContextTask.Provider>
    )

}

export default StateTask