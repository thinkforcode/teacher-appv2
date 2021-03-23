
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, TouchableOpacity, Animated, StatusBar, Dimensions } from 'react-native'
// import { connect } from 'react-redux'
// import { getReviewRemarks } from '../redux/actions/dashboardAction'

import Headers from '../components/Headers'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDate } from '../functions/timeformat'
import Loader from '../components/Loader'

const Review = (props) => {
    const [loginData, setLoginData] = useState({})
    
    const SlideInLeft = useRef(new Animated.Value(0)).current;

    // const { getReviewRemarks, dashboardReducer } = props

     const [reviewData,setreviewData] = useState(
        {rating:4,messag:"good",teacherName:"deepak"},
        {rating:4,messag:"good",teacherName:"deepak"} 
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
    //             getReviewRemarks(d.userId, d.schoolId, d.childrenUid, 'review', 'GET_REVIEW')
    //         }
    //         else {}
    //         return () => { }
    //     }).catch((e) => {
    //     })

    // }, [])


    const renderStars = (count) => {
        const stars = [];
        for (let i = 0; i < count; i++) {
            stars.push(
                <MaterialCommunityIcons name="star-outline" color="#FEB62D" size={28} key={i} />
            )
        }
        return stars;
    }

    return (
        // dashboardReducer.isLoading ? <Loader />:
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar backgroundColor="#E61A50" barStyle="light-content" />

            <Headers {...props} title={`Reviews`} screen="Review" />
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
                {/* { dashboardReducer.reviews.length > 0 && */}
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 50, marginTop: 10, }}
                        // data={dashboardReducer.reviews}
                        // extraData={dashboardReducer.reviews}
                        data={reviewData}
                        extraData={reviewData}
                         keyExtractor={(item, index) => { return index.toString(); }}
                        // renderItem={({ item, index }) => {
                            renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={{ borderRadius: 10, marginHorizontal: 15, marginVertical: 10, borderWidth: 1, borderColor: '#ECF0F8' }}>
                                    <View style={{ padding: 10, width: Dimensions.get('window').width - 20 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text>Subject</Text>
                                            <View style={{ paddingLeft: 50 }}>
                                                <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold', backgroundColor: '#FEB62D', textAlign: "center", borderRadius: 8, alignItems: 'center', padding: 5 }}>
                                                    {item.subject ? item.subject : 'No Subject '}</Text>
                                                <Text style={{ fontSize: 9, color: '#848598' }}>{formatDate(item.creationTime ? item.creationTime : 'No Creation Time')}</Text>
                                            </View>

                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 14, color: '#848598' }}>Reviews</Text>
                                            <Text style={{ paddingLeft: 40 }}>{item.rating ? renderStars(item.rating) : 'No Rating'}
                                                <Text style={{ color: '#392C60', fontSize: 14, fontWeight: "bold" }}>{item.rating} out of 5</Text>
                                            </Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 14, color: '#848598' }}>Description</Text>
                                            <Text style={{ paddingLeft: 28, color: '#392C60', fontSize: 14 }}>{item.messag ? item.message : 'No Message '}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 14, color: '#848598' }}>Teacher</Text>
                                            <Text style={{ paddingLeft: 48, color: '#392C60', fontSize: 14 }}>{item.teacherName ? item.teacherName : 'No Teacher  '}</Text>
                                        </View>
                                    </View>


                                </TouchableOpacity>
                            )
                        }}
                    />
                {/* } */}

                 {/* {
                    dashboardReducer.reviews.length == 0 &&
                    <Text style ={{color:'red', textAlign:'center', paddingTop:50}}>No Reviews for your child !</Text>
                } */}
   
            </Animated.View>

        </View>
    )
}


// const mapStateToProps = (state) => ({
//     dashboardReducer: state.dashboardReducer,
// })

// export default connect(mapStateToProps, { getReviewRemarks })(Review);

export default Review