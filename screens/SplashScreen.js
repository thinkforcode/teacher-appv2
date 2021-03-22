import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground } from 'react-native'

const SplashScreen = (props) => {
    const [loginData, setLoginData] = useState(null)
    const [introPageStatus, setIntroPageStatus] = useState(null)


    // useEffect(() => {
    //     const bootstrapAsync = async () => {
    //         try {
    //             const data = await AsyncStorage.getItem("login");
    //             const introData = await AsyncStorage.getItem("showIntroPage");
    //             setIntroPageStatus(JSON.parse(introData))
    //             if (data != null) {
    //                 setLoginData(JSON.parse(data))
    //                 props.userDataUpdate(JSON.parse(data))
    //             } 
    //             else {
    //                 setLoginData(props.userReducer.loginData)
    //             }

    //         }
    //         catch (e) { }
    //     };

    //     bootstrapAsync();

    //     return () => { }
    // }, [])

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../assets/images/skugal.jpg')} style={{ width: '100%', height: '100%' }}>
            </ImageBackground>
        </View>
    )
}

export default SplashScreen
