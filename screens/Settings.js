import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Linking, StyleSheet, Alert } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { doLogOut } from '../redux/actions/authActions'
import Backbar from '../components/Backbar'
import { connect } from 'react-redux'
import { settingData } from '../classData.js'
import { version as app_version } from '../package.json';

const Settings = (props) => {
    const { loginData, doLogOut } = props
    const [settings, setSettings] = useState(settingData)
    const [version, setVersion] = useState(app_version)

    const signOut = () => {
        Alert.alert(
            'Confirm Message',
            'Do you really want to Logout ?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        doLogOut()
                        console.log("logout called")
                    }
                },
            ],
            { cancelable: false },
        );
    }

    const gotoScreen = (item) => {
        if (item.screen == "Logout") {
            signOut()
        }
        else if (item.screen == 'Help') {
            Linking.openURL('https://skugal.com/faqs/').then((r) => { }).catch(e => { })
        }
        else {
            props.navigation.navigate(item.screen)
            console.log("item is", item)
        }

    }
    return (
        <View style={{ flex: 1 }}>
            <Backbar {...props} title="Settings" screen="Settings" />
            <ScrollView style={{ paddingTop: 15 }}>
                {
                    loginData &&
                    <View style={{ borderBottomColor: '#cecece', borderBottomWidth: .5, paddingBottom: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, }}>
                            <TouchableOpacity style={{ backgroundColor: '#2B454E', borderRadius: 23, width: 46, height: 46, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{loginData.firstName != undefined ? loginData.firstName.charAt(0).toUpperCase() : ''}</Text>
                            </TouchableOpacity>
                            <View style={{ paddingLeft: 15 }}>
                                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>{loginData.firstName} {loginData.lastName}</Text>
                            </View>
                        </View>
                    </View>
                }
                {
                    settings.map((item, index) => (
                        <TouchableOpacity onPress={() => { gotoScreen(item) }} key={index} style={{ flexDirection: 'row', alignItems: "center", marginVertical: 10, marginHorizontal: 15, }}>
                            <View >
                                <MaterialCommunityIcons size={22} name={item.navOptionThumb} color="#2B454E" />
                            </View>
                            <View style={{ paddingLeft: 10, borderBottomWidth: .5, borderBottomColor: '#cecece', paddingBottom: 10, width: '100%' }}>
                                <Text style={styles.midbigtext}>{item.title}</Text>
                                <Text style={styles.midsmalltext}>{item.subTitle}</Text>
                            </View>

                        </TouchableOpacity>
                    ))
                }

                {
                    loginData &&
                    <View style={{ alignSelf: 'center', marginHorizontal: 15 }}>
                        <Text style={{ color: '#000' }}>{loginData.schoolName ? loginData.schoolName.split(',')[0] : ''}</Text>
                    </View>
                }

                <TouchableOpacity style={{ alignSelf: 'center', paddingTop: 15, paddingBottom: 50 }}>
                    <Text style={{ textAlign: 'center' }}>from</Text>
                    <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>SkuGal</Text>
                    <Text style={{ textAlign: 'center', paddingTop: 20 }}><Text style={{ color: '#000' }}>Teacher App</Text> V - {version}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const mapStateToProps = (state) => ({
    loginData: state.mainReducer.loginData,

})
export default connect(mapStateToProps, { doLogOut })(Settings);

const styles = StyleSheet.create({
    midbigtext: {
        fontSize: 16,
        color: "#35365F"
    },
    midsmalltext: {
        fontSize: 12,
        color: "#35365F"
    }

})