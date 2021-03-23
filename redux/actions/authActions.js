import { mergeDataInLocal, mergeDataInshowIntroPage } from "../../functions/localSorage"
import { enternationLoginEndPoint, loginEndPoint } from "../api"
import auth from '@react-native-firebase/auth';
import { DO_LOGIN, ON_DONE_SLIDER, CLEAR_ERROR, ON_ERROR, LOGIN_LOADING } from '../actionTypes';


export const onDoneIntroSlider = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'ON_DONE_SLIDER', payload: true })
            mergeDataInshowIntroPage({ showIntroPage: true })
        }
        catch (e) { }
    }
}

//Login functionality
export const onUserLogin = (code, mobileNumber) => {
    console.log("code, mobileNumber lin 20", code, mobileNumber)
    return async (dispatch) => {
        try {
            dispatch({ type: CLEAR_ERROR, payload: null })
            dispatch({ type: LOGIN_LOADING, payload: true })
            if (code == "+91") {
                fetch(loginEndPoint, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mobileNumber: `${code}${mobileNumber}`, type: 'teachers' })
                }).then((response) => response.json()).then((confirmResult) => {
                    console.log("confirmResult ln 29", confirmResult)
                    if ( confirmResult.status) {
                       auth().signInWithCustomToken(confirmResult.token).then((res) => {
                        dispatch({ type: DO_LOGIN, payload: confirmResult })

                           console.log("res 33", res)
                        }).catch((err) => {
                            dispatch({ type: ON_ERROR, payload: { isError: true, errorMessage: 'Incorrect OTP you have entered !' } })

                            console.log("err", err) 
                        })

                    } else {
                        dispatch({ type: DO_LOGIN, payload: confirmResult })
                        alert("Please talk to your school to, login with Skugal!")
                    }
                }).catch((err) => {
                    dispatch({ type: ON_ERROR, payload: { isError: true, errorMessage: 'Incorrect OTP you have entered !' } })
                })

            } else {
                fetch(enternationLoginEndPoint, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ countryCode:code, mobileNumber: mobileNumber, })
                }).then((response) => response.json()).then((confirmResult) => {
                    console.log("confiremresult", confirmResult)
                    if (confirmResult && confirmResult.status) {
                        auth().signInWithCustomToken(confirmResult.token).then((res) => {
                            // this.props.navigation.navigate('Otp', { otpdata: confirmResult, cc: this.state.cc, mob: this.state.phoneNumber, isAdmin: false })
                            // this.setState({ isLoading: false, btnvisible: false })
                        }).catch((err) => { console.log("err", err) })

                    } else {
                        // alert("Please talk to your school to, login with Skugal!")
                    }
                }).catch((err) => {
                })

            }
        }
        catch (e) {
            dispatch({ type: 'ON_ERROR', payload: { isError: true, errorMessage: 'Incorrect OTP you have entered !' } })
        }
    }
}
