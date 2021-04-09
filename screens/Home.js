import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import HomeHeader from '../components/HomeHeader'
import { doLogOut } from '../redux/actions/authActions'
import { getClass, selectClass } from '../redux/actions/mainActions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FeedSlider from '../components/FeedSlider'
import { curricullumData } from '../classData.js'
import HorizontalSlider from '../components/HorizontalSlider'


const Home = (props) => {
    const [curricullumSize, setCurricullumSize] = useState(4)
    const [curricullum, setCurricullum] = useState(curricullumData)
    const [isShowCurricullum, setIsShowCurricullum] = useState(false)

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


    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
            <HomeHeader {...props} classesArr={standard} sectionsArr={sections} selectedClass={selectedClass} loginData={loginData} selectStandard={_selectClass} selectSection={_selectSection} />

            {/* Story Section */}
            <View style={{ marginTop: 15, marginLeft: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#263238", marginBottom: 10 }}>Stories</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ overflow: 'visible', }} >


                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <View style={{ width: 70, height: 70, backgroundColor: "#EE9BA5", borderRadius: 35, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 22, fontWeight: "500", color: "#fff", textTransform: "capitalize" }}>{loginData.firstName[0]}</Text>
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
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#263238" }}>Your Classes</Text>
                        <View style={{ marginLeft: 10, backgroundColor: "#F2F2F2", borderRadius: 9, paddingHorizontal: 8, }}><Text style={{}}>5</Text></View>
                    </View>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 12, color: "#A3A4A7" }}>See All</Text>
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
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#263238' }}>Curriculam</Text>

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
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#F44336" }}>Announments</Text>
                        <View style={{ marginLeft: 10, backgroundColor: "#F2F2F2", borderRadius: 9, paddingHorizontal: 8, }}><Text >5</Text></View>
                    </View>


                    <TouchableOpacity>
                        <Text style={{ fontSize: 12, color: "#A3A4A7" }}>See All</Text>
                    </TouchableOpacity>
                </View>
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


const styles = StyleSheet.create({

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
})