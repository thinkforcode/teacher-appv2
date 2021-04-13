import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList, Linking, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { formatTimeAMPM } from '../functions/timeformat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Backbar from '../components/Backbar'
import { getOnlineClass } from '../redux/actions/mainActions';


const OnlineClass = (props) => {
    const { getOnlineClass,  onlineClass, loginData, selectedClass } = props



    const takeClass = (item) => {
        try {
            Linking.openURL(String(item.hangoutsLink)).then((d) => {
            }).catch((e) => { })
        }
        catch (e) {}
    }

        //Get online class
        useEffect(() => {
            if (loginData) {
                getOnlineClass(loginData.userId, loginData.schoolId, selectedClass.standard, selectedClass.section)
            }
            return () => { }
        }, [selectedClass])
    
        console.log("online class", onlineClass)

    return (
        <SafeAreaView style={{ flex: 1 }}>
                  <Backbar {...props} title="Your Classes" screen="OnlineClass" />

            <View style={styles.container}>
                {onlineClass.length > 0 &&
                    <View>
                        <FlatList
                            contentContainerStyle={styles.contentList}
                            data={onlineClass}
                            extraData={onlineClass}
                            keyExtractor={(item, index) => { return index.toString(); }}
                            renderItem={({ item, index }) => {
                                return (
                                    <View>
                                        {item.events.map((data, i) => {
                                            return (
                                                <View key={i} style={{ backgroundColor: '#fff', marginVertical: 8, marginHorizontal: 15, borderRadius: 10, elevation: 3 }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, justifyContent: 'space-between' }}>
                                                        <View>
                                                            <View style={{ flexDirection: 'row', }}>
                                                                <Text style={{ color: '#848598', fontSize: 14 }}>Subject</Text>
                                                                <View style={{ marginLeft: 15, }}>
                                                                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold', backgroundColor: '#FEB62D', borderRadius: 8, padding: 5, textAlign: 'center' }}>
                                                                        {data.subject}</Text>
                                                                    <View style={{ paddingTop: 3, flexDirection: 'row' }}>
                                                                        { (data.startOfClass && data.endOfClass) ?
                                                                            <View>
                                                                                <Text style={{ color: '#848598', fontSize: 9, }}>{data.startOfClass} - {data.endOfClass} |</Text>
                                                                            </View>
                                                                            :
                                                                            <View>
                                                                                <Text style={{ color: '#848598', fontSize: 9, }}>{formatTimeAMPM(data.startTime.dateTime)}</Text>
                                                                            </View>
                                                                        }
                                                                        { data.days.map((day, i) => {
                                                                            return (
                                                                                <Text key={i} style={{ color: '#848598', fontSize: 9, paddingHorizontal: 1 }}>{day.charAt(0)}</Text>
                                                                            );
                                                                        })
                                                                        }
                                                                    </View>
                                                                </View>
                                                            </View>

                                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                                                                <Text style={{ color: '#848598', fontSize: 14 }}>Location</Text>
                                                                <Text style={{ paddingLeft: 10, color: '#392C60', fontSize: 14, width: 120 }}>{data.location ? data.location : 'Skugal App'}</Text>
                                                            </View>


                                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                                                                <Text style={{ color: '#848598', fontSize: 14 }}>Teacher</Text>
                                                                <Text style={{ paddingLeft: 15, color: '#392C60', fontSize: 14 }}>{data.teacherName ? data.teacherName : 'N/A'}</Text>
                                                            </View>
                                                        </View>
                                                        <TouchableOpacity onPress={() => { takeClass(data) }} style={{ backgroundColor: '#E53563', borderRadius: 5, padding: 10 }}>
                                                            <Text style={{ color: '#fff', fontSize: 14 }}>Join Now <MaterialCommunityIcons name="arrow-right" size={14} color={"#fff"} /></Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            );
                                        })
                                    }

                                    </View>
                                )
                            }}
                        />
                    </View>
                }
            </View>
            {
            onlineClass.length == 0 &&
                <Text style = {{color:'red', textAlign:'center', paddingTop:100}}>No online class available now !</Text>
            }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    description: {
        fontSize: 14,
        color: "#414268",
    },

    contentList: {
        paddingBottom: 70,
    },

    button: {
        borderRadius: 10,
        backgroundColor: 'red',
        marginTop: 5,
        elevation: 3,
        width: 147,
        height: 41,
        alignItems: 'center',
        justifyContent: 'center',
    },


    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center',
    }

});


const mapStateToProps = (state) => ({
    onlineClass: state.mainReducer.onlineClass,
    loginData: state.mainReducer.loginData,
    selectedClass: state.mainReducer.selectedClass,
})

export default connect(mapStateToProps, { getOnlineClass })(OnlineClass);
