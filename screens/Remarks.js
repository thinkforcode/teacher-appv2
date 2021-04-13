import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState, useRef } from 'react'
import { View, Text, FlatList,TouchableOpacity, Animated,StyleSheet } from 'react-native'
// import { connect } from 'react-redux'
// import { getReviewRemarks } from '../redux/actions/dashboardAction'

import { formatDate } from '../functions/timeformat'


const Remarks = (props) => {

    const [loginData, setLoginData] = useState(null)

    const SlideInLeft = useRef(new Animated.Value(0)).current;


    // const { getReviewRemarks, dashboardReducer } = props

    const [remarkData,setremarkData] = useState([
        {subject:"hindi",message:"good",teacherName:"deepak"},
        {subject:"english",message:"good very good good very goodgood very good",teacherName:"deepak"} 
    ]
     )

    useEffect(() => {
        return Animated.parallel([
            Animated.timing(SlideInLeft, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
        ]).start();
    })


    // useEffect(() => {
    //     AsyncStorage.getItem('login').then((r) => {
    //         if (r != null) {
    //             let d = JSON.parse(r)
    //             setLoginData(d)
    //             getReviewRemarks(d.userId, d.schoolId, d.childrenUid, 'remarks', 'GET_REMARKS')
    //         }
    //         else {
    //         }
    //         return () => { }
    //     }).catch((e) => {
    //     })

    // }, [])


    return (
        <View style={{ flex: 1 }}>
            {/* { loginData &&
                <Headers {...props} title={`Remarks`} screen = "Remarks" />
            } */}
            <Animated.View style={{
                flex: 1,
                transform: [
                    {
                        translateX: SlideInLeft.interpolate({
                            inputRange: [0, 1],
                            outputRange: [600, 0]
                        })
                    }
                ],
            }}>
                {/* { dashboardReducer.remarks.length > 0 && */}
                    <FlatList
                        contentContainerStyle={styles.contentContainerStyle}
                        // data={dashboardReducer.remarks}
                        // extraData={dashboardReducer.remarks}
                        data={remarkData}
                        extraData={remarkData}
                        keyExtractor={(item, index) => { return index.toString(); }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={styles.container}>
                                    <View style={{ alignItems: 'center', padding: 20 }}>
                                        <Text style={styles.subjectText}>{item.subject}</Text>
                                        <Text style={styles.messageText}>{item.message}</Text>
                                        <Text style={styles.nameText}>By {item.teacherName} | {formatDate(item.creationTime)}</Text>
                                    </View>

                                </TouchableOpacity>

                            )
                        }}
                       />
                {/* } */}
                {/* {
                    dashboardReducer.remarks.length == 0 &&
                    <Text style ={{color:'red', textAlign:'center', paddingTop:50}}>No Remarks for your child !</Text>
                } */}
            </Animated.View>
        </View>
    )
}



// const mapStateToProps = (state) => ({
//     dashboardReducer: state.dashboardReducer,
// })

// export default connect(mapStateToProps, { getReviewRemarks })(Remarks);

export default Remarks

const styles = StyleSheet.create({

    contentContainerStyle:
    {
        paddingBottom: 50,
         marginHorizontal: 10,
          marginTop: 10    
    },
    container:
    {
        backgroundColor: '#fff',
         borderRadius: 10,
        marginHorizontal: 15,
         marginVertical: 10,
          borderWidth: 1, 
          borderColor: '#ECF0F8' 
    },
    subjectText:
    {
        color: '#414268',
         fontSize: 18,
          fontWeight: 'bold'
    },
    messageText:
    {
        paddingVertical: 10,
         color: '#414268',
          fontSize: 16
    },
    nameText:
    {
        color: '#C1C6D0',
         fontSize: 14,
          fontWeight: 'bold', 
    }

})