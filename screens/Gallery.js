
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { getClassCurricullamData } from '../redux/actions/dashboardAction'
import Headers from '../components/Headers'
import Loader from '../components/Loader'
import Backbar from '../components/Backbar'

const Gallery = (props) => {

    // const [loginData, setLoginData] = useState(null)
    const {loginData, selectedClass} = props

    const SlideInLeft = useRef(new Animated.Value(0)).current;

    const [image, setImage] = useState([
        { resourceUrl: "https://wallpapercave.com/wp/wp3190622.jpg" },
        { resourceUrl: "https://wallpapercave.com/wp/wp3190622.jpg" },
        { resourceUrl:  "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
        { resourceUrl:  "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
        { resourceUrl:  "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
        { resourceUrl:  "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    ])

    // const { getClassCurricullamData, dashboardReducer } = props

    console.log("loginData",loginData)
     console.log('selectedClass',selectedClass)

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
    //             getClassCurricullamData(d.userId, d.schoolId, d.standard, d.section, 'gallery', 'GET_GALLERY')
    //         }
    //         return () => { }
    //     }).catch((e) => {
    //     })

    // }, [])

    useEffect(() => {
        if (loginData != null) {
            getClassCurricullamData(loginData, selectedClass,'gallery')
        }
        return () => { }
    }, [selectedClass])


    return (
        // dashboardReducer.isLoading ? <Loader />:
        <View style={{ flex: 1 }}>
            <Backbar {...props} title="Gallery" screen="Gallery" />

            <Animated.View style={{
                transform: [
                    {
                        translateX: SlideInLeft.interpolate({
                            inputRange: [0, 1],
                            outputRange: [600, 0]
                        })
                    }
                ],
            }}>

                {/* { dashboardReducer && */}
                <FlatList
                    contentContainerStyle={{  marginHorizontal: 1, marginTop:1  }}
                    // data={dashboardReducer.gallery}
                    // extraData={dashboardReducer.gallery}
                    data={image}
                    extraData={image}
                    keyExtractor={(item, index) => { return index.toString(); }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.itemContainer}>
                                <Image source={{ uri: item.resourceUrl }} style={styles.image} />

                            </TouchableOpacity>

                        )
                    }}
                    numColumns={3} />
                {/* } */}
                {/* {
                    dashboardReducer.gallery.length == 0 &&
                    <Text style = {{color:'red', textAlign:'center', paddingTop:100}}>No Photo's from your child school yet !</Text>
                } */}
            </Animated.View>

        </View>
    )
}

const numColumns = 3;
const size = (Dimensions.get('window').width - 6) / numColumns;
const styles = StyleSheet.create({
    itemContainer: {
        width: size,
    },

    image:
    {
        resizeMode: 'contain',
        width: 112,
        height: 112,
        marginVertical: 1,
        marginHorizontal: 1,

    }

})


const mapStateToProps = (state) => ({
    loginData: state.mainReducer.loginData,
    selectedClass: state.mainReducer.selectedClass,

})

 export default connect(mapStateToProps)(Gallery);

// export default Gallery
