import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'
import { getStudents } from '../redux/actions/mainActions';

const TotalStudent = (props) => {

    const [loginData, setLoginData] = useState({})
    const { getStudents, getStudent, selectedClass } = props

    useEffect(() => {
        AsyncStorage.getItem('login').then((r) => {
            if (r != null) {
                let d = JSON.parse(r)
                console.log("d is", d)
                getStudents(d.userId, d.schoolId, selectedClass.standard, selectedClass.section)
                setLoginData(d)
            }
            return () => { }
        }).catch(e => {
        })

    }, [])

    console.log("selectedClass", selectedClass)
    console.log("getStudent", getStudent)

    var presentStudent = 0;
    for (var i = 0; i < getStudent.length; i++) {
        if (getStudent[i].status === true) {
            presentStudent = presentStudent + 1
        }
    }
    var absentStudent = getStudent.length - presentStudent

    return (
        <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
            <View style={{ flexDirection: "row", alignItems: "center", padding: 5, backgroundColor: "#fff", paddingHorizontal: 5 }}>
                <Text style={{ color: "#392C60" }}>All </Text>
                <Text>Standerd : </Text>
                <Text style={{ color: "#392C60" }}>{selectedClass.standard} </Text>
                <Text>Section : </Text>
                <Text style={{ color: "#392C60" }}>{selectedClass.section} </Text>
                <Text>Total Student : </Text>
                <Text style={{ color: "#392C60" }}>{getStudent.length} </Text>
            </View>

            <View style={{ flexDirection: "row", backgroundColor: "#f2f2f2", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialCommunityIcons name="circle" size={10} color="green" />
                    <Text style={{ paddingLeft: 10 }}>Total Prestent: </Text>
                    <Text style={{ color: "green" }}>{presentStudent}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialCommunityIcons name="circle" size={10} color="red" />
                    <Text style={{ paddingLeft: 10 }}>Total Absent: </Text>
                    <Text style={{ color: "red" }}>{absentStudent}</Text>
                </View>

            </View>
            {getStudent.length > 0 &&
                <FlatList
                    data={getStudent}
                    extraData={getStudent}
                    renderItem={({ item }) => (
                        <View style={{ marginBottom: 15 }}>
                            <TouchableOpacity style={{
                                flexDirection: "row", paddingVertical: 15, alignItems: "center", borderColor: "#C1C6D0", paddingHorizontal: 15,
                                backgroundColor: "#fff", justifyContent: "center"
                            }} onPress={() => { props.navigation.navigate('Home') }}>

                                {item.status == true ?
                                    <View style={{ marginTop: -20, marginRight: -3 }}><MaterialCommunityIcons name="circle" size={10} color="green" /></View> :
                                    <View style={{ marginTop: -20, marginRight: -3 }}><MaterialCommunityIcons name="circle" size={10} color="red" /></View>
                                }
                                {

                                    item.studentImageUrl != '' ?
                                        <Image style={styles.avatar1} source={{ uri: item.studentImageUrl }}></Image>
                                        :
                                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                            <Text style={styles.avatar}></Text>
                                        </View>

                                }

                                <View style={{ paddingLeft: 10 }}>
                                    <Text>{item.studentName}</Text>
                                    <Text style={{ color: "green" }}>Click to View Attendence report</Text>
                                </View>
                                <Text style={{ paddingLeft: 20 }}><MaterialCommunityIcons name="chevron-right" size={20} color="green" /></Text>
                            </TouchableOpacity>


                        </View>
                    )

                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            }
            {
                getStudent.length == 0 &&
                <Text style={{ color: 'red', textAlign: 'center', paddingTop: 100 }}>No Students available now !</Text>
            }
        </View>


    )
}

const styles = StyleSheet.create({
    avatar1: {

        width: 36, height: 36,
        borderRadius: 18,
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
})

const mapStateToProps = (state) => ({
    getStudent: state.mainReducer.getStudent,
    selectedClass: state.mainReducer.selectedClass
})

export default connect(mapStateToProps, { getStudents })(TotalStudent);