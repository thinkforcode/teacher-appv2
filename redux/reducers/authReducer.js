import { DO_LOGIN, ON_DONE_SLIDER, CLEAR_ERROR, ON_ERROR, LOADING, DO_OTP, LOG_OUT, REGISTER, USER_INTREST, } from '../actionTypes';

const INITIAL_STATE = {
    loginData: null,
    errorMessage: null,
    isLoginPage: false,
    isOtpPage: false,
    showIntroPage: false,
    isBasicDetails: false,
    isLogout: false,
    isHome: false,
    isError: false,
    loading: false
};

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload
            };

        case CLEAR_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
                loading: false,
                isError: false
            }

        case ON_ERROR:
            return {
                ...state,
                errorMessage: action.payload.errorMessage,
                loading: false,
                isError: action.payload.isError
            };


        case ON_DONE_SLIDER:
            return {
                ...state,
                showIntroPage: true
            };


        case DO_LOGIN:
            return {
                ...state,
                loading: false,
                loginData: action.payload,
                isLoginPage: true
            };

        case DO_OTP: {
            return {
                ...state,
                loginData: action.payload,
                loading: false,
                isOtpPage: true
            }
        };

        case REGISTER:
            let r1 = action.payload;
            let r2 = state.loginData;
            let r3 = Object.assign({}, r1, r2);
            return {
                ...state,
                loading: false,
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
                loading: false,
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