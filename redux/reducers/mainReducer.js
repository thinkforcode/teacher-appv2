import { GET_CLASSES, GET_STUDENTS, SELECTED_CLASS,GET_ASSIGNMENT } from '../actionTypes/index';

const INITIAL_STATE = {
    classes: [],
    getStudent: [],
    selectedClass: {},
    assignment:[]
};

export const mainReducer = (state = INITIAL_STATE, action) => {
    console.log("action.payload", action.payload)
    switch (action.type) {

        case GET_CLASSES:
            return {
                ...state,
                classes: action.payload,
                isLoading: false
            }

        case GET_STUDENTS:
            return {
                ...state,
                getStudent: action.payload,
                isLoading: false
            }

        case SELECTED_CLASS:
            return {
                ...state,
                selectedClass: action.payload,
                isLoading: false
            }

            case GET_ASSIGNMENT:
            return {
                ...state,
                assignment: action.payload,
                isLoading: false
            }

        default:
            return state;
    }

}