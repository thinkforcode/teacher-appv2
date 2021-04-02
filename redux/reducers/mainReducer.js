import { GET_CLASSES, GET_STUDENTS, SELECTED_CLASS, UPDATE_LOCAL_DATA, GET_CLASSES_DATA, GET_INDIVIDUAL_DATA, GET_NOTIFICATION, GET_ONLINE_CLASS} from '../actionTypes/index';

const INITIAL_STATE = {
    loginData: null,
    classes: [],
    getStudent: [],
    selectedClass: {},
    classData: [],
    individualData: [],
    notifications: [],
    onlineClass:[]
};

export const mainReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case UPDATE_LOCAL_DATA: {
            console.log("UPDATE_LOCAL_DATA action.payload,", action.payload)
            return {
                ...state,
                loginData: action.payload,
            }
        };

        case GET_CLASSES:
            return {
                ...state,
                classes: action.payload,
                isLoading: false
            }

        case SELECTED_CLASS:
            return {
                ...state,
                selectedClass: action.payload,
                isLoading: false
            }

        case GET_STUDENTS:
            return {
                ...state,
                getStudent: action.payload,
                isLoading: false
            }

        case GET_CLASSES_DATA:
            return {
                ...state,
                classData: action.payload,
                isLoading: false
            };

        case GET_INDIVIDUAL_DATA:
            return {
                ...state,
                individualData: action.payload,
                isLoading: false
            };

        case GET_NOTIFICATION:
            return {
                ...state,
                notifications: action.payload,
                isLoading: false
            };

            case GET_ONLINE_CLASS:
            return {
                ...state,
                onlineClass: action.payload,
                isLoading: false
            };

        default:
            return state;
    };
}