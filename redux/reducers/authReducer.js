import { DO_LOGIN, ON_DONE_SLIDER, CLEAR_ERROR, ON_ERROR, LOGIN_LOADING, OTP_LOADING } from '../actionTypes';

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

        case  ON_ERROR:
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

            
        case OTP_LOADING:
            return {
                ...state,
                otpLoading: action.payload
            };



        default:
            return state;
    }

}