
import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { getClassCurricullamData, selectClass } from '../redux/actions/mainActions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Backbar from '../components/Backbar'

const Gallery = (props) => {

    const { loginData, selectedClass, getClassCurricullamData, gallery } = props
    const [selectImage, setselectImage] = useState(false)

    const SlideInLeft = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        return Animated.parallel([
            Animated.timing(SlideInLeft, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
        ]).start();
    })


    useEffect(() => {
        if (loginData != null) {
            getClassCurricullamData(loginData, selectedClass, 'gallery', 'gallery')
        }
        return () => { }
    }, [selectClass])

    console.log("gallery 44", gallery)

    const _selectImage = (() => {
        setselectImage(true)
    })

    return (

        <View style={{ flex: 1, }}>
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
                {gallery.length > 0 &&
                    <View>
                        <Text style={{ textAlign: 'center', padding: 10, fontSize: 16 }}>Access arrange of images captured during the events</Text>

                        <FlatList
                            contentContainerStyle={{ paddingBottom: 50, marginHorizontal: 3, marginTop: 3 }}
                            data={gallery}
                            extraData={gallery}
                            keyExtractor={(item, index) => { return index.toString(); }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={styles.itemContainer} onPress={_selectImage}>
                                        <Image source={{ uri: item.resourceUrl }} style={styles.image} />
                                        {  selectImage &&
                                            <View style={{ position: "absolute", width: 16, height: 16, borderRadius: 8, backgroundColor: "#FFC800", right: 7, top: 7, alignItems: "center", justifyContent: "center" }}>
                                                <MaterialCommunityIcons name="check" size={14} color="#2B454E" />
                                            </View>
                                        }

                                    </TouchableOpacity>

                                )
                            }}
                            numColumns={3} />

                    </View>
                }


                {
                    gallery.length == 0 &&
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop:(Dimensions.get('window').height - 100) / 2}}>
                        <Text> No data available</Text>
                        <Text> Tap the <MaterialCommunityIcons name="plus" size={24} color="#2B454E" /> to add Gallery </Text>
                    </View>

                }

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

    image: {
        resizeMode: 'contain',
        width: 109,
        height: 109,
        marginVertical: 5,
        marginHorizontal: 5,
        borderWidth: 0.5
    }

})

const mapStateToProps = (state) => ({
    loginData: state.mainReducer.loginData,
    selectedClass: state.mainReducer.selectedClass,
    gallery: state.mainReducer.gallery

})

export default connect(mapStateToProps, { getClassCurricullamData })(Gallery);


