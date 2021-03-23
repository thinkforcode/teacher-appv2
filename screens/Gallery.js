
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Animated, Dimensions } from 'react-native'
// import { connect } from 'react-redux'
// import { getClassCurricullamData } from '../redux/actions/dashboardAction'
import Headers from '../components/Headers'
import Loader from '../components/Loader'

const Gallery = (props) => {

    const [loginData, setLoginData] = useState(null)

    const SlideInLeft = useRef(new Animated.Value(0)).current;

    const [image, setImage] = useState([
        {resourceUrl :"https://reactnative.dev/img/tiny_logo.png"},
        {resourceUrl :"https://reactnative.dev/img/tiny_logo.png"},
        {resourceUrl :"https://reactnative.dev/img/tiny_logo.png"},
        {resourceUrl :"https://reactnative.dev/img/tiny_logo.png"},
        {resourceUrl :"https://reactnative.dev/img/tiny_logo.png"},
        {resourceUrl :"https://reactnative.dev/img/tiny_logo.png"},
    ])

    // const { getClassCurricullamData, dashboardReducer } = props

          

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


    return (
        // dashboardReducer.isLoading ? <Loader />:
        <View style={{ flex: 1 }}>
             <Headers {...props} title={`Photos`}  screen = "Gallery" />
            {/* { loginData &&
                <Headers {...props} title={`Photos`}  screen = "Gallery" />
            } */}
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
                <Text style={styles.headingText}>We save your children memories for lifetime</Text>
                {/* { dashboardReducer && */}
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 50, marginHorizontal: 3, marginTop: 3 }}
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
    headingText:
 {
    color: '#848598',
     fontSize: 14,
      textAlign: 'center',
       paddingTop: 10 
 },
 image:
 {
    resizeMode: 'contain',
     width: 109,
      height: 109,
       marginVertical: 5,
        marginHorizontal:5,
         borderWidth: 0.5
 }

})


// const mapStateToProps = (state) => ({
//     dashboardReducer: state.dashboardReducer,
// })

// export default connect(mapStateToProps, { getClassCurricullamData })(Gallery);

export default Gallery
