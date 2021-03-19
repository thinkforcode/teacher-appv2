import React, { useState, useEffect, useRef } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Animated, TextInput,  StatusBar } from 'react-native'
 import CustomButton from '../../components/CustomButton';
// import { verifyOtp } from '../../redux/actions/userAction';
// import { connect } from 'react-redux'
// import messaging from '@react-native-firebase/messaging';
 import Loader from '../../components/Loader';
// import { onUserLogin } from '../../redux/actions/userAction'
 import Headers from '../../components/Headers';


const Otp = (props) => {
    const SlideInLeft = useRef(new Animated.Value(0)).current;

    const [code1, setCode1] = useState('')
    const [code2, setCode2] = useState('')
    const [code3, setCode3] = useState('')
    const [code4, setCode4] = useState('')
    const [code5, setCode5] = useState('')
    const [code6, setCode6] = useState('')

    const [isHighlighted, setIsHighlighted] = useState(false)


    const [deviceToken, setDeviceToken] = useState('')

    const [seconds, setSeconds] = useState(30);

    const [otpVisible, setOtpVisible] = useState(true)


    const pin1 = useRef(null);
    const pin2 = useRef(null);
    const pin3 = useRef(null);
    const pin4 = useRef(null);
    const pin5 = useRef(null);
    const pin6 = useRef(null);

    const { userReducer, verifyOtp, onUserLogin } = props

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds == 0) {
                clearInterval(interval)
                setOtpVisible(false)
            }
            else {
                setSeconds(seconds => seconds - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);


    useEffect(() => {
        return Animated.parallel([
            Animated.timing(SlideInLeft, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
        ]).start();
    })


    const enterOtp = (arg1) => {
        let code = `${code1}${code2}${code3}${code4}${code5}${code6}`
        if (code.trim() == "") {
            alert("OTP can not be empty !")
        }
        else {
            verifyOtp(arg1, userReducer.loginData.parentId, deviceToken, userReducer.loginData.mobileNumber)
        }
    }

   const _resendOtp = () => {
        setSeconds(30)
        setOtpVisible(true)
        onUserLogin(userReducer.loginData.mobileNumber)
    }

    useEffect(() => {
        pin1.current.focus()
        return () => { }
    }, [])


    useEffect(() => {
        if (code1 != "") {
            pin2.current.focus()
        }
        return () => { }
    }, [code1])

    useEffect(() => {
        if (code2 != "") {
            pin3.current.focus()
        }
        else if (code2 == "" && isHighlighted) {
            pin1.current.focus()
        }
        return () => { }
    }, [code2])

    useEffect(() => {
        if (code3 != "") {
            pin4.current.focus()
        }
        else if (code3 == "" && isHighlighted) {
            pin2.current.focus()
        }
        return () => { }
    }, [code3])

    useEffect(() => {
        if (code4 != "") {
            pin5.current.focus()
        }
        else if (code4 == "" && isHighlighted) {
            pin3.current.focus()
        }
        return () => { }
    }, [code4])

    useEffect(() => {
        if (code5 != "") {
            pin6.current.focus()
        }
        else if(code5 == "" && isHighlighted) {
            pin4.current.focus()
        }
        return () => { }
    }, [code5])


    useEffect(() => {
        if (code6 == "" && isHighlighted) {
            pin5.current.focus()
        }
        return () => { }
    }, [code6, isHighlighted])


    useEffect(() => {
        async function getDeviceToken() {
            const fcmToken = await messaging().getToken()
            if (fcmToken) {
                setDeviceToken(fcmToken)
            } else {
            }
        }

        getDeviceToken();
    }, [])



    return (
        <KeyboardAvoidingView  behavior="padding" >
            <StatusBar backgroundColor="#E61A50" barStyle="light-content" />
            <Headers {...props} title="Verify OTP" />
            <Animated.View style={{
                transform: [
                    {
                        translateX: SlideInLeft.interpolate({
                            inputRange: [0, 1],
                            outputRange: [600, 0]
                        })
                    }
                ],
            }}>


                <View style={styles.headerText}>
                    <Text style={styles.titleText}>We have sent a 6-digit OTP to</Text>
                    {/* <Text style={{ textAlign: 'center', color: '#414268', paddingTop: 10 }}>{userReducer.loginData.mobileNumber}</Text> */}
                </View>

                <View style={styles.otpSection}>
                    <TextInput
                        style={styles.input}
                        ref={pin1}
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={code1 => setCode1(code1)
                        }
                    />

                    <TextInput
                        ref={pin2}
                        style={styles.input}
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={code2 => setCode2(code2)}
                    />

                    <TextInput
                        ref={pin3}
                        style={styles.input}
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={code3 => setCode3(code3)}
                    />

                    <TextInput
                        ref={pin4}
                        style={styles.input}
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={code4 => setCode4(code4)}
                    />

                    <TextInput
                        ref={pin5}
                        style={styles.input}
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={code5 => setCode5(code5)}
                    />

                    <TextInput
                        onFocus={() => { setIsHighlighted(true) }}
                        ref={pin6}
                        style={styles.input}
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={code6 => setCode6(code6)}
                    />
                </View>

                {/* {
                    otpVisible ?
                        <View style={{ alignSelf: 'flex-end', marginHorizontal: 30, marginTop: 70 }}><Text style={{ color: '#94A1AC', fontSize: 16, fontWeight: '500' }}>00:{seconds}</Text></View> :
                        <View style={{ marginTop: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <Text style={{ color: '#C1C6D0', fontSize: 14 }}>Didn't Receive OTP ?</Text>
                            <TouchableOpacity onPress={_resendOtp}>
                                <Text style={{ color: "#E53563", fontSize: 16, fontWeight: '500' }}>Resend</Text>
                            </TouchableOpacity>
                        </View>

                } */}

                <View style={{ marginTop: 10 }}>
                    <CustomButton {...props} button={styles.button} _doAction={enterOtp} item={`${code1}${code2}${code3}${code4}${code5}${code6}`} buttonText={styles.buttonText} title="Verify" />
                    
                </View>

            </Animated.View>

            {/* { userReducer.otpLoading && <Loader />} */}

        </KeyboardAvoidingView>
    )
}

// const mapStateToProps = (state) => ({
//     userReducer: state.userReducer,
// })

// export default connect(mapStateToProps, { verifyOtp, onUserLogin })(Otp);
export default Otp

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        marginTop: 20,
        elevation: 3,
        width: 147,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#E53563'
    },


    input: {
        width: 50,
        height: 50,
        borderColor: '#C1C6D0',
        borderWidth: 1,
        textAlign: 'center',
        fontWeight: '600',
        padding: 10,
        borderRadius: 10,
    },



    buttonText: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
    },
    headerText:
    {
        alignSelf: 'center',
         marginTop: 50
    },

    titleText:
    {
        color: '#35365F',
         fontSize: 16 
    },
    otpSection:
    {
        marginTop: 30,
         flexDirection: 'row',
          alignItems: 'center',
           justifyContent: 'space-evenly',
    }
})


