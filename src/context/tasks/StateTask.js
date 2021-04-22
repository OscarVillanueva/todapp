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
    CLEAN_TASK,
    START_SPINNER
} from "../../types";

const StateTask = props => {

    const initialState = {
        projectTasks: {}, 
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

            let todo = []
            let done = []

            response.data.tasks.forEach(task => {
                
                if( task.state ) done.push( task )

                else todo.push( task )

            })
            

            dispatch({
                type: TASK_PROJECT,
                payload: {
                    todo,
                    done
                }
            })

        } catch (error) {
            console.log(error.response);
        }

    }

    // Agregar una tarea al state seleccionado
    const addTask = async task => {

        try {
            
            dispatch({
                type: START_SPINNER,
            })

            const response = await axiosClient.post("/api/tasks", task)

            const bridge = {
                ...state.projectTasks,
                todo: [
                    ...state.projectTasks.todo,
                    response.data.task
                ]
            }

            dispatch ({
                type: ADD_TASK,
                payload: bridge
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
    const deleteTask = async ( id, stage, currentProject ) => {
        
        try {

            dispatch({
                type: START_SPINNER,
            })
            
            await axiosClient.delete(`/api/tasks/${id}`, {params: { projectId: currentProject }})

            const newTasks = state.projectTasks[ stage ].filter( task => task._id !== id )

            const bridge = {
                ...state.projectTasks,
                [ stage ]: newTasks
            }

            dispatch({
                type: DELETE_TASK,
                payload: bridge
            }) 

        } catch (error) {
            console.log(error.response);
        }
        
    }

    // Cambiar el estado de una tarea
    const changeTaskStatus = async (task, stage) => {

        try {
            
            dispatch({
                type: START_SPINNER,
            })
    
            await axiosClient.put(`/api/tasks/${task._id}`, {
                ...task,
                state: !task.state
            })

            const temp = state.projectTasks[ stage ].find( e => e._id === task._id )
            temp.state = !temp.state

            pushToOtherList( { 
                id: task._id, 
                stage,
            },
            {
                id: "dummy",
                stage: stage === "todo" ? "done" : "todo"
            })

        } catch (error) {
            
            console.log(error)

        }


    }

    // Modifica una tarea
    const editTask = async task => {

        try {

            await axiosClient.put(`/api/tasks/${task._id}`, task)

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

    const normalChange = ( dragSrcEl, dragDstEl ) => {

        const { projectTasks } = state

        // Columna - Todo - Ejemplo no siempre pasa así
        const source = projectTasks[ dragSrcEl.stage ].find( task => task._id === dragSrcEl.id )

        // Columna - Done - Ejemplo no siempre pasa así
        const dest = projectTasks[ dragDstEl.stage ].find( task => task._id === dragDstEl.id )

        // Columna - Done - Ejemplo no siempre pasa así
        const newDest = projectTasks[ dragDstEl.stage ].map( 
            task => task._id !==  dest._id ? task : source 
        )

        // Columna - Todo - Ejemplo no siempre pasa así
        const newSource = projectTasks[ dragSrcEl.stage ].map( 
            task => task._id !==  source._id ? task : dest 
        )

        dispatch({
            type: TASK_PROJECT,
            payload: {
            
                todo: dragSrcEl.stage === "todo" ? newSource : newDest,
                done: dragSrcEl.stage === "todo" ? newDest : newSource
    
            }
        })

    }

    const pushToOtherList = ( dragSrcEl, dragDstEl ) => {

        const { projectTasks } = state

        const source = projectTasks[ dragSrcEl.stage ].find( task => task._id === dragSrcEl.id )

        const newDest = [ ...projectTasks[ dragDstEl.stage ], source ]

        const bridge = { ...projectTasks }

        bridge[ dragDstEl.stage ] = newDest
        bridge[ dragSrcEl.stage ] = projectTasks[ dragSrcEl.stage ].filter( task => task._id !== source._id )

        dispatch({
            type: TASK_PROJECT,
            payload: bridge
        })

    }

    const changePosition = ( dragSrcEl, dragDstEl ) => {

        const { projectTasks } = state
        
        const source = projectTasks[ dragSrcEl.stage ].findIndex( task => task._id === dragSrcEl.id )
        const dest = projectTasks[ dragDstEl.stage ].findIndex( task => task._id === dragDstEl.id )

        const bridge = [ ...projectTasks[ dragSrcEl.stage ] ]

        bridge[ source ] = projectTasks[ dragSrcEl.stage ][ dest ]
        bridge[ dest ] = projectTasks[ dragSrcEl.stage ][ source ]

        dispatch({
            type: TASK_PROJECT,
            payload: {
                ...projectTasks,
                [ dragSrcEl.stage ]: bridge
            }
        })
        
    }

    return (
        <ContextTask.Provider
            value ={{
                projectTasks: state.projectTasks,
                errorTask: state.errorTask,
                currentTask: state.currentTask,
                loading: state.loading,
                fetchTask,
                addTask,
                validateTask,
                deleteTask,
                changeCurrentTask,
                editTask,
                cleanCurrentTask,
                normalChange,
                pushToOtherList,
                changePosition,
                changeTaskStatus
            }}
        >
            {props.children}
        </ContextTask.Provider>
    )

}

export default StateTask