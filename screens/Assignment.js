import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList, SafeAreaView, Dimensions, Image, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import HomeHeader from '../components/HomeHeader'
import { doLogOut } from '../redux/actions/authActions'
import { getClass, getOnlineClass, selectClass, selectSection } from '../redux/actions/mainActions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { curricullumData } from '../classData.js'
import { deletePost, getStory, like, createStories, retreiveMore, gotoStory } from '../redux/actions/storyActions'






const Assignment = (props) => {
    const [isClassModal, setIsClassModal] = useState(false)
    const [isSectionModal, setIsSectionModal] = useState(false)

    const [curricullumSize, setCurricullumSize] = useState(4)
    const [curricullum, setCurricullum] = useState(curricullumData)
    const [showAssignment, setShowAssignment] = useState(true)
    const [showSubmission, setshowSubmission] = useState(false)




    const { getClass, selectClass, loginData, standard, sections, selectedClass, selectSection, getStory, stories, onlineClass, getOnlineClass } = props

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

    const _assignment = (() => {
        setshowSubmission(false)
        setShowAssignment(true)
    })
    const _submission = (() => {
        console.log('show')
        setShowAssignment(false)
        setshowSubmission(true)

    })




    const renderHeader = () => {
        return (
            <View>
                <View style={styles.midPart}>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => { _assignment() }}  >
                        <Text style={styles.tabText}>Assignments</Text>
                        <View style={styles.lineStyle}>
                            {showAssignment == true &&
                                <Text style={styles.lineText}></Text>
                            }

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => { _submission() }} >
                        <Text style={styles.tabText}>Submission</Text>
                        <View style={styles.lineStyle}>
                            {showSubmission == true &&
                                <Text style={styles.lineText}></Text>
                            }

                        </View>
                    </TouchableOpacity>
                </View>

                {showAssignment == true &&
                    <View>
                        <View style={{ marginTop: 15, marginBottom: 10, marginHorizontal: 15 }}>
                            <Text style={{ fontSize: 12, fontWeight: "500", color: "#3A9E22" }}>Recent</Text>
                        </View>
                        <View style={{ marginHorizontal: 8 }}>
                            <View style={{ paddingHorizontal: 15, paddingVertical: 8, backgroundColor: "#f2f2f2", borderRadius: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#2B454E" }}>English</Text>
                                <Text style={{ fontSize: 14, color: "#2B454E" }}>State and hooks are asynchronous. You won't see a change in isLoading directly after calling set..., but only on the next render of the component, which will happen "soon enough".</Text>
                                <View style={{ flexDirection: "row", marginTop: 5 }}>
                                    <Text style={{ color: "#707070", fontSize: 12 }}>Date - 10 April,201 | </Text>
                                    <Text style={{ color: "#3CB833", fontSize: 12 }}>SubmissionDate - 10 April,201 | </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                }

                {showSubmission == true &&
                    <View style={{ marginTop: 150, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: "#707070", fontSize: 18, fontWeight: "bold" }}>No Submissions !</Text>

                    </View>
                }

                {/* No Assignment
                <View style={{marginTop:150,alignItems:"center",justifyContent:"center"}}>
                       <Text style={{color:"#707070",fontSize:18,fontWeight:"bold"}}>No Assignment Created</Text>
                       <Text style={{color:"#A3A4A7",fontSize:14}}>Tab to Plus button to create new assignment</Text>
                       </View> */}







            </View>


        )
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <HomeHeader
                {...props}
                title="Assignment" screen="Assignment"
                selectClassAndSection={_selectClassAndSection}
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

                ListHeaderComponent={renderHeader}
                refreshing={true}
                // onEndReached={loadMoreData}

                keyExtractor={(item, index) => { index.toString() }}
            />

            {/* Create Assignment */}

            <TouchableOpacity style={styles.createAssignment} onPress={() => { props.navigation.navigate('CreateAssignment') }}>
                <MaterialCommunityIcons name="plus" size={28} color="#fff" />
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



})

export default connect(mapStateToProps, { getClass, selectClass, getStory, doLogOut, selectSection, getOnlineClass })(Assignment);

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({

    midPart: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: "#f2f2f2",
        height: 50,
        alignItems: "center"
    },

    lineStyle: {
        paddingTop: 12
    },

    lineText: {
        width: 50,
        height: 4,
        backgroundColor: "#2B454E",
        borderRadius: 2
    },

    tabText: {
        fontSize: 14,
        color: "#707070",
        paddingTop: 14
    },
    selectedTab: {
        paddingBottom: 0,
        borderBottomWidth: 4,
        borderBottomColor: '#2B454E',
        borderRadius: 2

    },

    nonSelectedtab: {
        borderBottomWidth: 0
    },
    createAssignment: {
        position: "absolute",
        bottom: 10,
        right: 10,
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2B454E"
    }

})