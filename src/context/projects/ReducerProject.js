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

const ProjectReducer = (state, action) => {

    switch (action.type) {

        case START_SPINNER:
            return {
                ...state,
                loading: true
            }

        case PROJECT_FORM:
            return {
                ...state,
                form: true
            }
        
        case FETCH_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                loading: false
            }

        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                form: false,
                formError: false,
                loading: false
            }

        case VALIDATE_FORM: 
            return {
                ...state,
                formError: true
            }

        case CURRENT_PROJECT:
            return {
                ...state,
                currentProject: state.projects.filter(project => project._id === action.payload)[0]
            }

        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                currentProject: null,
                loading: false
            }

        case ERROR_PROJECT:
            return{
                ...state,
                message: action.payload
            }

        default:
            return state;
    }

} 

export default ProjectReducer