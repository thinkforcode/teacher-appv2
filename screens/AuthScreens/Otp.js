import React, { useState, useEffect, useRef } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Animated, TextInput, StatusBar, ScrollView } from 'react-native'
import CustomButton from '../../components/CustomButton';
import { connect } from 'react-redux'
import messaging from '@react-native-firebase/messaging';
import Loader from '../../components/Loader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { verifyOtp, onUserLogin } from '../../redux/actions/authActions';

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

    const { authReducer, verifyOtp, onUserLogin } = props

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds == 0) {
                clearInterval(interval)
                setOtpVisible(false)
            }
            else {
                setSeconds(seconds - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);

    console.log("seconds", seconds)


    useEffect(() => {
        return Animated.parallel([
            Animated.timing(SlideInLeft, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
        ]).start();
    })


    const enterOtp = () => {
        let code = `${code1}${code2}${code3}${code4}${code5}${code6}`
        verifyOtp(code, deviceToken)
    }

    const _resendOtp = () => {
        setSeconds(30)
        setOtpVisible(true)
        onUserLogin(authReducer.loginData.countryCode, authReducer.loginData.mobileNumber)
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
        else if (code5 == "" && isHighlighted) {
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


    console.log("authReducer ", authReducer )


    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }} keyboardShouldPersistTaps='handled' >
            <KeyboardAvoidingView behavior="padding" >
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
                        <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={styles.dropDownStyle} >
                            <MaterialCommunityIcons name="chevron-left" color="#707070" size={18} />
                        </TouchableOpacity>
                        {/*         //enter the 6 digit verification code sent to your  */}
                        <Text style={styles.titleText}>Enter 6 digit verification </Text>
                        <Text style={styles.titleTextTwo}>code sent to your number {authReducer.loginData.mobileNumber!=undefined ? authReducer.loginData.mobileNumber:''}</Text>

                        
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

                    {
                        otpVisible ?
                            <View style={{ alignItems: "center", marginTop: 50, justifyContent: "center" }}>
                                <Text style={{ fontSize: 14, fontWeight: "500", color: "#263238" }}>Resend code in 00:{seconds}</Text>
                            </View> :
                            <View style={{ alignItems: "center" }}>
                                {
                                 authReducer.isError &&
                                    <Text style={{fontSize:16,color:"#D92410",fontWeight:"500",marginTop:50}}>
                                    {authReducer.errorMessage}
                                </Text>
                                }

                                <TouchableOpacity onPress={()=>{_resendOtp()}} style={{ marginTop: 20 }}>
                                    <Text style={{ color: "#263238", fontSize: 14, fontWeight: '500' }}>Resend OTP</Text>
                                </TouchableOpacity>
                            </View>

                    }

                    <View style={{ marginHorizontal: 30, }}>
                        <CustomButton {...props} button={styles.button} _doAction={enterOtp} buttonText={styles.buttonText} title="Verify OTP" screen='Otp' />
                    </View>

                </Animated.View>

                {authReducer.loading && <Loader />}

            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const mapStateToProps = (state) => ({
    authReducer: state.authReducer,
})

export default connect(mapStateToProps, { verifyOtp, onUserLogin })(Otp);

const styles = StyleSheet.create({
    button: {
        borderRadius: 14,
        marginTop: 120,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#2B454E',
    },


    input: {
        width: 45,
        borderColor: '#A3A4A7',
        // borderColor: '#E94147',
        borderBottomWidth: 1,
        textAlign: 'center',
        justifyContent: "center",
        fontSize: 25,
        color: '#263238'
    },



    buttonText: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
    },
    headerText: {
        marginTop: 20,
        marginHorizontal: 15,

    },

    titleText: {
        color: '#263238',
        fontSize: 24,
        marginTop: 50,
        fontWeight: "bold"
    },
    titleTextTwo:
    {
        color: '#263238',
        fontSize: 24,
        fontWeight: "bold"
    },
    otpSection:
    {
        marginTop: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginHorizontal: 30
    },
    dropDownStyle: {
        backgroundColor: "#f2f2f2",
        justifyContent: "center",
        alignItems: "center",
        width: 20,
        height: 20,
        borderRadius: 10
    },
})


