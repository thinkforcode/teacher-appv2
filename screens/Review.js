
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, TouchableOpacity, Animated, StatusBar, Dimensions,StyleSheet } from 'react-native'
// import { connect } from 'react-redux'
// import { getReviewRemarks } from '../redux/actions/dashboardAction'


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDate } from '../functions/timeformat'
import Loader from '../components/Loader'

const Review = (props) => {
    const [loginData, setLoginData] = useState({})
    
    const SlideInLeft = useRef(new Animated.Value(0)).current;

    // const { getReviewRemarks, dashboardReducer } = props

     const [reviewData,setreviewData] = useState([
        {rating:4,message:"good",teacherName:"deepak"},
        {rating:4,message:"verry good verry good verry good verry good verry good",teacherName:"deepak"} 
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
                        contentContainerStyle={styles.contentContainerStyle}
                        // data={dashboardReducer.reviews}
                        // extraData={dashboardReducer.reviews}
                        data={reviewData}
                        extraData={reviewData}
                         keyExtractor={(item, index) => { return index.toString(); }}
                            renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={styles.containerText}>
                                    <View style={{  padding: 10, }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.simpleText}>Subject</Text>
                                            <View style={styles.subjectTextSpace}>
                                                <Text style={styles.subjectText}>
                                                    {item.subject ? item.subject : 'No Subject '}</Text>
                                                <Text style={styles.dateText}>{formatDate(item.creationTime ? item.creationTime : 'No Creation Time')}</Text>
                                            </View>

                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.simpleText}>Reviews</Text>
                                            <Text style={styles.reviewTextSpace}>{item.rating ? renderStars(item.rating) : 'No Rating'}
                                                </Text>
                                            <Text style={styles.ratingText}>{item.rating} out of 5</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', }}>
                                            <Text style={styles.simpleText}>Description</Text>
                                            <Text style={styles.messageText}>{item.message ? item.message : 'No Message '}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.simpleText}>Teacher</Text>
                                            <Text style={styles.nameText}>{item.teacherName ? item.teacherName : 'No Teacher  '}</Text>
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



const styles = StyleSheet.create({

    contentContainerStyle:
    {
        flex:1,
        paddingBottom: 50,
         marginTop: 10,
    },
    containerText:{
        
        borderRadius: 10,
         marginHorizontal: 15,
          marginVertical: 10,
           borderWidth: 1, 
           borderColor: '#ECF0F8' 
    },
    simpleText:
    {
        fontSize: 14, 
        color: '#848598'
    },
    subjectText:
    {
        fontSize: 14,
         color: '#fff',
          fontWeight: 'bold',
           backgroundColor: '#FEB62D',
            textAlign: "center",
             borderRadius: 8, 
             alignItems: 'center',
              paddingHorizontal:5
    },
    dateText:
    {
        fontSize: 9, 
        color: '#848598'
    },
    ratingText:
    {
        color: '#392C60',
         fontSize: 14,
          fontWeight: "bold"
    },
    messageText:
    {
        flex:1,
        paddingLeft: 25,
         color: '#392C60',
          fontSize: 14
    },
    nameText:
    {
        flex:1, 
        paddingLeft: 45,
         color: '#392C60',
          fontSize: 14 
    },
    subjectTextSpace:
    {
        paddingLeft: 50 
    },
    reviewTextSpace:
    {
        paddingLeft: 40
    }  

})