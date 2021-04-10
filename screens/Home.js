import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList, SafeAreaView, Dimensions, Image, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import HomeHeader from '../components/HomeHeader'
import { doLogOut } from '../redux/actions/authActions'
import { getClass, getOnlineClass, selectClass } from '../redux/actions/mainActions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FeedSlider from '../components/FeedSlider'
import { curricullumData } from '../classData.js'
import HorizontalSlider from '../components/HorizontalSlider'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Autolink from 'react-native-autolink';


const Home = (props) => {
    const [curricullumSize, setCurricullumSize] = useState(4)
    const [curricullum, setCurricullum] = useState(curricullumData)
    const [isShowCurricullum, setIsShowCurricullum] = useState(false)
    const [previewData, setpreviewData] = useState({})

    const { doLogOut } = props

    const { getClass, selectClass, loginData, standard, sections, selectedClass } = props

    useEffect(() => {
        if (loginData != null) {
            getClass(loginData.userId, loginData.schoolId, loginData.teacherId)
        }
        return () => { }
    }, [])

    const _selectClass = (item) => {
        console.log("_selectClass", item)
        // selectClass(item)
    }
    const _selectSection = (item) => {
        console.log("item is", item)
    }

    console.log("classes", standard, sections, selectedClass)
    console.log("loginData", loginData)


    const showMore = (type) => {
        if (type == 'curricullum' && !isShowCurricullum) {
            setIsShowCurricullum(!isShowCurricullum)
            setCurricullumSize(curricullum.length)
        }
        else if (type == 'curricullum' && isShowCurricullum) {
            setIsShowCurricullum(!isShowCurricullum)
            setCurricullumSize(4)
        }
        else if (type == 'feature' && !isShowFeature) {
            setIsShowFeature(!isShowFeature)
            setFeatureSize(feature.length)
        }

        else if (type == 'feature' && isShowFeature) {
            setIsShowFeature(!isShowFeature)
            setFeatureSize(4)
        }
    }
    const openCategories = (item) => {
        props.navigation.navigate(item.type, { data: item })
    }

    // Story
    // const { getUserPost, userStory } = props

    // useEffect(() => {
    //     const paramsData = props.route.params.data;
    //     setpreviewData(paramsData)
    //     AsyncStorage.getItem('login').then((r) => {
    //         if (r != null) {
    //             let d = JSON.parse(r)
    //             setLoginData(d)
    //             getUserPost(d.userId, d.schoolId, paramsData.uid)
    //         }
    //         return () => { }
    //     }).catch((e) => { })

    // }, [])
    // console.log("userStory", userStory)

    const [story, setStory] = useState([
        { docType: "image", resourceUrl: "https://wallpapercave.com/wp/wp3190622.jpg", displayImageUrl: "https://reactnative.dev/img/tiny_logo.png", publishBy: "Rahul", displayName: "Sohan" },
        { docType: "text", message: "hello how are you ", displayImageUrl: "https://reactnative.dev/img/tiny_logo.png", publishBy: "Rahul", displayName: "Sohan" },
        { docType: "imageBackground", message: "hello how are you ", displayImageUrl: "https://reactnative.dev/img/tiny_logo.png", resourceUrl: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", publishBy: "Rahul", displayName: "Sohan" },
        { docType: "attachmentUrl", message: "hello how are you ", displayImageUrl: "https://reactnative.dev/img/tiny_logo.png", resourceUrl: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", publishBy: "Rahul", displayName: "Sohan", dataLink: "https://skugal.com/" },
        { docType: "colorBackground", color: "red", message: "hello how are you ", displayImageUrl: "https://reactnative.dev/img/tiny_logo.png", publishBy: "Rahul", displayName: "Sonu", }

    ])
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
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20, }} showsVerticalScrollIndicator={false}>

                <HomeHeader {...props} classesArr={standard} sectionsArr={sections} selectedClass={selectedClass} loginData={loginData} selectStandard={_selectClass} selectSection={_selectSection} />

                {/* Story Section Horizontal */}
                <View style={styles.storyStyle}>
                    <Text style={[styles.titleText, { paddingBottom: 10 }]}>Stories</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ overflow: 'visible', }} >
                        <View style={{ alignItems: "center", justifyContent: "center", }}>
                            <View style={styles.currentAvtar}>
                                <Text style={styles.currentAvtarText}>{loginData.firstName[0]}</Text>
                                <TouchableOpacity style={styles.mainUser} >
                                    <MaterialCommunityIcons name="plus" color="#fff" size={18} />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 12, fontWeight: "500", color: "#263238", paddingTop: 5 }}>Your Story</Text>
                        </View>

                        <FeedSlider />
                    </ScrollView>
                </View>

                {/* Your Classes */}

                <View style={{ marginTop: 25, marginHorizontal: 15, }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.titleText}>Your Classes</Text>
                            <View style={styles.numberCount}><Text>5</Text></View>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <View style={{ paddingHorizontal: 16, paddingVertical: 13, backgroundColor: "#f2f2f2", borderRadius: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                                <View style={{ backgroundColor: "#FFC800", borderRadius: 10, }}>
                                    <Text style={{ paddingHorizontal: 8, paddingVertical: 5, color: "#2B454E", fontSize: 12, fontWeight: "500" }}>10 th A</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={{ fontSize: 14, color: "#707070", fontWeight: "500" }}>Total Student</Text>
                                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#2B454E", borderRadius: 10, }}>
                                    <Text style={{ paddingHorizontal: 16, paddingVertical: 5, color: '#fff', fontSize: 14 }}>Take Class</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 14, color: "#263238" }}>Mathematic | 9:30 Am</Text>
                        </View>
                    </View>
                </View>

                {/* curricullum section */}
                <View style={{ marginTop: 12, backgroundColor: '#fff' }}>
                    <View style={{ marginTop: 13 }}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.titleText}>Curriculam</Text>

                            </View>
                        </View>

                        <FlatList
                            data={curricullum.slice(0, curricullumSize)}
                            renderItem={({ item, index }) => (
                                <HorizontalSlider item={item} openScreen={openCategories} type="curricullum" />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={4} />
                        <TouchableOpacity onPress={() => { showMore('curricullum') }} style={{
                            backgroundColor: '#fff', alignSelf: 'center', borderWidth: 1,
                            borderColor: '#F2F2F2', borderRadius: 25,
                        }}>
                            <Text style={{ color: '#848598', fontSize: 9, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 7 }}> {isShowCurricullum ? 'See Less' : 'See More'}{"  "}
                                <MaterialCommunityIcons name={isShowCurricullum ? 'chevron-up' : 'chevron-down'} size={9} color="#848598" /></Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Announments */}
                <View style={{ marginTop: 25, marginHorizontal: 15, }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.annoummentText}>Announments</Text>
                            <View style={styles.numberCount}><Text >5</Text></View>

                        </View>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <View style={{ backgroundColor: "#f2f2f2", paddingHorizontal: 24, paddingVertical: 18 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#2B454E", width: 210 }}>You have an Event to Attend </Text>
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#2B454E" }}>
                                <Text style={{ color: '#3A9E22', fontSize: 12 }}>Recent
                                      </Text> | 9:30Am </Text>
                        </View>
                        <Text style={{ fontSize: 14, color: "#707070", paddingTop: 5 }}>The school has been deside to organized an event on 24 April</Text>
                        {/* <View style={{ borderBottomWidth: 0.5, borderColor: "#A3A4A7", marginTop: 15 }}></View> */}
                    </View>
                </View>



                {/* Story Section */}

                <View style={{ flex: 1, backgroundColor: "#F2F2F2" }}>

                    {/* { userStory && */}


                    <View style={{ backgroundColor: "#fff" }}>
                        <View style={{ marginTop: 25, marginHorizontal: 15, }}>
                            <View style={styles.recentStory}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.titleText}>Recent Story</Text>
                                    <View style={styles.numberCount}><Text>5</Text></View>

                                </View>
                                <TouchableOpacity style={styles.seeAllButton}>
                                    <Text style={styles.seeAllText}>New Story</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <FlatList

                            contentContainerStyle={{ paddingTop: 10 }}
                            keyboardShouldPersistTaps="always"
                            keyboardDismissMode="on-drag"
                            // data={userStory}
                            data={story}
                            refreshing={true}
                            renderItem={({ item, index }) => (
                                <View style={{ ...styles.postContainer, borderBottomWidth: 1, borderColor: "#F2F2F2" }}>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                        <View style={styles.customListView}>

                                            <TouchableOpacity onPress={() => { props.navigation.navigate('StoryProfile', { data: item }) }}>
                                                {item.displayImageUrl != '' ?
                                                    <Image style={{ width: 40, height: 40, borderRadius: 20, }} source={{ uri: item.displayImageUrl }}></Image>
                                                    :
                                                    <View style={styles.avtar}>
                                                        <Text style={{ color: '#fff' }}>{item.displayName[0]}</Text>
                                                    </View>
                                                }

                                            </TouchableOpacity>

                                            <View style={styles.infoWrapper}>

                                                <View style={styles.namesWrapper}>
                                                    {
                                                        item.docType == 'video' ?
                                                            <TouchableOpacity>
                                                                <Text style={styles.nameText}> {item.publishBy}</Text>
                                                            </TouchableOpacity>
                                                            :
                                                            <TouchableOpacity>
                                                                <Text style={styles.nameText}> {item.displayName}</Text>
                                                            </TouchableOpacity>

                                                    }

                                                </View>

                                                {/* <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }}>
                                            <View style={styles.extraInfoWrapper}>
                                                <Text style={{ color: storyDate(item.createdAt) == 'Just now' ? 'blue' : "#C1C6D0", fontSize: 12 }}> {storyDate(item.createdAt)} ago</Text>
                                                <Text style={{ fontSize: 16, marginHorizontal: 2 }}></Text>
                                                <FontAwesome5Icon color='#C1C6D0' name="clock" />
                                            </View>

                                        </View> */}

                                            </View>

                                        </View>



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
                                                    <View>
                                                        <TouchableOpacity style={styles.imageContainer} >
                                                            <Image source={{ uri: item.resourceUrl }} style={{ resizeMode: 'contain' }} style={{ width: Dimensions.get('window').width, height: 400 }} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            }

                                            {item.docType == 'text' &&
                                                <ImageBackground source={item.bgUrl ? { uri: item.bgUrl } : {}} style={{ ...styles.editorWrapper, backgroundColor: item.bgUrl ? '' : item.color }}>
                                                    <TouchableOpacity style={{ width: '100%', justifyContent: item.isBackground != undefined ? item.isBackground ? 'center' : 'flex-start' : 'flex-start', }}>
                                                        <Text style={{
                                                            fontWeight: '500', color: "#2B454E", fontSize: 14, fontSize: item.isBackground != undefined ? item.isBackground ? 26 : 16 : 16,
                                                            textAlign: item.isBackground != undefined ? item.isBackground ? 'center' : 'justify' : 'justify'
                                                        }}>
                                                            <Autolink text={item.message} />
                                                        </Text>
                                                    </TouchableOpacity>
                                                </ImageBackground>
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
                                                                    <Text style={{ color: '#2B454E', fontSize: 14, fontWeight: 'bold', }}>{item.title || ''}</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        }
                                                    </View>
                                                </View>
                                            }
                                            {item.docType == 'imageBackground' &&
                                                <TouchableOpacity onPress={() => _gotoStory(item)}>
                                                    <ImageBackground source={item.resourceUrl ? { uri: item.resourceUrl } : {}} style={{ ...styles.editorWrapper, height: 350 }}>
                                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text style={{ fontWeight: '500', color: "#fff", fontSize: 26, textAlign: 'center' }}>
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

                                            <View style={styles.actionBtncontainer}>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <TouchableOpacity  >
                                                        {/* <AntDesign
                                                    size={22}
                                                    color={item.likedBy.indexOf(loginData.parentId) > -1 ? "red" : '#414268'}
                                                    name={item.likedBy.indexOf(loginData.parentId) > -1 ? "heart" : 'hearto'}
                                                /> */}

                                                        <AntDesign
                                                            size={22}
                                                            color='#263238'
                                                            name="heart"
                                                        />
                                                    </TouchableOpacity >

                                                    <TouchableOpacity style={{ paddingLeft: 30 }} onPress={() => { props.navigation.navigate('CommentsPopup', { data: item }) }}>
                                                        <FontAwesome5Icon size={22} name="comment" color="#263238" />
                                                    </TouchableOpacity>

                                                    <TouchableOpacity style={{ paddingLeft: 30 }} >
                                                        <MaterialCommunityIcons size={22} name="share-outline" color="#263238" />
                                                    </TouchableOpacity>

                                                </View>

                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={styles.commentText}>{item.commentCount ? item.commentCount : 0} Comments .</Text>
                                                    <Text style={styles.shareText}>1 Share</Text>
                                                </View>
                                            </View>
                                            {/* <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center", marginBottom: 5 }} onPress={() => { props.navigation.navigate('PeopleLike', { data: item }) }}>
                                        <Text style={{ justifyContent: "center", alignItems: "center", paddingLeft: 10 }}>
                                            {item.likedBy.length > 0 &&
                                                <Text style={{ color: "#C1C6D0", fontSize: 14, }}> Like by </Text>
                                            }
                                            {(item.likedBy.indexOf(loginData.parentId) > -1) &&
                                                <Text style={{ color: "#C1C6D0", fontSize: 14 }}>you</Text>
                                            }
                                            {item.likedBy.length > 0 &&
                                                <Text style={{ color: "#C1C6D0", fontSize: 14 }}> {(item.likedBy.length > 0 && item.likedBy.indexOf(loginData.parentId) > -1) ? `and ${item.likedBy.length - 1} others` : `${item.likedBy.length} others`}</Text>
                                            }
                                        </Text>
                                    </TouchableOpacity> */}
                                        </View>
                                    }
                                    {/* <View>
                                {item.review == 2 &&
                                    <View style={{ backgroundColor: '#fff', }}>
                                        <MaterialCommunityIcons name="eye-off" style={{ textAlign: 'center' }} color="#000" size={40} />
                                        <Text style={{ fontWeight: '400', color: 'darkgray', fontSize: 18, paddingHorizontal: 20, paddingBottom: 30, textAlign: 'center' }}>
                                            This Post has been removed due to voilation of Skugal Policy
                                     </Text>
                                    </View>
                                }
                            </View> */}
                                </View>

                            )}
                            keyExtractor={(item, index) => `${index.toString()}`}
                        />
                    </View>
                    {/* } */}



                </View>



                <TouchableOpacity onPress={() => { doLogOut() }} style={{ marginTop: 100 }}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                {/* 
            <TouchableOpacity onPress = {()=>{Assignment()}}>
                <Text style={{paddingTop:20}}>Assignment</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {()=>{Gallery()}}>
                <Text style={{paddingTop:20}}>Gallery</Text>
            </TouchableOpacity> 
            <TouchableOpacity onPress = {()=>{UserIntrest()}}>
                <Text style={{paddingTop:20}}>UserIntrest</Text>
            </TouchableOpacity> */}

            </ScrollView>
        </SafeAreaView>
    )
}


