import React, { useState, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, TextInput, StyleSheet, FlatList, Image, Animated, TouchableOpacity, PanResponder } from 'react-native'
import { connect } from 'react-redux';
// import { getLikeData } from '../redux/actions/storyAction'
import AsyncStorage from '@react-native-async-storage/async-storage';


const PeopleLike = (props) => {
    const [previewData, setPreviewData] = useState({})
    const [loginData, setLoginData] = useState({})

    // const { likes, getLikeData } = props

    // console.log("likes data", likes)

    // useEffect(() => {
    //     const paramsData = props.route.params.data;
    //     setPreviewData(paramsData)
    //     AsyncStorage.getItem('login').then((r) => {
    //         if (r != null) {
    //             let d = JSON.parse(r)
    //             setLoginData(d)
    //             getLikeData(d.userId, d.schoolId, paramsData.storyId)
    //         }
    //         return () => { }
    //     }).catch((e) => {
    //         console.log("e", e)
    //     })

    // }, [])

    const [likes,setLikes] = useState([
        {displayImageUrl:"https://reactnative.dev/img/tiny_logo.png",profileName:"Sonu Singh"},
        {displayImageUrl:"https://reactnative.dev/img/tiny_logo.png",profileName:"Monu Singh"}
    ])



    const position = new Animated.ValueXY({ x: 0, y: 0 })
    const pan = PanResponder.create(
        {
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([
                null, { dx: position.x, dy: position.y }
            ],
                { useNativeDriver: false }),
            onPanResponderRelease: () => {
                position.setValue({ x: 0, y: 0 })
                // props.navigation.navigate('Home')
            }

        }
    )
      return (
        <View style={{ flex: 1 }}>
            <Text style={{ backgroundColor: "#fff", height: 20 }}></Text>

            <Animated.View
                {...pan.panHandlers}
                style={{
                    flex: 1,
                    marginTop: 10,
                    marginHorizontal: 10,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    transform: [
                        { translateY: position.y },
                    ]
                }}>
                <View>
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width: 100, height: 5, borderRadius: 5, backgroundColor: "#E61A50" }}></View>
                    </TouchableOpacity>

                    <Text style={styles.text}>{likes.length} Likes</Text>

                    <View style={styles.searchcontainer} >
                        <TextInput
                            placeholder="Search                                            "
                            placeholderTextColor="#35365F" multiline keyboardShouldPersistTaps
                        />
                        <MaterialCommunityIcons name="magnify" size={20} color="#35365F" />
                    </View>

                    {likes &&
                        <FlatList
                            data={likes}
                            renderItem={({ item }) => (
                                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10, marginVertical: 5 }}>
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('StoryProfile', { data: item }) }}>
                                        {item.displayImageUrl != '' ?
                                            <Image style={styles.avatar1} source={{ uri: item.displayImageUrl }}></Image>
                                            :
                                            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                <Text style={styles.avatar}>{item.profileName[0]}</Text>
                                            </View>
                                        }

                                    </TouchableOpacity>
                                    <Text style={{ paddingLeft: 10, fontSize: 14, color: "#414268", textTransform: "capitalize" }}>{item.profileName}</Text>

                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    }

                </View>

            </Animated.View>
             </View>

    )
}

// const mapStateToProps = (state) => ({
//     likes: state.storyReducer.likes
// })

// export default connect(mapStateToProps, { getLikeData })(PeopleLike);

export default PeopleLike

const styles = StyleSheet.create({
    text: {
        color: "#35365F",
        fontSize: 18,
        paddingLeft: 10,
        paddingTop: 18
    },


    searchcontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#F2F2F2",
        fontSize: 8,


    },

    avatar: {
        backgroundColor: '#E61A50',
        width: 36, height: 36,
        borderRadius: 18,
        textAlign: 'center',
        color: '#fff',
        paddingTop: 7,
        textTransform: "capitalize"
    },
    avatar1: {

        width: 36, height: 36,
        borderRadius: 18,
    }

}
)
