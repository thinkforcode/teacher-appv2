import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { getClassCurricullamData,getOnlineClass } from '../redux/actions/mainActions';
import { formatDate } from '../functions/timeformat';
import Headers from '../components/Headers'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../components/Loader'


const Assignment = (props) => {
    // const [loginData, setLoginData] = useState(null)
    const {  getClassCurricullamData , loginData, assignment, selectedClass } = props

    const [assignmentData, setAssignmentData] = useState([
        { creationTime: 10, subject: "hindi ", teacher: "deepak" },
        { creationTime: 10, subject: "hindi", teacher: "rahul singh bisht" }
    ])

    // useEffect(() => {
    //     AsyncStorage.getItem('login').then((r) => {
    //         if (r != null) {
    //             let d = JSON.parse(r)
    //             setLoginData(d)
    //               getClassCurricullamData(d.userId, d.schoolId, selectedClass.standard, selectedClass.section, 'assignment', 'GET_ASSIGNMENT')
    //         }
    //         return () => { }
    //     }).catch((e) => {
    //     })

    // }, [])

    useEffect(() => {
        // console.log("loginData", loginData)
        if(loginData!= null){
            getClassCurricullamData(loginData, selectedClass, 'assignment')
        }
        return () => { }
    }, [])

    

    console.log("Assignment selectedClass", selectedClass)
    // console.log("Assignmentscreen ", assignment)


    const gotoPreview = (item) => {
        props.navigation.navigate('Preview', { data: item })

    }



    return (
        // dashboardReducer.isLoading ? <Loader />:
        <View style={{ flex: 1 }}>
            {/* { loginData &&
                <Headers {...props} title={`Assignment` + ' ' + loginData.standard + ' ' + loginData.section} screen="Assignment" />
            } */}
            <StatusBar backgroundColor="#E61A50" barStyle="light-content" />
            <Headers {...props} title={`Assignment`} screen="Assignment" />
            <View style={styles.container}>
                {/* {dashboardReducer && */}
                <View>
                    <FlatList
                        contentContainerStyle={styles.contentList}
                        // data={dashboardReducer.assignment}
                        // extraData={dashboardReducer.assignment}
                        data={assignmentData}
                        keyExtractor={(item, index) => { return index.toString(); }}
                        renderItem={({ item, index }) => {
                            return (
                                <View key={index} style={styles.mainContainer}>
                                    <View>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={styles.simpleText}>Subject</Text>
                                            <View style={{ paddingLeft: 62 }}>
                                                <Text style={styles.subjectText}>
                                                    {item.subject ? item.subject : 'No Subject '}</Text>
                                                <Text style={{ fontSize: 9, color: '#848598', paddingLeft: 3 }}>{formatDate(item.creationTime ? item.creationTime : 'No Creation Time')}</Text>
                                            </View>

                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                                            <View style={{ flexDirection: "row" }}>
                                                <View>
                                                    <Text style={styles.simpleText}>Submission</Text>
                                                    <Text style={styles.dateText}>date</Text>
                                                </View>


                                                <Text style={{ fontSize: 14, color: '#392C60', paddingLeft: 35 }}>{formatDate(item.creationTime ? item.creationTime : "No Date")}</Text>
                                            </View>



                                            <TouchableOpacity style={styles.button} onPress={() => gotoPreview(item)}>
                                                <Text style={styles.buttonText}>View</Text>
                                                <Text style={styles.iconText}><MaterialCommunityIcons name="arrow-right" size={14} color="#fff" /></Text>
                                            </TouchableOpacity>

                                        </View>


                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                                            <Text style={styles.simpleText}>Teacher</Text>
                                            <View style={{ paddingLeft: 60 }}>
                                                <Text style={{ fontSize: 14, color: '#392C60' }}>{item.teacher ? item.teacher : 'No Teacher'}</Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
                {/* } */}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    description: {
        fontSize: 14,
        color: "#414268",
    },

    contentList: {
        paddingBottom: 100,
    },

    mainContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ECF0F8',
        marginVertical: 10,
        marginHorizontal: 10,
        elevation: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    simpleText:
    {
        fontSize: 14,
        color: '#848598'
    },
    dateText:
    {
        fontSize: 14,
        color: '#848598',
        position: "absolute",
        top: 12
    },
    subjectText:
    {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#FEB62D',
        textAlign: "center",
        borderRadius: 5,
        alignItems: 'center'
    },
    button:
    {
        flexDirection: "row",
        backgroundColor: "#E53563",
        width: 85,
        height: 25,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText:
    {
        color: "#fff",
        fontSize: 14,
        textAlign: "center",

        fontSize: 14,
        fontWeight: "500"
    },
    iconText:
    {
        paddingLeft: 10,
        paddingTop: 2
    }

});


const mapStateToProps = (state) => ({
    loginData:state.mainReducer.loginData,
    assignment: state.mainReducer.assignment,
    selectedClass: state.mainReducer.selectedClass,
    
})

export default connect(mapStateToProps, { getClassCurricullamData})(Assignment);