const mapStateToProps = (state) => ({
    loginData: state.mainReducer.loginData,
    classes: state.mainReducer.classes,
    authReducer: state.authReducer,
    standard: state.mainReducer.standard,
    sections: state.mainReducer.sections,
    selectedClass: state.mainReducer.selectedClass
})

export default connect(mapStateToProps, { getClass, selectClass, doLogOut })(Home);

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({

    currentAvtar: {
        width: 70,
        height: 70,
        backgroundColor: "#EE9BA5",
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center"
    },
    currentAvtarText: {
        fontSize: 22,
        fontWeight: "500",
        color: "#fff",
        textTransform: "capitalize"
    },

    titleText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#263238",

    },
    numberCount: {
        marginLeft: 10,
        backgroundColor: "#F2F2F2",
        borderRadius: 9,
        paddingHorizontal: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    seeAllButton:
    {
        backgroundColor: "#f2f2f2",
        paddingHorizontal: 10,
        alignItems: "center",
        borderRadius: 25,
        justifyContent: "center"
    },
    seeAllText: {
        fontSize: 12,
        color: "#A3A4A7"
    },
    nameText: {
        fontSize: 16,
        fontWeight: '500',
        textTransform: 'capitalize',
        color: '#263238'
    },

    annoummentText: {
        fontSize: 14,
        color: "#707070",
        paddingTop: 5
    },

    mainUser: {
        backgroundColor: "#2B454E",
        justifyContent: "center",
        alignItems: "center",
        width: 24,
        height: 24,
        borderRadius: 12,
        position: "absolute",
        bottom: 0,
        right: 0
    },
    avatar: {
        backgroundColor: '#F57B2D',
        width: 152,
        height: 152,
        borderRadius: 152 / 2,
        justifyContent: "center",
        alignItems: "center"
    },

    avatar1: {
        width: 152,
        height: 152,
        borderRadius: 152 / 2,
    },

    camera: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#E61A50",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 10,
        right: 10
    },

    avtar:
    {
        backgroundColor: '#E61A50',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",


    },


    contentContainer: {
        paddingHorizontal: 10,
        paddingBottom: 5

    },
    postContainer: {
        backgroundColor: 'white',
        paddingVertical: 15,
    },

    customListView: {
        paddingHorizontal: 10,
        width: screenWidth - 40,
        flexDirection: 'row',

    },

    infoWrapper: {
        marginLeft: 0
    },

    namesWrapper: {
        flexDirection: 'row',
        alignItems: 'center',


    },

    paragraph: {
        color: '#2B454E',
    },
    imageContainer: {
        width: Dimensions.get('window').width
    },
    editorWrapper: {
        overflow: 'hidden',
        paddingTop: 10,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    extraInfoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    actionBtncontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginHorizontal: 15,
        paddingVertical: 10
    },
    commentText: {
        color: "#263238",
        fontSize: 14
    },
    shareText: {
        color: "#263238",
        fontSize: 14,
        paddingLeft: 5
    },
    storyStyle: {
        marginTop: 15,
        marginLeft: 15
    },
    recentStory: {
        flexDirection: "row",
        justifyContent: "space-between"
    }

})