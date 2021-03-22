import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, Linking, Alert, Image, StatusBar } from 'react-native'
import Headers from '../components/Headers'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { connect } from 'react-redux';
// import { getNotification, selectItem, gotoDocAndSelectItem, deleteNotification, resetNotificationSelection } from '../redux/actions/dashboardAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storyDate } from '../functions/timeformat';
import Loader from '../components/Loader';


const Notification = (props) => {
    // const { dashboardReducer, getNotification, notificationIncrement, selectItem, gotoDocAndSelectItem, deleteNotification, resetNotificationSelection, } = props

    const [loginData, setLoginData] = useState({})
    const [notificationData, setNotificationData] = useState([
        { messageTitle: "hello how are you  hello how are you hello how are you", docType: "pdf" },
        { messageTitle: "hello how are you  are you  hello how are you  ", docType: "text" },
        { messageTitle: "hello how are you ", docType: "image" },
        { docType: "image" }
    ])

    // useEffect(() => {
    //     AsyncStorage.getItem('login').then((r) => {
    //         if (r != null) {
    //             let d = JSON.parse(r)
    //             setLoginData(d)
    //             var unsubscribeNotification = getNotification(d.parentId)
    //         }
    //         return () => { unsubscribeNotification }
    //     }).catch((e) => { })

    // }, [])



    // const openURL = (item) => {
    //     try {
    //         Linking.openURL(String(item.datalink)).then((d) => {
    //         }).catch((e) => { })
    //     }
    //     catch (e) { }

    // }

    // const deleteNoti = () => {
    //     Alert.alert(
    //         `Delete Notification ?`,
    //         `Are you sure, You want to delete Selected Notification ?`,
    //         [
    //             {
    //                 text: "Delete",
    //                 onPress: () => deleteNotification(loginData.parentId)
    //             },

    //             {
    //                 text: 'Cancel',
    //                 onPress: () => console.log('Cancel Pressed'),
    //                 style: 'cancel',
    //             },

    //         ],
    //         { cancelable: false },
    //     );

    // }


    const gotoDocument = (item, index) => {
        gotoDocAndSelectItem(item, index)
    }

    const selectData = (item, index) => {
        selectItem(item, index)
    }


    // const _resetNotification = () => {
    //     resetNotificationSelection()
    // }



    return (
        // dashboardReducer.isLoading ? <Loader /> :
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar backgroundColor="#E61A50" barStyle="light-content" />
            {/* <Headers {...props} title="Notifications" screen="Notification" selectedCount={notificationIncrement} _delete={deleteNoti} resetNotification={_resetNotification} /> */}

            <Headers {...props} title="Notifications" screen="Notification" />
            {/* {dashboardReducer.notifications && */}
            <FlatList
                // data={dashboardReducer.notifications}
                data={notificationData}
                contentContainerStyle={{ paddingBottom: 10 }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => { return index.toString(); }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={{ backgroundColor: item.isSelect ? '#F2F2F2' : '#fff' }}
                        delayLongPress={2000}
                        onLongPress={() => { selectData(item, index) }}
                        onPress={() => { gotoDocument(item, index) }}
                    >
                        <View style={{ flexDirection: "row", marginVertical: 15, marginHorizontal: 15, }}>
                            <TouchableOpacity>
                                {item.docType == 'pdf' &&
                                    <MaterialCommunityIcons name="file-pdf-box" color={"red"} size={36} />
                                }
                                {item.docType == 'image' &&
                                    <Image source={{ uri: item.imageUrl }} style={{ width: 36, height: 36, borderRadius: 18, }} />
                                }

                                {item.docType == 'text' &&
                                    <View style={{ width: 36, height: 36, borderRadius: 18, justifyContent: 'center' }}>
                                        {item.messageTitle == undefined &&
                                            <Text style={{ textAlign: 'center', color: '#fff', fontWeight: "bold", fontSize: 16 }}>M</Text>
                                        }
                                        {item.messageTitle &&
                                            <Text style={{ textAlign: 'center', color: '#fff', fontWeight: "bold", fontSize: 16 }}>{item.messageTitle.length !== 0 ? item.messageTitle.slice(0, 1) : "M"}</Text>
                                        }
                                    </View>
                                }
                                {
                                    item.notificationType == 'Attendancereport' &&
                                    <View style={{ width: 36, height: 36, backgroundColor: '#47B6B7', borderRadius: 18, justifyContent: 'center' }}>
                                        <Text style={{ textAlign: 'center', color: '#fff', fontWeight: "bold", fontSize: 16 }}>{item.messageTitle ? item.messageTitle.slice(0, 1) : "M"}</Text>
                                    </View>
                                }
                                {
                                    item.isSelect &&
                                    <MaterialCommunityIcons name="check-circle" size={18} color="#E61A50" style={{ position: 'absolute', bottom: 15, right: 0 }} />
                                }






                            </TouchableOpacity>


                            <View style={{ flex: 1, paddingLeft: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#35365F" }}>{item.messageTitle || ''}</Text>
                                <Text style={{ fontSize: 14, color: "#392C60" }}>{item.messageBody || ''}</Text>
                                {
                                    item.notificationType == 'Attendancereport' &&
                                    <Text style={{ color: '#E61A50', fontWeight: "bold", fontSize: 10 }}>Attendance Report</Text>

                                }
                                {item.datalink != undefined && item.datalink.length !== 0 &&
                                    <TouchableOpacity onPress={() => { openURL(item) }}>
                                        <Text style={{ color: '#007FEB' }}>{item.notificationType == 'Onlineclasses' ? "Click here to join class" : item.datalink}</Text>
                                    </TouchableOpacity>
                                }
                            </View>

                            <Text style={{ color: '#848598', fontSize: 10, paddingTop: 5 }}>{storyDate(item.timestamp)}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            {/* } */}
            {/* {
                    dashboardReducer.notifications.length == 0 &&
                    <Text style={{ color: 'red' }}>No Notiication !</Text>
                } */}


        </View>

    )


}


// const mapStateToProps = (state) => ({
//     dashboardReducer: state.dashboardReducer,
//     notificationIncrement: state.dashboardReducer.deleteIncrement,
//     deleteNotification: state.dashboardReducer.deleteNotification,
//     resetNotificationSelection: state.dashboardReducer.resetNotificationSelection
// })

// export default connect(mapStateToProps, { getNotification, selectItem, gotoDocAndSelectItem, deleteNotification, resetNotificationSelection })(Notification);

export default Notification
