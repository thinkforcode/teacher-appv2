import React, { useState, useEffect, useRef } from 'react'
import { View, TouchableOpacity, Animated, Text, TextInput, StyleSheet, StatusBar, Linking, Modal, ScrollView, Dimensions, Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Backbar from '../../components/Backbar'
import CustomButton from '../../components/CustomButton'
import Loader from '../../components/Loader'
import country from '../../countrycode.json'
import { onUserLogin } from '../../redux/actions/authActions'
import { connect } from 'react-redux'


const Login = (props) => {
    const [isChecked, setIsChecked] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [text, setText] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [cc, setcc] = useState('+91')
    const [countryName, setCountryName] = useState('India')

    const [countrycode, setCountrycode] = useState(country)

    const SlideInLeft = useRef(new Animated.Value(0)).current;


    const { authReducer, onUserLogin } = props

    useEffect(() => {
        return Animated.parallel([
            Animated.timing(SlideInLeft, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
        ]).start();
    })



    useEffect(() => {
        if (authReducer.loginData!= null) {
            if (authReducer.loginData.status) {
                props.navigation.navigate('Otp')
            }
            else {
                alert("Please talk to your School Administration for Signup !")
            }
        }
        else {
        }
    }, [authReducer.isLoginPage])


    const getLogin = () => {
        if (phoneNumber.length < 10) {
            alert("Please enter a valid mobile number !")
        }
        else {
            onUserLogin(cc, phoneNumber)
        }
    }

    const selectCountry = (item) => {
        setModalVisible(!modalVisible)
        setcc(item.dial_code)
        setCountryName(item.name)
    }

    const _acceptTermsCondition = () => {
        setIsChecked(!isChecked)
    }

    const openModal = () => {
        setModalVisible(!modalVisible)
    }

    const _closeModal = () => {
        setModalVisible(!modalVisible)
    }


    const searchCountry = (text) => {
        const newData = country.filter(function (item) {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setCountrycode(newData)
        setText(text)
        
    }

    console.log("authReducer login", authReducer.loading)


    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }} keyboardShouldPersistTaps='handled' >
            <StatusBar backgroundColor="#2B454E" barStyle="light-content" />
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(!modalVisible); }}>
                <View >
                    <Backbar {...props} title="Select Your Country" screen="Login" closeModal={_closeModal} />
                </View>
                <View style={{ marginTop: 20, marginHorizontal:15 }}>
                    <View >
                        <TextInput
                            autoFocus={true}
                            value={text}
                            onChangeText={text => searchCountry(text)}
                            underlineColorAndroid="#DFE4EE"
                            placeholder="Search Your Country eg. India"
                        />
                    </View>
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        {
                            countrycode.map((item, index) => (
                                <TouchableOpacity onPress={() => { selectCountry(item) }}
                                    key={index}
                                     style={{
                                        flexDirection: 'row', marginVertical: 10,  borderBottomWidth: 1, borderBottomColor: '#DFE4EE', justifyContent: 'space-between', alignContent: 'space-between',
                                    }}>
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
            </Modal>
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
                <View style={styles.headerPart}>
                    <Image
                        style={styles.imageStyle}
                        source={require('../../assets/images/login_illustration.png')} />

                </View>
                
                <View style={{ marginHorizontal: 15, marginTop: 50 }}>
                    <Text style={styles.Text}>Enter Your Mobile Number</Text>
                    <TouchableOpacity onPress={() => { openModal() }} style={styles.countryBox}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text tyle={{ color: '#263238', fontSize: 18, }}> {countryName}</Text>
                            <View style={styles.dropDownStyle}>
                                <MaterialCommunityIcons name="chevron-down" color="#707070" size={18} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={{ marginTop: 10, }}>

                        <View style={styles.mobileNumber}>
                            <View style={styles.inputText}>
                                <Text style={styles.mobileNumberText}>{cc}</Text>
                            </View>

                            <View style={styles.inputBox}>
                                <TextInput 
                                    placeholderTextColor="#A3A4A7"
                                    placeholder="Your 10-digit mobile number "
                                    keyboardType="number-pad"
                                    maxLength={10}
                                    onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
                                />
                            </View>
                        </View>
                    </View>

                </View>

                <View style={styles.buttonStyle}>
                    <CustomButton {...props} button={styles.button} _doAction={getLogin} buttonText={styles.buttonText} title="Verify & Proceed" />

                </View>
            </Animated.View>
            {authReducer.loading && <Loader />}

        </ScrollView>

    )
}

const mapStateToProps = (state) => ({
    authReducer: state.authReducer,
})

export default connect(mapStateToProps, { onUserLogin })(Login);





const styles = StyleSheet.create({
    button: {
        borderRadius: 14,
        marginTop: 70,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#2B454E',
        marginBottom:5
    },


    buttonText: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: "500",
    },
    HeaderText: {
        fontSize: 30,
        color: '#E53563',
        fontWeight: 'bold'
    },
    titleText: {
        color: '#414268',
        fontSize: 18,
    },
    countryBox: {
        borderBottomWidth: 0.5,
        borderColor: '#A3A4A7',
        height: 35,
        marginTop:30
        
    },
    Text: {
        color: '#263238',
        fontSize: 25,
        fontWeight: 'bold'
    },
    inputBox: {
        flex: 1,
        height: 45,
        borderBottomWidth: 0.5,
        borderColor: '#A3A4A7',
        fontWeight: "500"


    },
    inputText: {
        width: 45,
        height: 45,
        borderBottomWidth: 0.5,
        borderColor: "#A3A4A7",
        justifyContent: 'center',

    },
    mobileNumber:
    {
        flexDirection: 'row',
        alignItems: 'center',

    },
    mobileNumberText: {
        color: '#263238',
        fontSize: 16,
        fontWeight: '500'
    },

    imageStyle: {
        alignItems: "center",
        height: Dimensions.get('window').height / 3,
        position: "absolute",
        bottom: 0,
        resizeMode: "contain",
    },
    headerPart: {
        backgroundColor: '#FFF6E2',
        width: '100%',
        height: Dimensions.get('window').height / 2.5,
        // justifyContent:"center"
        alignItems:"center"
    },
    dropDownStyle: {
        backgroundColor: "#f2f2f2",
        justifyContent: "center",
        alignItems: "center",
        width: 20,
        height: 20,
        borderRadius: 10
    },
    buttonStyle: {
        marginHorizontal: 30,
    }

})

