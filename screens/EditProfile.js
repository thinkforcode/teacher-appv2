import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, Animated, Dimensions, SafeAreaView, Image, StatusBar, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import CustomButton from '../components/CustomButton'
import Loader from '../components/Loader'
import { updateProfile } from '../redux/actions/mainActions'




const EditProfile = (props) => {

    const {  loginData ,mainReducer,updateProfile } = props

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')

    const SlideInLeft = useRef(new Animated.Value(0)).current;

    


   const  _edit = () => {
        let d = {
            firstName: firstName,
            lastName: lastName,
            email: email,
        }
        updateProfile(d, loginData.teacherId)

    }

    useEffect(() => {
        
               let  d = loginData
                setFirstName(d.firstName)
                setLastname(d.lastName)
                setEmail(d.email)
         
            return () => { }
        }, [])

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
            
            
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">

                <View style={{ marginHorizontal: 30 }}>
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
                            <TextInput
                                autoCompleteType="name"
                                placeholder="Teacher's First Name"
                                placeholderTextColor="#8F8FA6"
                                defaultValue={firstName}
                                style={styles.input}
                                onChangeText={(value) => { setFirstName(value) }}
                            />

                            <TextInput
                                placeholder="Teacher's Last Name"
                                placeholderTextColor="#8F8FA6"
                                defaultValue={lastName}
                                style={styles.input}
                                onChangeText={(value) => { setLastname(value) }}
                            />

                            <TextInput
                                keyboardType="email-address"
                                autoCompleteType="email"
                                placeholder="Email Id"
                                placeholderTextColor="#8F8FA6"
                                defaultValue={email}
                                style={styles.input}
                                onChangeText={(value) => { setEmail(value) }}
                            />

                        </View>

                       <View style = {{marginTop:20}}>
                           {/* _doAction={_registerUser}  */}
                         <CustomButton {...props} button={styles.button}  _doAction={_edit}  buttonText={styles.buttonText} title="UPDATE" />
                       </View>
                    </Animated.View>
                </View>

            </ScrollView>

            {mainReducer.isLoading && <Loader />}

        </SafeAreaView>


    )
}



const mapStateToProps = (state) => ({
    loginData: state.mainReducer.loginData,
    mainReducer: state.mainReducer,
})

export default connect(mapStateToProps, {updateProfile})(EditProfile);

const numColumns = 3;
const size = (Dimensions.get('window').width - 80) / numColumns;

const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#C1C6D0',
        marginVertical: 10,
        borderRadius:10,
        paddingLeft:10
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
        backgroundColor:'#2B454E'
    },


    buttonText: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
    }
})