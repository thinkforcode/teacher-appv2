import React, { useEffect, useState } from 'react'
import { View, Text, StatusBar, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image, ImageBackground, Linking } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Autolink from 'react-native-autolink';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { storyDate } from '../../functions/timeformat';
// import { connect } from 'react-redux'
// import { getStory } from '../../redux/actions/storyAction'
// import { getStudent } from '../../redux/actions/dashboardAction'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isValidUrl } from '../../functions/commonfunction'


const Story = (props) => {
    const { dashboardReducer, getStory, getStudent } = props
    const [loginData, setLoginData] = useState(null)
    const [students, setStudents] = useState(dashboardReducer)
    console.log("students line no 13", students, dashboardReducer)

    const [story, setStory] = useState([
        { docType: "image", resourceUrl: "https://wallpapercave.com/wp/wp3190622.jpg", displayImageUrl: "https://reactnative.dev/img/tiny_logo.png", publishBy: "Rahul", displayName: "Sohan" },
        { docType: "text", message: "hello how are you ", displayImageUrl: "https://reactnative.dev/img/tiny_logo.png", publishBy: "Rahul", displayName: "Sohan" },
        { docType: "imageBackground", message: "hello how are you ", displayImageUrl: "https://reactnative.dev/img/tiny_logo.png", resourceUrl: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", publishBy: "Rahul", displayName: "Sohan" },
        { docType: "attachmentUrl", message: "hello how are you ", displayImageUrl: "https://reactnative.dev/img/tiny_logo.png", resourceUrl: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", publishBy: "Rahul", displayName: "Sohan", dataLink: "https://skugal.com/" },
        { docType: "colorBackground", color: "red", message: "hello how are you ", displayImageUrl: "https://reactnative.dev/img/tiny_logo.png", publishBy: "Rahul", displayName: "Sonu", }
    ])

    // useEffect(() => {
    //    AsyncStorage.getItem('login').then((r)=>{
    //     if(r!= null){
    //         let d = JSON.parse(r)
    //         setLoginData(d)
    //         var unsubscribeStudent = getStudent(d.parentId)
    //     }
    //     else {
    //         console.log("no data")
    //     }
    //     return () => { unsubscribeStudent}
    //    })

    // }, [])


    // useEffect(() => {
    //     if(dashboardReducer.students.length > 0){
    //         console.log("students line no 33", dashboardReducer.students[0].userId, dashboardReducer.students[0].schoolId)
    //                 var unsubscribeStory = getStory(dashboardReducer.students[0].userId, dashboardReducer.students[0].schoolId)
    //     }else{
    //         console.log("empty students")
    //     }
    //     return () => { unsubscribeStory}
    // }, [dashboardReducer])

    const _gotoStory = (item) => {
        if (item.dataLink != undefined) {
            if (isValidUrl(item.dataLink)) {
                Linking.openURL(item.dataLink).then(r => { }).catch((e => { }))
            }
            else {
                props.navigation.navigate('StoryPreview', { data: item })
            }
        }
        else {
            props.navigation.navigate('StoryPreview', { data: item })
        }
    }
    const showMenu = (item) => {
        rowRefs[item.storyId].show();
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <FlatList
                contentContainerStyle={{ backgroundColor: '#cecece' }}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
                // data={storyReducer.stories}
                data={story}
                refreshing={true}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={{ ...styles.postContainer }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={styles.customListView}>
                                <TouchableOpacity onPress={() => { props.navigation.navigate('StoryProfile', { data: item }) }}>
                                    {item.displayImageUrl != '' ?
                                        <Image style={styles.avatar} source={{ uri: item.displayImageUrl }}></Image>
                                        :
                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#E61A50', width: 30, height: 30, borderRadius: 15, }}>
                                            <Text style={{ color: '#fff' }}>{item.displayName[0]}</Text>
                                        </View>
                                    }

                                </TouchableOpacity>

                                <View style={styles.infoWrapper}>
                                    <View style={styles.namesWrapper}>
                                        {
                                            item.docType == 'video' ?
                                                <TouchableOpacity>
                                                    <Text style={{ fontSize: 16, fontWeight: '500', textTransform: 'capitalize' }}>{item.publishBy}</Text>
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity>
                                                    <Text style={{ fontSize: 16, fontWeight: '500', textTransform: 'capitalize', color: '#35365F' }}> {item.displayName}  </Text>
                                                </TouchableOpacity>
                                        }

                                    </View>

                                    <View>
                                        <View style={styles.extraInfoWrapper}>
                                            <Text style={{ color: storyDate(item.createdAt) == 'Just now' ? 'blue' : "#C1C6D0", fontSize: 12 }}> {storyDate(item.createdAt)}</Text>
                                            <FontAwesome5Icon color='#C1C6D0' name="clock" style={{ paddingLeft: 5 }} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/* {item.uid === loginData.parentId && */}
                            <View>
                                <TouchableOpacity style={{ width: 30, height: 30, }} onPress={() => { showMenu(item) }}>
                                    <MaterialCommunityIcons size={22} name="dots-vertical" color="#7D7D7D" />
                                </TouchableOpacity>
                                <View style={{ position: 'absolute', top: 10, right: 10 }}>
                                    {/* <Menu
                                                    animationDuration={50}
                                                    ref={(ref) => { rowRefs[item.storyId] = ref; }}
                                                >
                                                    <MenuItem textStyle={{ textAlign: 'center' }} onPress={() => { _deletePost(item) }} >Delete</MenuItem>
                                                </Menu> */}
                                </View>
                            </View>
                            {/* } */}
                        </View>

                        {item.review !== 2 &&
                            <View>
                                {item.docType == 'image' &&
                                    <View>
                                        <View style={styles.contentContainer}>
                                            <Text style={styles.paragraph}>
                                                <Autolink text={item.message} />
                                            </Text>
                                        </View>
                                        {item.resourceUrl != "" &&
                                            <View>
                                                <TouchableOpacity style={styles.imageContainer} onPress={() => _gotoStory(item)}>
                                                    <Image source={{ uri: item.resourceUrl }} style={{ resizeMode: 'contain' }} style={{ width: Dimensions.get('window').width, height: 400 }} />
                                                </TouchableOpacity>
                                            </View>
                                        }

                                    </View>
                                }

                                {item.docType == 'attachmentUrl' &&
                                    <View>
                                        <View style={styles.contentContainer}>
                                            <Text style={styles.paragraph}>
                                                <Autolink text={item.message} />
                                            </Text>
                                        </View>
                                        <View>
                                            {item.resourceUrl != '' &&
                                                <TouchableOpacity style={styles.imageContainer} onPress={() => _gotoStory(item)}>
                                                    <Image source={{ uri: item.resourceUrl }} style={{ resizeMode: 'contain' }} style={{ width: Dimensions.get('window').width, height: 400 }} />
                                                </TouchableOpacity>
                                            }
                                            {item.dataLink != '' && item.title != '' &&
                                                <View style={{ elevation: 3 }}>
                                                    <TouchableOpacity style={{ backgroundColor: '#F7F8FA', padding: 10 }} onPress={() => _gotoStory(item)}>
                                                        <Text>{item.dataLink || ''}</Text>
                                                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', }}>{item.title || ''}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            }

                                        </View>
                                    </View>
                                }

                                {item.docType == 'text' &&
                                    <TouchableOpacity style={{
                                        paddingTop: 10,
                                        paddingHorizontal: 12,
                                    }}>
                                        <Text style={{ fontWeight: '400', color: "#414268", fontSize: 16, textAlign: 'justify' }}>
                                            <Autolink text={item.message} />
                                        </Text>
                                    </TouchableOpacity>
                                }

                                {item.docType == 'imageBackground' &&
                                    <TouchableOpacity onPress={() => _gotoStory(item)}>
                                        <ImageBackground source={item.resourceUrl ? { uri: item.resourceUrl } : {}} style={{ ...styles.editorWrapper, height: 350 }}>
                                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontWeight: '400', color: "#fff", fontSize: 26, textAlign: 'center' }}>
                                                    <Autolink text={item.message} />
                                                </Text>

                                            </View>
                                            {item.tag != undefined &&
                                                <View style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: '#E61A50', borderRadius: 10, padding: 5 }}>
                                                    <Text style={{ color: '#fff' }}>{item.tag || ''}</Text>
                                                </View>
                                            }
                                        </ImageBackground>
                                    </TouchableOpacity>



                                }

                                {item.docType == 'colorBackground' &&
                                    <TouchableOpacity onPress={() => _gotoStory(item)} style={{ ...styles.editorWrapper, backgroundColor: item.color, height: 350, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontWeight: '400', color: "#fff", fontSize: 26, textAlign: 'center' }}>
                                            <Autolink text={item.message} />
                                        </Text>
                                        {item.tag != undefined &&
                                            <View style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: '#E61A50', borderRadius: 10, padding: 5 }}>
                                                <Text style={{ color: '#fff' }}>{item.tag || ''}</Text>
                                            </View>
                                        }
                                    </TouchableOpacity>

                                }

                                {item.docType == 'video' &&
                                    <View>
                                        <View style={styles.contentContainer}>
                                            <Text style={styles.paragraph}>
                                                <Autolink text={item.message} />
                                            </Text>
                                        </View>
                                    </View>
                                }

                                <View style={styles.actionBtncontainer}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <TouchableOpacity onPress={() => { likePost(item) }} >
                                            {/* <AntDesign
                                                        size={22}
                                                        color={item.likedBy.indexOf(loginData.parentId) > -1 ? "red" : '#414268'}
                                                        name={item.likedBy.indexOf(loginData.parentId) > -1 ? "heart" : 'hearto'}
                                                    /> */}
                                            <AntDesign
                                                size={22}
                                                color='red'
                                                name="heart"
                                            />

                                        </TouchableOpacity >

                                        <TouchableOpacity style={{ paddingLeft: 30 }} onPress={() => { props.navigation.navigate('CommentsPopup', { data: item }) }}>
                                            <FontAwesome5Icon size={22} name="comment" color="#414268" />
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ paddingLeft: 30 }} >
                                            <MaterialCommunityIcons size={22} name="share-outline" color="#414268" />
                                        </TouchableOpacity>

                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ color: "#414268", fontSize: 14 }}>{item.commentCount ? item.commentCount : 0} Comments .</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={{ marginHorizontal: 15, paddingBottom: 10 }} onPress={() => { props.navigation.navigate('PeopleLike', { data: item }) }}>
                                    <Text style={{ justifyContent: "center", alignItems: "center", }}>
                                        {/* { item.likedBy.length > 0 &&
                                                    <Text style={{ color: "#C1C6D0", fontSize: 14 }}>Like by </Text>
                                                }
                                                {(item.likedBy.indexOf(loginData.parentId) > -1) &&
                                                    <Text style={{ color: "#C1C6D0", fontSize: 14 }}>you</Text>
                                                  } 
                                                {item.likedBy.length > 0 &&
                                                    <Text style={{ color: "#C1C6D0", fontSize: 14 }}> {(item.likedBy.length > 0 && item.likedBy.indexOf(loginData.parentId) > -1) ? `and ${item.likedBy.length - 1} others` : `${item.likedBy.length} others`}</Text>
                                                } */}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }
                        <View>
                            {item.review == 2 &&
                                <View style={{ backgroundColor: '#fff', }}>
                                    <MaterialCommunityIcons name="eye-off" style={{ textAlign: 'center' }} color="#000" size={40} />
                                    <Text style={{ fontWeight: '400', color: 'darkgray', fontSize: 18, paddingHorizontal: 20, paddingBottom: 30, textAlign: 'center' }}>
                                        This Post has been removed due to voilation of Skugal Policy
                                            </Text>
                                </View>
                            }
                        </View>
                    </View>

                )}
                keyExtractor={(item, index) => `${index.toString()}`}
            />

        </View>
    )
}


