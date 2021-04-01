import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, Animated, SafeAreaView,  StatusBar, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import CustomButton from '../../components/CustomButton'
import Autoplace from '../../components/Place'
import Headers from '../../components/Headers'
import Loader from '../../components/Loader'
import { onUserRegister } from '../../redux/actions/authActions'

const Signup = (props) => {
    const { authReducer, onUserRegister } = props

    const [fName, setfName] = useState('')
    const [lName, setlName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

    const SlideInLeft = useRef(new Animated.Value(0)).current;

    const _registerUser = () => {
        let d = { firstName: fName, lastName: lName, email: email, address: address}
        onUserRegister(d)
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
            <StatusBar backgroundColor="#E61A50" barStyle="light-content" />
            <Headers {...props} title="New Account" />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
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
                        <Text style={styles.titleText}>Enter Your Basic Details</Text>
                        <View style={{ marginTop: 10 }}>
                            <TextInput
                                autoCompleteType="name"
                                placeholder="First Name"
                                placeholderTextColor="#8F8FA6"
                                value={fName}
                                style={styles.input}
                                onChangeText={(value) => { setfName(value) }}
                            />

                            <TextInput
                                placeholder="Last Name"
                                placeholderTextColor="#8F8FA6"
                                value={lName}
                                style={styles.input}
                                onChangeText={(value) => { setlName(value) }}
                            />

                            <TextInput
                                keyboardType="email-address"
                                autoCompleteType="email"
                                placeholder="Email Id"
                                placeholderTextColor="#8F8FA6"
                                value={email}
                                style={styles.input}
                                onChangeText={(value) => { setEmail(value) }}
                            />

                            <Autoplace addAddress={selectdAddress} title="Address" />
                            <Text style={styles.descriptionText}>Your basic details is your privacy, Skugal understands it. Skugal does not share it with any third party.</Text>

                            <View style={{ marginTop: 20 }}>
                                <CustomButton {...props} button={styles.button} _doAction={_registerUser} buttonText={styles.buttonText} title="NEXT" />
                            </View>
                        </View>

                    </Animated.View>
                </View>

            </ScrollView>

            { authReducer.signUpLoading && <Loader /> }

        </SafeAreaView>


    )
}



const mapStateToProps = (state) => ({
    authReducer: state.authReducer,
})

export default connect(mapStateToProps, { onUserRegister })(Signup);



const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#C1C6D0',
        marginVertical: 10,
        borderRadius: 10,
        paddingLeft: 10
    },

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
    },
    titleText:
    {
        color: '#35365F',
        fontSize: 16,
    },
    descriptionText:
    {
        color: '#8F8FA6',
        fontSize: 12,
        marginTop: 30
    }
})