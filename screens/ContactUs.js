import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Linking, ScrollView, ImageBackground } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { connect } from 'react-redux';
import Headers from '../components/Headers'
// import { createTicket, openDocumentPicker } from '../redux/actions/dashboardAction';


const ContactUs = (props) => {
    const [description, setDescription] = useState('');
    const [loginData, setLoginData] = useState({});
    const [isDisabled, setIsDisabled] = useState(true)
    const [photo, setPhoto] = useState([])

    // const { createTicket, openDocumentPicker, imagPreviewData } = props

    // useEffect(() => {
    //     AsyncStorage.getItem('login').then((r) => {
    //         if (r != null) {
    //             let d = JSON.parse(r)
    //             setLoginData(d)
    //         }
    //         return () => { }
    //     }).catch((e) => { })

    // }, [])


    const createTkt = () => {
        createTicket(loginData, description, photo)
    }

    useEffect(() => {
        if (description.trim().length > 0) {
            setIsDisabled(false)
        }
        else {
            setIsDisabled(true)
        }
        return () => {
        }
    }, [description])

    const isEmpty = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    // useEffect(() => {
    //     let d = [...photo]
    //     if (isEmpty(imagPreviewData)) {
    //     } else {
    //         d.push(imagPreviewData)
    //         setPhoto(d)

    //     }
    //     return () => {
    //     }
    // }, [imagPreviewData])


    const removeImage = (i) => {
        let p = [...photo]
        p.splice(i, 1)
        setPhoto(p)
    }

    

    const addScreenShot = (i) => {
        openDocumentPicker('image', 'ContactUs')
    }

    const renderAddBox = () => {
        const box = [];
        for (let i = 0; i < 3; i++) {
            box.push(
                <TouchableOpacity style={styles.avatar} key={i} onPress={() => { addScreenShot(i) }}>
                    {box[i] === photo[i] ? <MaterialCommunityIcons size={25} name="plus-circle-outline" color="#000" /> :
                        <View>
                            <ImageBackground style={{ width: 100, height: 100, borderRadius: 5, }}
                                source={{ uri: photo[i].fileCopyUri }}>
                            </ImageBackground>
                            <TouchableOpacity style={{position:'absolute', top:0, right:0}} onPress={() => { removeImage(i) }}>
                                <MaterialCommunityIcons size={25} name="close-circle" color="#000" />
                            </TouchableOpacity>
                        </View>
                    }

                </TouchableOpacity>
            )
        }
        return box;
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView style={{ backgroundColor: '#fff' }} keyboardShouldPersistTaps='handled' >
                <Headers {...props} title={`Contact us`} screen="ContactUs" />
                <View style={styles.container}>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={{ paddingHorizontal: 10 }}
                            placeholder="Describe your problem "
                             multiline
                            onChangeText={text => setDescription(text)} />
                    </View>
                    <Text style={styles.screenShortText}>Add screenshorts (options)</Text>

                    <View style={styles.addScreenShot}>
                        {renderAddBox()}

                    </View>

                </View>

            </ScrollView>
            <View style={{ justifyContent: "flex-end" }}>
                <View style={styles.footer}>
                    <Text style={{ color: "#392C60" }} onPress={() => { Linking.openURL('https://skugal.com/privacy-policy') }}>Have you read our FAQ yet?</Text>
                    <TouchableOpacity disabled={isDisabled} style={{ width: 80, height: 40, opacity: isDisabled ? .6 : 1, backgroundColor: isDisabled ? "#848598" : '#E61A50', borderRadius: 5, alignItems: "center", justifyContent: "center" }}
                        onPress={() => createTkt()}>
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    avatar: {
        backgroundColor: '#f2f2f2',
        width: 100,
        height: 100,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'

    },
    inputBox:
    {
        backgroundColor: "#f2f2f2",
         borderTopLeftRadius: 5,
          borderTopRightRadius: 5, 
          borderBottomWidth: 1,
           height: 100,
            borderColor: "#C1C6D0" 
    },
    container:
    {
        marginHorizontal: 15,
         marginTop: 20 
    },
    screenShortText:
    {
        fontSize: 14,
         color: "#46C481",
          paddingTop: 40,
    },
    addScreenShot:
    {
        flexDirection: "row", 
        alignItems: "center",
         marginTop: 40,
          justifyContent: "center",
           justifyContent: "space-between"
    },
    footer:
    {
        flexDirection: "row", 
        justifyContent: "space-between",
         alignItems: "center",
          marginHorizontal: 15, 
          height: 60,
           backgroundColor: "#fff"
    }

})


// const mapStateToProps = (state) => ({
//     imagPreviewData: state.dashboardReducer.imagPreviewData,

// })

// export default connect(mapStateToProps, { createTicket, openDocumentPicker })(ContactUs);

export default ContactUs
