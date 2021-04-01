import { GET_CLASSES, GET_STUDENTS, SELECTED_CLASS } from '../actionTypes/index';

const INITIAL_STATE = {
    classes: [],
    getStudent: [],
    selectedClass: {}
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

        default:
            return state;
    }

}