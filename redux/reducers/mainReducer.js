import { GET_CLASSES, GET_STUDENTS, SELECTED_CLASS, SELECTED_SECTION, SELECTED_STUDENT, ATTENDANCE_REPORT, UPDATE_LOCAL_DATA, UPDATE_STUDENTS, GET_CLASSES_DATA, GET_INDIVIDUAL_DATA, GET_NOTIFICATION, GET_ONLINE_CLASS, GET_COMPLAIN, GET_GATEPASS } from '../actionTypes/index';

const INITIAL_STATE = {
    loginData: null,
    classes: [],
    students: [],
    selectedClass: {},
    classData: [],
    individualData: [],
    notifications: [],
    onlineClass: [],
    complain: [],
    gatepass: [],
    allStandard: [],
    allSections: [],
    totalPresent: 0,
    totalAbsent: 0,
    totalStudents: 0,
    isTakenAttendance: false,
    activeStudents: {},
    attendance: {},
    notTakenAttendanceCount: 0,
    absentcount: 0,
    presentCount: 0,
    selectedStudents: []
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
                allStandard: action.payload.standard,
                allSections: action.payload.sections,
                isLoading: false,
                selectedClass: {
                    section: action.payload.sections[0].section ? action.payload.sections[0].section : '',
                    standard: action.payload.standard[0].standard ? action.payload.standard[0].standard : ''
                }
            }

        case SELECTED_CLASS:
            return {
                ...state,
                selectedClass: {
                    standard: action.payload.standard,
                    section: action.payload.section
                },
                isLoading: false
            }

        case SELECTED_SECTION:
            return {
                ...state,
                isLoading: false,
                selectedClass: {
                    standard: action.payload.standard,
                    section: action.payload.section,
                },
            }

        case GET_STUDENTS:
            return {
                ...state,
                students: action.payload.students,
                isLoading: false,
                totalPresent: action.payload.pCount,
                totalAbsent: action.payload.aCount,
                totalStudents: action.payload.totalStudents,
            }

        case UPDATE_STUDENTS:
            return state.students.map(item => {
                if (item.studentUid === action.payload.item.studentUid) {  // Match the item by id and update its name
                    return {
                        ...item,
                        status: action.payload.status
                    };
                }
                return item;
            });

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

        case ATTENDANCE_REPORT:
            return {
                ...state,
                presentCount: action.payload.presentCount,
                absentcount: action.payload.absentcount,
                notTakenAttendanceCount: action.payload.notTakenAttendanceCount,
                attendance: action.payload.attendance,
                isLoading: false
            };

        case SELECTED_STUDENT:
            return {
                ...state,
                activeStudents: action.payload
            }

        default:
            return state;
    };
}