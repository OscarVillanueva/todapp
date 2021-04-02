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

const taskReducer = (state, action) => {
    switch (action.type) {

        case START_SPINNER: 
            return {
                ...state,
                loading: true
            }

        case TASK_PROJECT:
            return {
                ...state,
                // projectTasks: state.projectTasks.filter(task => task.projectId === action.payload)
                projectTasks: action.payload,
                loading: false
            }

        case ADD_TASK:
            return {
                ...state,
                projectTasks: [...state.projectTasks, action.payload],
                errorTask: false
            }

        case VALIDATE_TASK:
            return {
                ...state,
                errorTask: true
            }

        case DELETE_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.filter(task => task._id !== action.payload)
            }

        case EDIT_TASK: 
            return {
                ...state,
                projectTasks: state.projectTasks.map(task => task._id === action.payload._id ? action.payload : task)
            }

        case CURRENT_TASK: 
            return {
                ...state,
                currentTask: action.payload
            }

        case CLEAN_TASK:
            return {
                ...state,
                currentTask: null
            }

        default:
            return state
    }
}

export default taskReducer