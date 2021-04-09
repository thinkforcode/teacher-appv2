import { GET_CLASSES, GET_STUDENTS, SELECTED_CLASS, UPDATE_LOCAL_DATA, GET_CLASSES_DATA, GET_INDIVIDUAL_DATA, GET_NOTIFICATION, GET_ONLINE_CLASS,GET_COMPLAIN,GET_GATEPASS} from '../actionTypes/index';

const INITIAL_STATE = {
    loginData: null,
    classes: [],
    students: [],
    selectedClass: {},
    classData: [],
    individualData: [],
    notifications: [],
    onlineClass:[],
    complain:[],
    gatepass:[],
    standard:[],
    sections:[],
    totalPresent:0,
    totalAbsent:0,
    totalStudents:0
};

export const mainReducer = (state = INITIAL_STATE, action) => {
    console.log("action.payload,", action.payload)

    switch (action.type) {

        case UPDATE_LOCAL_DATA: {
            return {
                ...state,
                loginData: action.payload,
            }
        };

        case GET_CLASSES:
            return {
                ...state,
                standard: action.payload.standard,
                sections: action.payload.sections,
                isLoading: false,
                selectedClass:{
                    section:action.payload.sections[0].section ? action.payload.sections[0].section :'' ,
                    standard:action.payload.standard[0].standard ? action.payload.standard[0].standard :''
                }
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
                students: action.payload.students,
                isLoading: false,
                totalPresent:action.payload.pCount,
                totalAbsent:action.payload.aCount,
                totalStudents:action.payload.totalStudents
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
            case GET_COMPLAIN:
            return {
                ...state,
                complain: action.payload,
                isLoading: false
            };
            case GET_GATEPASS:
            return {
                ...state,
                gatepass: action.payload,
                isLoading: false
            };

        default:
            return state;
    };
}