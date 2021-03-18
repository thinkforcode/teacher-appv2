import React, { useState, useEffect, useRef } from 'react'
import { View, TouchableOpacity, Animated, Text, TextInput, StyleSheet, StatusBar, Linking, Modal, ScrollView,connect} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
// import { connect } from 'react-redux'
// import CustomButton from '../../components/CustomButton'
// import { onUserLogin } from '../../redux/actions/userAction'
// import country from '../../countrycode.json'
// import Loader from '../../components/Loader'
// import Backbar from '../../components/Backbar'

const Login = (props) => {
    const [isChecked, setIsChecked] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [text, setText] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [cc, setcc] = useState('+91')
    const [countryName, setCountryName] = useState('India')

    // const [countrycode, setCountrycode] = useState(country)

    const SlideInLeft = useRef(new Animated.Value(0)).current;


    const { userReducer, onUserLogin } = props

    useEffect(() => {
        return Animated.parallel([
            Animated.timing(SlideInLeft, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
        ]).start();
    })



    // useEffect(() => {
    //     if (userReducer.loginData != null) {
    //         if (userReducer.loginData.status) {
    //             props.navigation.navigate('Otp')
    //         }
    //         else {
    //             alert("Please talk to your School Administration for Signup !")
    //         }
    //     }
    //     else {
    //     }
    // }, [userReducer.isLoginPage])


//    const getLogin = (arg1) => {
//         if (phoneNumber.length < 10) {
//             alert("Please enter a valid mobile number !")
//         }
//         else if (!isChecked) {
//             alert("Please read and accept the Terms of Use & Privacy Policy to get started !")
//         }
//         else {
//             onUserLogin(`${cc}${arg1}`)
//         }
//     }

//    const selectCountry = (item) => {
//         setModalVisible(!modalVisible)
//         setcc(item.dial_code)
//         setCountryName(item.name)
//     }

   const _acceptTermsCondition = () => {
        setIsChecked(!isChecked)
    }

//   const  openModal = () => {
//         setModalVisible(!modalVisible)
//     }

//    const _closeModal = () => {
//         setModalVisible(!modalVisible)
//     }


//    const searchCountry = (text) => {
//         const newData = country.filter(function (item) {
//             const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
//             const textData = text.toUpperCase();
//             return itemData.indexOf(textData) > -1;
//         });
//         setCountrycode(newData)
//         setText(text)
//     }



    return (
        <ScrollView contentContainerStyle={{}} keyboardShouldPersistTaps='handled' >
            <StatusBar backgroundColor="#E61A50" barStyle="light-content" />
            {/* <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(!modalVisible); }}>
                <View style={{ marginHorizontal: 20 }}>
                    <Backbar {...props} title="Select Your Country" screen="Login" close={_closeModal} />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ marginHorizontal: 20 }}>
                        <TextInput
                            style={{ margin: 10, }}
                            autoFocus={true}
                            value={text}
                            onChangeText={text => searchCountry(text)}
                            underlineColorAndroid="#DFE4EE"
                            placeholder="Search"
                        />
                    </View>
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        {
                            countrycode.map((item, index) => (
                                <TouchableOpacity onPress={() => { selectCountry(item) }} key={index} style={{ flexDirection: 'row', marginVertical: 10, borderBottomWidth: 1, borderBottomColor: '#DFE4EE', justifyContent: 'space-between', alignContent: 'space-between', marginHorizontal: 20 }}>
                                    <View>
                                        <Text style={{ padding: 5 }}>{item.dial_code}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ padding: 5, color: "#000", fontWeight: '500', }}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))

                        }

                    </ScrollView>

                </View>
            </Modal> */}
            <Animated.View style={{
                marginHorizontal: 15, marginTop: 100,
                transform: [
                    {
                        translateX: SlideInLeft.interpolate({
                            inputRange: [0, 1],
                            outputRange: [600, 0]
                        })
                    }
                ],
            }}>

                <Text style={{ fontSize: 30, color: '#E53563', fontWeight: 'bold', }}>Welcome</Text>
                <Text style={{ color: '#414268', fontSize: 18, }}>Enter your mobile number</Text>

                <View style={{ marginTop: 20,}}>
                    <Text style={{ color: '#35365F', fontSize: 14 }}>Select Your Country</Text>
                    <TouchableOpacity onPress={() => { openModal() }} style={{ borderColor: '#C1C6D0',  height: 46, borderRadius: 10, borderWidth: 1, padding: 10, marginTop: 10, }}>
                        <Text tyle={{ color: '#414268', fontSize: 16,}}> {countryName}</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: 14, borderBottomColor: '#DFE4EE', }}>
                        <Text style={{ color: '#35365F', fontSize: 14, }}>Mobile Number</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 8 }}>
                            <View style={{ width: 70, height: 46, borderWidth: 1, borderColor: "#C1C6D0", borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#C0C7D4', fontSize: 16, fontWeight: 'bold' }}>{cc}</Text>
                            </View>

                            <View style={{ flex:1, height: 46, borderWidth: 1, borderColor: '#C1C6D0', borderRadius: 10, marginLeft: 6 }}>
                                <TextInput
                                    placeholderTextColor="#4A4441"
                                    placeholder="Mobile number *"
                                    keyboardType="number-pad"
                                    maxLength={10}
                                    // onChangeText={phoneNumber => setPhoneNumber(`${phoneNumber}`)}
                                />
                            </View>
                        </View>
                    </View>

                </View>
                

                <View style={{ marginTop: 22, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { _acceptTermsCondition() }}>
                        {
                            isChecked ?
                                <View>
                                    <MaterialCommunityIcons name="checkbox-marked" color="#007FEB" size={30} />
                                </View> :
                                <View>
                                    <MaterialCommunityIcons name="checkbox-blank-outline" color="#B8B7B7" size={30} />
                                </View>

                        }
                    </TouchableOpacity>
                    
                    <View>
                        <Text style={{ paddingLeft: 5 }}>
                            <Text style={{ color: '#ADB7CB', fontSize: 14 }}>I have read and understood the</Text>
                            <Text style={{ color: "#E53563" }} onPress={() => { Linking.openURL('https://skugal.com/terms-of-use') }}> Terms of Use </Text> <Text style={{ color: '#ADB7CB', fontSize: 14 }}>and</Text>
                        </Text>
                        <Text style={{ color: "#E53563", paddingLeft: 5 }} onPress={() => { Linking.openURL('https://skugal.com/privacy-policy') }}>Privacy Policy.</Text>
                    </View>
                </View>


                <View style={{ marginTop: 50, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: '#84859B', fontSize: 14, }}>We will send you a 6-digit OTP to verify</Text>
                    {/* <CustomButton {...props} button={styles.button} _doAction={getLogin} item={phoneNumber} buttonText={styles.buttonText} title="Submit" /> */}
                    <TouchableOpacity style={styles.button} ><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>
                </View>
            </Animated.View>
            {/* {userReducer.loginLoading && <Loader />} */}

        </ScrollView>
    )
}




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


    buttonText: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
    }
})

export default Login
