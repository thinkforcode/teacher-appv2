import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import Backbar from '../components/Backbar'
import { connect } from 'react-redux'
import { getNotification } from '../redux/actions/mainActions';
import { storyDate } from '../functions/timeformat';
const Notification = (props) => {

    const { loginData, notifications, getNotification } = props

    useEffect(() => {
        if (loginData != null) {
            getNotification(loginData)
        }
        return () => { }
    }, [])

    console.log("notifications", notifications)

    const renderHeader = () => {
        return (
            <View>
            <View style={styles.headerStyle}>
                <Text style={styles.recentText}>Recent</Text>
            </View>
            <View style={styles.titleStyle}>
                <View style={styles.midPart}>
                    <Text style={{ color: "#2B454E", fontSize: 14, fontWeight: "bold" }}>You have an event to attend </Text>
                    <Text style={{ fontSize: 12, color: "#A3A4A7" }}>1 min | 9:55 Am</Text>
                </View>
                <Text style={{ fontSize: 14, color: "#707070" }}>Updating to 6.3.0 running any .ts files I am getting an error</Text>
            </View>
            </View>
        )
    }


    return (
        <View style={{ flex: 1 }}>
            <Backbar {...props} title="Notification" screen="Notification" />
            {notifications.length > 0 &&
                <FlatList
                    contentContainerStyle={{ paddingBottom: 20, paddingTop: 12 }}
                    data={notifications}
                    extraData={notifications}
                     ListHeaderComponent = {renderHeader()}
                    renderItem={({ item, index }) => (

                        <View style={{ marginTop: 10, marginHorizontal: 15, flexDirection: "row",  justifyContent: "space-between" }}>
                            
                           {item.imageUrl == '' ?
                                    <Image style={styles.avatar} source={{ uri: item.imageUrl }}></Image>
                                    :
                                    <View style={{ backgroundColor: '#E7398D', borderRadius: 10, width: 38, height: 38, justifyContent: 'center' }}>
                                        <Text style={styles.avatarText}>{item.profileName ? item.profileName[0] : 'N|A'}</Text>

                                    </View>
                                }
                              
                                   <View style={{flex:1}} >
                                   <Text style={{ fontSize: 14, fontWeight: "bold", color: "#2B454E", paddingLeft: 10 }}>{item.name ? item.name : 'No Name'}</Text>
                                <Text style={{ fontSize: 14, color: "#707070", paddingLeft: 10 }}>{item.messageBody}</Text>
                            </View>
                            <Text style={{ fontSize: 12, color: "#A3A4A7" }}>{storyDate(item.timestamp)}</Text>


                            
                        </View>

                    )

                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            }

            {
                notifications.length == 0 &&
                <Text style={{ color: 'red', marginTop: 150, alignSelf:"center" }}>No Notiication !</Text>
            }

            </View>
    )
}

const mapStateToProps = (state) => ({
    loginData: state.mainReducer.loginData,
    notifications: state.mainReducer.notifications,

})
export default connect(mapStateToProps, { getNotification })(Notification);

const styles = StyleSheet.create({


    avatarText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#fff',
        fontWeight: "500"
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: 10,
    },
    headerStyle:
    {
        marginVertical: 8,
         marginHorizontal: 15 
    },
    recentText:{
        fontSize: 12,
         fontWeight: "500", 
         color: "#3A9E22"
    },
    titleStyle:{
        backgroundColor: "#CDEECB",
         padding: 15 
    },
    midPart:{
        flexDirection: "row",
         justifyContent: "space-between",
          alignItems: "center"
    }


}
)