// const mapStateToProps = (state) => ({
//     dashboardReducer: state.dashboardReducer,
// })

// export default connect(mapStateToProps, {getStory, getStudent})(Story);


export default Story

const screenWidth = Math.round(Dimensions.get('window').width);


const styles = StyleSheet.create({
    textStyle: {
        color: '#35365F',
        fontWeight: '500',
        textTransform: 'capitalize',
        paddingTop: 20,
        fontSize: 12,
        textAlign: 'center'
    },


    text: {
        fontSize: 14,
        color: '#35365F',
        textAlign: 'center',
        textTransform: 'capitalize',
        paddingTop: 20
    },

    notificationText: {
        position: 'absolute',
        color: '#fff',
        top: -15,
        left: 8,
        fontSize: 10,
        fontWeight: 'bold',
        backgroundColor: '#0FD893',
        textAlign: 'center',
        paddingTop: 4,
        width: 22,
        height: 22,
        borderRadius: 11
    },
    childrenText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    modal: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginBottom: 10,
    },

    footerbtn: {
        color: '#fff',
        backgroundColor: 'green',
        textAlign: 'center',
        padding: 10,
        fontWeight: '500',
        width: 100
    },
    addIcon: {
        position: 'absolute',
        top: 10, left: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        backgroundColor: '#fff',
        width: 46,
        height: 46,
        borderRadius: 23
    },

    container: {
        flex: 1,
    },

    actionBtnRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    editorWrapper: {
        overflow: 'hidden',
        padding: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    postContainer: {
        backgroundColor: 'white',
        marginVertical: 2,
    },

    customListView: {
        marginHorizontal: 15,
        paddingVertical: 5,
        // width: screenWidth - 40,
        flexDirection: 'row'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    infoWrapper: {
        marginLeft: 0
    },
    namesWrapper: {
        flexDirection: 'row',
        alignItems: 'center',


    },
    extraInfoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',

    },

    commentInputWrapper: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        borderRadius: 20,
        paddingHorizontal: 15
    },
    paragraph: {
        color: '#000',
    },
    contentContainer: {
        paddingHorizontal: 10,
        paddingBottom: 5
    },

    imageContainer: {
        marginTop: 5,
        width: Dimensions.get('window').width
    },

    reactionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between'
    },
    reactionIcon: {
        fontSize: 16,
        padding: 10
    },
    shareIcon: {
        position: 'absolute',
        fontSize: 14,
        padding: 10,
        right: 0
    },

    actionBtncontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginHorizontal: 15,
        paddingVertical: 10
    },

    commentAvatar: {
        width: 30,
        height: 30,
        borderRadius: 50
    },

    commentInput: {
        borderRadius: 20,
        marginLeft: 10,
        height: 30,
        width: screenWidth - 15 * 2 - 60,
    },

    btnSendComment: {
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: 30
    },
    threedots: {

        fontSize: 18,
        paddingLeft: 175


    },

    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },


})
