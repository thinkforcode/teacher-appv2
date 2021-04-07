import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList, Linking, TouchableOpacity } from 'react-native'
// import { connect } from 'react-redux'
import Headers from '../components/Headers'
// import { getOnlineClass } from '../redux/actions/dashboardAction'
import { formatTimeAMPM } from '../functions/timeformat';
import { COLORS } from '../constants/Colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Loader from '../components/Loader'

const OnlineClass = (props) => {
    const [loginData, setLoginData] = useState(null)
    const { getOnlineClass, dashboardReducer } = props

    const [data, setData] = useState([
         {startOfClass:10,endOfClass:11,subject:"hindi",location:"delhi",startTime:10,dateTime:11,days:30}
        
    ])

    // useEffect(() => {
    //     AsyncStorage.getItem('login').then((r) => {
    //         if (r != null) {
    //             let d = JSON.parse(r)
    //             setLoginData(d)
    //             getOnlineClass(d.userId, d.schoolId, d.standard, d.section)
    //         }
    //         return () => { unsubscribeStudent }
    //     }).catch(e=>{
    //     })

    // }, [])



    const takeClass = (item) => {
        try {
            Linking.openURL(String(item.hangoutsLink)).then((d) => {
            }).catch((e) => { })
        }
        catch (e) {}
    }

    return (
        // dashboardReducer.isLoading ? <Loader />:
        <SafeAreaView style={{ flex: 1 }}>
            {/* { loginData &&
                 <Headers {...props} title={`Online Class` + ` ` + loginData.standard + ' ' + loginData.section} screen="OnlineClass" />
               
            } */}
             <Headers {...props} title={`Online Class` } screen="OnlineClass" />

            <View style={styles.container}>
                {/* {dashboardReducer && */}
                    <View>
                        <FlatList
                            contentContainerStyle={styles.contentList}
                            // data={dashboardReducer.onlineClass}
                            data={data}
                            extraData={data}
                            // extraData={dashboardReducer.onlineClass}
                            
                            keyExtractor={(item, index) => { return index.toString(); }}
                             renderItem={({ item, index }) => {
                               
                                return (
                                    <View>
                                        {/* {item.events.map((data, i) => { */}
                                            return (
                                                {/* <View key={i} style={{ backgroundColor: '#fff', marginVertical: 8, marginHorizontal: 15, borderRadius: 10, elevation: 3 }}> */}
                                                <View  style={{ backgroundColor: '#fff', marginVertical: 8, marginHorizontal: 15, borderRadius: 10, elevation: 3 }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, justifyContent: 'space-between' }}>
                                                        <View>
                                                            <View style={{ flexDirection: 'row', }}>
                                                                <Text style={{ color: '#848598', fontSize: 14 }}>Subject</Text>
                                                                <View style={{ marginLeft: 15, }}>
                                                                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold', backgroundColor: '#FEB62D', borderRadius: 8, padding: 5, textAlign: 'center' }}>
                                                                        {data.subject}</Text>
                                                                        {/* {item.subject}</Text>  */}
                                                                    <View style={{ paddingTop: 3, flexDirection: 'row' }}>
                                                                        { (data.startOfClass && data.endOfClass) ?
                                                                            <View>
                                                                                <Text style={{ color: '#848598', fontSize: 9, }}>{data.startOfClass} - {data.endOfClass} |</Text>
                                                                            </View>
                                                                            :
                                                                            <View>
                                                                                {/* <Text style={{ color: '#848598', fontSize: 9, }}>{formatTimeAMPM(data.startTime.dateTime)}</Text> */}
                                                                            </View>
                                                                        }
                                                                        {/* { data.days.map((day, i) => {
                                                                            return (
                                                                                <Text key={i} style={{ color: '#848598', fontSize: 9, paddingHorizontal: 1 }}>{day.charAt(0)}</Text>
                                                                            );
                                                                        })
                                                                        } */}
                                                                    
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
                                         {/* }
                                         )}  */}

                                     </View>
                                )
                            }}
                        />
                    </View>
                {/* } */}
            </View>
            {
                // dashboardReducer.onlineClass.length == 0 &&
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
        backgroundColor: COLORS.btnColor,
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


// const mapStateToProps = (state) => ({
//     dashboardReducer: state.dashboardReducer,
// })

// export default connect(mapStateToProps, { getOnlineClass })(OnlineClass);
export default  OnlineClass