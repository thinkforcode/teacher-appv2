import { mergeDataInLocal, mergeDataInshowIntroPage } from "../../functions/localSorage"
import { enternationLoginEndPoint, loginEndPoint } from "../api"
import auth from '@react-native-firebase/auth';
import { DO_LOGIN, ON_DONE_SLIDER, CLEAR_ERROR, ON_ERROR, LOGIN_LOADING, DO_OTP } from '../actionTypes';


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
                        }).catch((err) => {
                            dispatch({ type: ON_ERROR, payload: { isError: true, errorMessage: 'Incorrect OTP you have entered !' } })
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
                        }).catch((err) => { console.log("err", err) })

                    } else {
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

//Verify Otp
export const verifyOtp = (code, id, deviceToken, mobileNumber) => {  
    return async (dispatch) => {
        try {
            dispatch({ type: CLEAR_ERROR, payload: null })
            firestore().collection('parents').doc(id).get().then((res) => {
                if (res.data().otp!= code) {
                    dispatch({ type: ON_ERROR, payload: { isError: true, errorMessage: 'Incorrect OTP you have entered !' } })
                }
                else {
                    dispatch({ type: OTP_LOADING, payload: true })
                    if (!res.data().isBasicDetails) {
                        firestore().collection('parents').doc(id).set({
                            isBasicDetails: false,
                            isOtpVerified: true,
                            deviceToken: deviceToken,
                            parentId: id,
                            createdTime: new Date().getTime(),
                        }, { merge: true }).then((res) => {
                            dispatch({ type: DO_OTP, payload: { mobileNumber: mobileNumber, isBasicDetails: false, isOtpVerified: true, parentId: id } })
                            mergeDataInLocal({ mobileNumber: mobileNumber, isBasicDetails: false, isOtpVerified: true, parentId: id })
                        }).catch((e) => { })
                    } else {
                        let parentsData = res.data();
                        if (parentsData.isBasicDetails) {
                            firestore().collection('parents').doc(id).set({
                                deviceToken: deviceToken
                            }, { merge: true }).then((res) => {
                                mergeDataInLocal(parentsData)
                                dispatch({ type: DO_OTP, payload: parentsData })
                            })
                        } else {
                            dispatch({ type: DO_OTP, payload: { mobileNumber: mobileNumber, isOtpVerified: true, parentId: id } })
                        }
                    }
                }
            }).catch((err) => { dispatch({ type: ON_ERROR, payload: { isError: true, errorMessage: 'Incorrect OTP you have entered !' } }) })
        }
        catch (e) {
            dispatch({ type: ON_ERROR, payload: { isError: true, errorMessage: 'Incorrect OTP you have entered !' } })
        }
    }
}
