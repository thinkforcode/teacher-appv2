import { mergeDataInLocal, mergeDataInshowIntroPage, clearLocalStorage } from "../../functions/localSorage"
import { enternationLoginEndPoint, loginEndPoint } from "../api"
import auth from '@react-native-firebase/auth';
import { DO_LOGIN, ON_DONE_SLIDER, CLEAR_ERROR, ON_ERROR, LOGIN_LOADING, DO_OTP, UPDATE_LOCAL_DATA, OTP_LOADING, LOG_OUT, SIGNUP_LOADING, REGISTER, USER_INTREST } from '../actionTypes';
import { store } from "../store";
import { version } from '../../package.json';
import firestore from '@react-native-firebase/firestore';
import * as RootNavigation from '../../RootNavigation.js';


export const onDoneIntroSlider = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: ON_DONE_SLIDER, payload: true })
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
                    if (confirmResult.status) {
                        confirmResult['mobileNumber'] = `${code}${mobileNumber}`
                        auth().signInWithCustomToken(confirmResult.token).then((res) => {
                            dispatch({ type: DO_LOGIN, payload: confirmResult })
                        }).catch((err) => {
                            dispatch({ type: ON_ERROR, payload: { isError: true, errorMessage: 'Incorrect OTP you have entered !' } })
                        })

                    } else {
                        alert("Please talk to your school to, login with Skugal!")
                    }
                }).catch((err) => {
                    dispatch({ type: ON_ERROR, payload: { isError: true, errorMessage: 'Incorrect OTP you have entered !' } })
                })

            } else {
                fetch(enternationLoginEndPoint, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ countryCode: code, mobileNumber: mobileNumber, })
                }).then((response) => response.json()).then((confirmResult) => {
                    console.log("confiremresult", confirmResult)
                    if (confirmResult && confirmResult.status) {
                        auth().signInWithCustomToken(confirmResult.token).then((res) => {
                        }).catch((err) => { console.log("err", err) })
                    } else {
                    }
                }).catch((err) => { })
            }
        }
        catch (e) {
            dispatch({ type: 'ON_ERROR', payload: { isError: true, errorMessage: 'Incorrect OTP you have entered !' } })
        }
    }
}



//Verify Otp
export const verifyOtp = (code, deviceToken) => {
    return async (dispatch) => {
        try {
            dispatch({ type: CLEAR_ERROR, payload: null })
            let userInfo = store.getState().authReducer
            let temp = userInfo.loginData.path.split('/');
            let userId = temp[1]
            let schoolId = temp[3]
            let teacherId = temp[temp.length - 1];
            let ref = firestore().collection('users').doc(userId).collection('schools').doc(schoolId).collection('teachers').doc(teacherId)
            if (code.trim() == "") {
                dispatch({ type: ON_ERROR, payload: { isError: true, errorMessage: 'OTP can not be empty !' } })
            }
            else {
                ref.get().then((res) => {
                    if (res.data().otp != code) {
                        dispatch({ type: ON_ERROR, payload: { isError: true, errorMessage: 'Incorrect OTP you have entered !' } })
                    }
                    else {
                        dispatch({ type: OTP_LOADING, payload: true })
                        console.log("res.data().isBasicDetails", res.data().isBasicDetails)
                        if (!res.data().isBasicDetails) {
                            ref.set({
                                teacherId: teacherId,
                                isBasicDetails: false,
                                deviceToken: deviceToken,
                                userId: userId,
                                schoolId: schoolId,
                                createdAt: new Date(),
                                appVersion: version
                            }, { merge: true }).then((res) => {
                                dispatch({ type: DO_OTP, payload: { mobileNumber: userInfo.loginData.mobileNumber, isBasicDetails: false, isOtpVerified: true, userId:userId, schoolId:schoolId, teacherId: teacherId } })
                                mergeDataInLocal({
                                    mobileNumber: userInfo.loginData.mobileNumber,
                                    teacherId: teacherId,
                                    isBasicDetails: false,
                                    deviceToken: deviceToken,
                                    userId: userId,
                                    schoolId: schoolId,
                                    appVersion: version
                                })
                            })
                        } else {
                            let teacher = res.data();
                            console.log("teacher data is", teacher)
                            if (teacher.isBasicDetails) {
                                ref.set({
                                    deviceToken: deviceToken
                                }, { merge: true }).then((res) => {
                                    mergeDataInLocal(teacher)
                                    dispatch({ type: DO_OTP, payload: teacher })
                                }).catch((e) => { })
                            } else {
                                dispatch({ type: DO_OTP, payload: { mobileNumber: userInfo.loginData.mobileNumber, isOtpVerified: true,  userId:userId, schoolId:schoolId,  teacherId: teacherId } })
                            }
                        }
                    }
                }).catch((err) => { console.log("error to login with cloud functions", err) })
            }

        }
        catch (e) {
            console.log("error in otp page", e)
        }
    }
}

export const onUserRegister = (data) => {
    return async (dispatch) => {
        try {
            data['isBasicDetails'] = true
            let userInfo = store.getState().authReducer.loginData
            dispatch({ type: CLEAR_ERROR, payload: null })
            dispatch({ type: SIGNUP_LOADING, payload: true })
            firestore().collection('users').doc(userInfo.userId).collection('schools').doc(userInfo.schoolId).collection('teachers').doc(userInfo.teacherId).set(data, { merge: true }).then((r) => {
                dispatch({ type: REGISTER, payload: data })
                dispatch({ type: SIGNUP_LOADING, payload: false })
                dispatch({ type: CLEAR_ERROR, payload: null })
                mergeDataInLocal(data)
                RootNavigation.navigate('UserIntrest');
            }).catch((e) => {
                dispatch({ type: 'ON_ERROR', payload: { isError: true, errorMessage: 'Error to update your details !' } })
            })
        }
        catch (err) {
            dispatch({ type: 'ON_ERROR', payload: { isError: true, errorMessage: 'Error to update your details !' } })
        }
    }
}

export const onUserIntrest = (data) => {
    console.log("onUserIntrest called", data)
    return async (dispatch) => {
        try {
            let userInfo = store.getState().authReducer.loginData
            console.log("onUserIntrest userInfo", userInfo)

            dispatch({ type: CLEAR_ERROR, payload: null })
            dispatch({ type: SIGNUP_LOADING, payload: true })
            let localD = []
            let docRef = firestore().collection('users').doc(userInfo.userId).collection('schools').doc(userInfo.schoolId).collection('teachers').doc(userInfo.teacherId)

            for (let i = 0; i < data.length; i++) {
                if (data[i]) {
                    let d = { title: data[i] }
                    localD.push(data[i])
                    docRef.update({
                        intrests: firestore.FieldValue.arrayUnion(d)
                    }).then((r) => {
                        dispatch({ type: USER_INTREST, payload: localD })
                        dispatch({ type: SIGNUP_LOADING, payload: false })
                        dispatch({ type: CLEAR_ERROR, payload: null })
                        mergeDataInLocal({ intrests: localD, isBasicDetails: true })
                    }).catch((e) => {
                        dispatch({ type: ON_ERROR, payload: { isError: true, errorMessage: 'Error to update your details !' } })
                    })

                }
            }
        }
        catch (err) {
            dispatch({ type: ON_ERROR, payload: { isError: true, errorMessage: 'Error to update your details !' } })
        }
    }
}



//Logout from teacher app
export const doLogOut = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOG_OUT, payload: null })
            clearLocalStorage()
        }
        catch (e) { }
    }
}