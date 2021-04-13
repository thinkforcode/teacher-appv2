import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList, SafeAreaView, Dimensions, Image, ImageBackground } from 'react-native'
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



const Home = (props) => {
    const [isClassModal, setIsClassModal] = useState(false)
    const [isSectionModal, setIsSectionModal] = useState(false)

    const [curricullumSize, setCurricullumSize] = useState(4)
    const [curricullum, setCurricullum] = useState(curricullumData)
    const [isShowCurricullum, setIsShowCurricullum] = useState(false)
    const [previewData, setpreviewData] = useState({})

    const { doLogOut } = props

    const { getClass, selectClass, loginData, standard, sections, selectedClass, selectSection, getStory, stories, onlineClass, getOnlineClass} = props

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
        return () => {  }
    }, [selectedClass])

    console.log("online class", onlineClass)

    const renderHeader = () => {
        return (
            <View>
                {/* story section */}
                <View style={{ paddingTop: 10, marginHorizontal:15 }}>
                    <Text style = {{color:'#263238', fontSize:16, fontWeight:'bold'}}>Stories</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ overflow: 'visible', paddingTop:8 }}>
                        {loginData &&
                            <View>
                                <TouchableOpacity style={{ width: 76, height: 76, borderRadius: 38, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EE9BA5' }}>
                                    <Text style={{ fontSize: 22, color: '#fff', fontWeight: '500' }}>{loginData.firstName != undefined ? loginData.firstName.slice(0, 1) : ''}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style = {{position:'absolute', backgroundColor:'#2B454E', bottom:15, right:5, alignItems:'center', justifyContent:'center', width:24, height:24, borderRadius:12}}>
                                    <MaterialCommunityIcons name = "plus" size = {14} color = "#fff" />
                                </TouchableOpacity>
                                <Text style = {{color:'#263238', fontSize:12, textAlign:'center'}}>Your Story</Text>
                            </View>

                        }

                        {stories.length > 0 &&
                            stories.map((item, index) => (
                                <FeedSlider key={index} ind={index} item={item} />
                            ))
                        }
                    </ScrollView>
                </View>

            </View>
        )
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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

            <FlatList
                // refreshControl={
                //     <RefreshControl
                //         refreshing={isRrefresh}
                //         onRefresh={_onRefresh}
                //     />
                // }
                style={{ paddingBottom: 20 }}
                contentContainerStyle={{ backgroundColor: '#fff', }}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
                data={stories}
                ListHeaderComponent={renderHeader}
                refreshing={true}
                // onEndReached={loadMoreData}
                onEndReachedThreshold={0.1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View>
                        {/* <Text>helehghegjh</Text> */}
                    </View>
                )}
                keyExtractor={(item, index) => { index.toString() }}
            />
            <TouchableOpacity onPress = {()=>{props.navigation.navigate('Assignment')}}>
                <Text style={{paddingTop:20}}>Assignment</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = {()=>{props.navigation.navigate('Gallery')}}>
                <Text style={{paddingTop:20}}>Galery</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { doLogOut() }} style={{ marginTop: 20 }}>
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
    onlineClass:state.mainReducer.onlineClass

})

export default connect(mapStateToProps, { getClass, selectClass, getStory, doLogOut, selectSection, getOnlineClass })(Home);

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