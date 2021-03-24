import { DO_LOGIN, ON_DONE_SLIDER, CLEAR_ERROR, ON_ERROR, LOGIN_LOADING, OTP_LOADING, DO_OTP, LOG_OUT, UPDATE_LOCAL_DATA, REGISTER, USER_INTREST } from '../actionTypes';

const INITIAL_STATE = {
    loginData: null,
    errorData: null,
    signUpLoading: false,
    loginLoading: false,
    otpLoading: false,
    isLoginPage: false,
    isOtpPage: false,
    showIntroPage: false,
    isBasicDetails: false,
    isLogout: false,
    isHome: false
};

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case CLEAR_ERROR:
            return {
                ...state,
                errorData: action.payload,
                signUpLoading: false
            }

        case ON_ERROR:
            return {
                ...state,
                errorData: action.payload,
                signUpLoading: false
            };

        case LOGIN_LOADING:
            return {
                ...state,
                loginLoading: action.payload
            };

        case ON_DONE_SLIDER:
            return {
                ...state,
                showIntroPage: true
            };


        case DO_LOGIN:
            return {
                ...state,
                loginLoading: false,
                loginData: action.payload,
                isLoginPage: true
            };

        case DO_OTP: {
            return {
                ...state,
                loginData: action.payload,
                otpLoading: false,
                isOtpPage: true
            }
        };

        case UPDATE_LOCAL_DATA: {
            return {
                ...state,
                loginData: action.payload,
            }
        };


        case OTP_LOADING:
            return {
                ...state,
                otpLoading: action.payload
            };

        case REGISTER:
            let r1 = action.payload;
            let r2 = state.loginData;
            let r3 = Object.assign({}, r1, r2);
            return {
                ...state,
                signUpLoading: false,
                loginData: r3,
            };

        case USER_INTREST:
            let u1 = action.payload;
            let u2 = state.loginData;
            let u3 = Object.assign({}, u1, u2);
            u3['isBasicDetails'] = true
            return {
                ...state,
                isBasicDetails: true,
                signUpLoading: false,
                loginData: u3,
            };

        case LOG_OUT:
            return {
                ...state,
                isLoginPage: false,
                isOtpPage: false,
                isLogout: true,
                loginData: null,
            }


        default:
            return state;
    }

}