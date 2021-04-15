import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, Animated, SafeAreaView, StatusBar, ScrollView, Dimensions, Linking } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import CustomButton from '../../components/CustomButton'
import Autoplace from '../../components/Place'
import Loader from '../../components/Loader'
import { onUserRegister } from '../../redux/actions/authActions'
import { emailValidate } from '../../functions/validation'


const Signup = (props) => {
    const { authReducer, onUserRegister } = props

    const [fName, setfName] = useState('')
    const [lName, setlName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

    const SlideInLeft = useRef(new Animated.Value(0)).current;

    const _registerUser = () => {
        if (fName.trim() === "") {
            alert("Please enter Your First Name!")
        }
        else if (email.trim() === "") {
            alert("Email can not be empty !")
        }
        else if (!(emailValidate(email))) {
            alert("Please enter a valid email address !")
        }
        else {
            let d = { firstName: fName, lastName: lName, email: email, address: address }
            onUserRegister(d)
        }
    }

    const selectdAddress = (arg1, arg2) => {
        setAddress(arg2.formatted_address);
        return;
    }

    useEffect(() => {
        return Animated.parallel([
            Animated.timing(SlideInLeft, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
        ]).start();
    })
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor="#2B454E" barStyle="light-content" />

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
                <View style={styles.headerPart}>
                    <Text style={styles.headerText}>Create Your</Text>
                    <Text style={styles.headerText}>Account</Text>
                    <Text style={styles.titleText}>Enter your basic details</Text>
                </View>
                <View style={{ marginHorizontal: 15 }}>
                    <Animated.View style={{
                        marginTop: 30,
                        transform: [
                            {
                                translateX: SlideInLeft.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [600, 0]
                                })
                            }
                        ],
                    }}>
                        <View style={{ marginTop: 10 }}>
                            <View style={styles.inputBox}>
                                <MaterialCommunityIcons name="account-circle-outline" color="#707070" size={16} />
                                <TextInput
                                    placeholder="First Name"
                                    placeholderTextColor="#707070"
                                    value={fName}
                                    style={styles.input}
                                    onChangeText={(value) => { setfName(value) }}
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <MaterialCommunityIcons name="account-circle-outline" color="#707070" size={16} />
                                <TextInput
                                    placeholder="Last Name"
                                    placeholderTextColor="#707070"
                                    value={lName}
                                    style={styles.input}
                                    onChangeText={(value) => { setlName(value) }}
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <MaterialCommunityIcons name="email-outline" color="#707070" size={16} />
                                <TextInput
                                    keyboardType="email-address"
                                    autoCompleteType="email"
                                    placeholder="Email ID"
                                    placeholderTextColor="#707070"
                                    value={email}
                                    style={styles.input}
                                    onChangeText={(value) => { setEmail(value) }}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="map-marker-outline" color="#707070" size={16} />
                                <Autoplace addAddress={selectdAddress} title="Address" />
                            </View>
                            
                            <Text style={styles.discriptionText}>By Registering,your confirm that you accept our</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.linkText} onPress={() => { Linking.openURL('https://skugal.com/terms-of-use') }}>Terms to Use</Text>
                                <Text style={{ color: "#707070", fontSize: 14 }}> and</Text>
                                <Text style={styles.linkText} onPress={() => { Linking.openURL('https://skugal.com/privacy-policy') }}> Privacy Policy</Text>
                            </View>
                        </View>

                        <View style={styles.buttonStyle}>
                            <CustomButton {...props} button={styles.button} _doAction={_registerUser} buttonText={styles.buttonText} title="NEXT" />
                        </View>
                    </Animated.View>
                </View>

            </ScrollView>

            { authReducer.loading && <Loader />}

        </SafeAreaView>


    )
}



const mapStateToProps = (state) => ({
    authReducer: state.authReducer,
})

export default connect(mapStateToProps, { onUserRegister })(Signup);



const styles = StyleSheet.create({
    input: {
        flex: 1,
        fontSize: 16,
    },

    inputOne: {
        flex: 1,
        fontSize: 16,
    },

    button: {
        borderRadius: 14,
        marginTop: 20,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#2B454E',
        marginBottom: 5
    },


    buttonText: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: "500",
    },

    descriptionText:
    {
        color: '#8F8FA6',
        fontSize: 12,
        marginTop: 30
    },
    headerPart: {
        backgroundColor: '#2B454E',
        width: '100%',
        height: Dimensions.get('window').height / 3,
        justifyContent: "center"
    },
    buttonStyle: {
        marginHorizontal: 30,
        marginTop: 20
    },
    headerText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#fff",
        paddingLeft: 15
    },
    titleText: {
        fontSize: 16,
        color: "#C6DBE2",
        paddingLeft: 15,
        paddingTop: 10
    },
    inputBox: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderColor: "#A3A4A7"
    },
    discriptionText: {
        paddingTop: 15,
        color: "#707070",
        fontSize: 14
    },
    linkText: {
        color: "#FFC800",
        fontSize: 14
    }
})