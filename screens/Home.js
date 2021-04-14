import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList, SafeAreaView, Dimensions, Image, ImageBackground, Linking } from 'react-native'
import { connect } from 'react-redux'
import HomeHeader from '../components/HomeHeader'
import { doLogOut } from '../redux/actions/authActions'
import { getClass, getOnlineClass, selectClass, selectSection } from '../redux/actions/mainActions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FeedSlider from '../components/FeedSlider'
import { curricullumData } from '../classData.js'
import HorizontalSlider from '../components/HorizontalSlider'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Autolink from 'react-native-autolink'


import { deletePost, getStory, like, createStories, retreiveMore, gotoStory } from '../redux/actions/storyActions'
import { storyDate } from '../functions/timeformat'

const Home = (props) => {
    const [isClassModal, setIsClassModal] = useState(false)
    const [isSectionModal, setIsSectionModal] = useState(false)

    const [curricullumSize, setCurricullumSize] = useState(4)
    const [curricullum, setCurricullum] = useState(curricullumData)
    const [isShowCurricullum, setIsShowCurricullum] = useState(false)
    const [previewData, setpreviewData] = useState({})

    const { doLogOut } = props

    const { getClass, selectClass, loginData, standard, sections, selectedClass, selectSection, getStory, stories, onlineClass, getOnlineClass, totalStudents } = props

    useEffect(() => {
        if (loginData != null) {
            getClass(loginData.userId, loginData.schoolId, loginData.teacherId)
        }
        return () => { }
    }, [])


    useEffect(() => {
        if (loginData) {
            var unsubscribeStory = getStory(loginData.userId, loginData.schoolId, false)
        }
        return () => { unsubscribeStory }
    }, [])

    console.log("stories", stories)


    const _selectClassAndSection = (standardStatus, sectionStatus, item) => {
        _closeModal()
        if (standardStatus) {
            selectClass(item.standard)
        }
        else {
            selectSection(item.section)
        }
    }

    const _closeModal = () => {
        setIsClassModal(false)
        setIsSectionModal(false)
    }


    const _openClassAndSectionModal = (standardStatus, sectionStatus) => {
        setIsClassModal(standardStatus)
        setIsSectionModal(sectionStatus)
    }

    //Get online class
    useEffect(() => {
        if (loginData) {
            getOnlineClass(loginData.userId, loginData.schoolId, selectedClass.standard, selectedClass.section)
        }
        return () => { }
    }, [selectedClass])


    console.log("online class", onlineClass)


    const takeClass = (item) => {
        console.log(item.hangoutsLink)
        try {
            Linking.openURL(String(item.hangoutsLink)).then((d) => {
            }).catch((e) => { })
        }
        catch (e) { }
    }

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

    console.log("login data 116", loginData)



    const renderHeader = () => {
        return (
            <View style={{ paddingTop: 10, }}>
                {/* story section */}
                <View style={{ marginHorizontal: 15 }}>
                    <Text style={{ color: '#263238', fontSize: 16, fontWeight: 'bold' }}>Stories</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ overflow: 'visible', paddingTop: 8 }}>
                        {loginData &&
                            <View>
                                <TouchableOpacity style={{ width: 76, height: 76, borderRadius: 38, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EE9BA5' }}>
                                    <Text style={{ fontSize: 22, color: '#fff', fontWeight: '500' }}>{loginData.firstName != undefined ? loginData.firstName.slice(0, 1) : ''}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ position: 'absolute', backgroundColor: '#2B454E', bottom: 15, right: 5, alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: 12 }}>
                                    <MaterialCommunityIcons name="plus" size={14} color="#fff" />
                                </TouchableOpacity>
                                <Text style={{ color: '#263238', fontSize: 12, textAlign: 'center' }}>Your Story</Text>
                            </View>

                        }

                        {stories.length > 0 &&
                            stories.map((item, index) => (
                                <FeedSlider key={index} ind={index} item={item} />
                            ))
                        }
                    </ScrollView>
                </View>

                {/* Recent Online Class */}
                <View style={{ paddingTop: 22, marginHorizontal: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#263238' }}>Your Classes</Text>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('OnlineClass') }}>
                            <Text>See All</Text>
                        </TouchableOpacity>
                    </View>


                    <View>
                        {
                            onlineClass.slice(0, 3).map((item, index) => (
                                <View key={index}>
                                    { item.events != undefined &&
                                        item.events.map((data, i) => (
                                            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, backgroundColor: '#F2F2F2', marginVertical: 10, padding: 10 }}>
                                                <View>
                                                    <View style={{ backgroundColor: '#FFC800', borderRadius: 10 }}>
                                                        <Text style={{ textAlign: 'center' }}>{data.class} {data.section}</Text>
                                                    </View>

                                                    <Text style={{ fontSize: 14, color: '#707070' }}>Total Students- {totalStudents}</Text>
                                                    <Text style={{ fontSize: 14, color: '#263238' }}>{data.subject}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => { takeClass(data) }} style={{ backgroundColor: '#2B454E', borderRadius: 8, width: 90, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 12, color: '#fff' }}>Take Class</Text>
                                                </TouchableOpacity>

                                            </View>

                                        ))
                                    }
                                </View>

                            ))
                        }
                    </View>
                </View>

                {/* curricullum section */}
                <View style={{ marginTop: 25, backgroundColor: '#fff' }}>
                    <View style={{ marginTop: 13, marginBottom: 13 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15 }}>
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#35365F' }}>Activiy Manager</Text>
                                <Text style={{ fontSize: 10, color: '#848598' }}>Create and manage your reglular class activities</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                curricullum.slice(0, curricullumSize).map((item, index) => (
                                    <View key={index} style={{ flexDirection: 'row' }}>
                                        <HorizontalSlider item={item} openScreen={openCategories} type="curricullum" />
                                    </View>

                                ))
                            }
                        </View>

                        <TouchableOpacity onPress={() => { showMore('curricullum') }} style={{
                            backgroundColor: '#fff', alignSelf: 'center', borderWidth: 1,
                            borderColor: '#F2F2F2', borderRadius: 25,
                        }}>
                            <Text style={{ color: '#848598', fontSize: 9, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 7 }}> {isShowCurricullum ? 'See Less' : 'See More'}{"  "}
                                <MaterialCommunityIcons name={isShowCurricullum ? 'chevron-up' : 'chevron-down'} size={9} color="#848598" /></Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            { loginData &&
                            <HomeHeader
                            {...props}
                            selectClassAndSection={_selectClassAndSection}
                            closeModal={_closeModal}
                            isClassModal={isClassModal}
                            isSectionModal={isSectionModal}
                            classesArr={standard}
                            openClassSectionModal={_openClassAndSectionModal}
                            isSelect={true}
                            sectionsArr={sections}
                            selectedClass={selectedClass}
                            loginData={loginData} />
            }


            <FlatList
                style={{ paddingBottom: 20 }}
                contentContainerStyle={{ backgroundColor: '#f2f2f2', }}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
                data={stories}
                ListHeaderComponent={renderHeader}
                refreshing={true}
                onEndReachedThreshold={0.1}
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
                            {/* {item.uid === loginData.teacherId &&
                            <View>
                                <TouchableOpacity style={{ width: 30, height: 30, }} onPress={() => { showMenu(item) }}>
                                    <MaterialCommunityIcons size={22} name="dots-vertical" color="#7D7D7D" />
                                </TouchableOpacity>
                                <View style={{ position: 'absolute', top: 10, right: 10 }}>
                                    <Menu
                                        animationDuration={50}
                                        ref={(ref) => { rowRefs[item.storyId] = ref; }}
                                    >
                                        <MenuItem textStyle={{ textAlign: 'center' }} onPress={() => { _deletePost(item) }} >Delete</MenuItem>
                                    </Menu>
                                </View>
                            </View>
                        } */}
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
                                                <TouchableOpacity style={styles.imageContainer} onPress={() => _gotoStory(item, index)}>
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
                                                <TouchableOpacity style={styles.imageContainer} onPress={() => _gotoStory(item, index)}>
                                                    <Image source={{ uri: item.resourceUrl }} style={{ resizeMode: 'contain' }} style={{ width: Dimensions.get('window').width, height: 400 }} />
                                                </TouchableOpacity>
                                            }
                                            {item.dataLink != '' && item.title != '' &&
                                                <View style={{ elevation: 3 }}>
                                                    <TouchableOpacity style={{ backgroundColor: '#F7F8FA', padding: 10 }} onPress={() => _gotoStory(item, index)}>
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
                                    <TouchableOpacity onPress={() => _gotoStory(item, index)}>
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
                                    <TouchableOpacity onPress={() => _gotoStory(item, index)} style={{ ...styles.editorWrapper, backgroundColor: item.color, height: 350, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontWeight: '400', color: "#fff", fontSize: 26, textAlign: 'center' }}>
                                            <Autolink text={item.message} />
                                        </Text>
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
                                        <TouchableOpacity onPress={() => { likePost(item, index) }} >
                                            <AntDesign
                                                size={22}
                                                color={item.likedBy.indexOf(loginData.teacherId) > -1 ? "red" : '#414268'}
                                                name={item.likedBy.indexOf(loginData.teacherId) > -1 ? "heart" : 'hearto'}
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
                                        <Text style={{ color: "#414268", fontSize: 14 }}>{item.commentCount ? item.commentCount : 0} Comments</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={{ marginHorizontal: 15, paddingBottom: 10 }} onPress={() => { props.navigation.navigate('PeopleLike', { data: item }) }}>
                                    <Text style={{ justifyContent: "center", alignItems: "center", }}>
                                        {item.likedBy.length > 0 &&
                                            <Text style={{ color: "#C1C6D0", fontSize: 14 }}>Like by </Text>
                                        }
                                        {(item.likedBy.indexOf(loginData.teacherId) > -1) &&
                                            <Text style={{ color: "#C1C6D0", fontSize: 14 }}>you</Text>
                                        }
                                        {item.likedBy.length > 0 &&
                                            <Text style={{ color: "#C1C6D0", fontSize: 14 }}> {(item.likedBy.length > 0 && item.likedBy.indexOf(loginData.teacherId) > -1) ? `and ${item.likedBy.length - 1} others` : `${item.likedBy.length} others`}</Text>
                                        }
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
                keyExtractor={(item, index) => index.toString()}
            />


            <TouchableOpacity onPress={() => { doLogOut() }} style={{ marginTop: 100 }}>
                <Text>Logout</Text>
            </TouchableOpacity>


        </SafeAreaView>
    )
}


const mapStateToProps = (state) => ({
    loginData: state.mainReducer.loginData,
    authReducer: state.authReducer,
    standard: state.mainReducer.allStandard,
    sections: state.mainReducer.allSections,
    selectedClass: state.mainReducer.selectedClass,
    stories: state.storyReducer.stories,
    onlineClass: state.mainReducer.onlineClass,
    totalStudents: state.mainReducer.totalStudents,

})

export default connect(mapStateToProps, { getClass, selectClass, getStory, doLogOut, selectSection, getOnlineClass })(Home);

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
        backgroundColor: '#fff'
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