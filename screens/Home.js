import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import HomeHeader from '../components/HomeHeader'
import { doLogOut } from '../redux/actions/authActions'
import { getClass, selectClass, getStudents } from '../redux/actions/mainActions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { mothsData } from '../functions/timeformat'



const Home = (props) => {
    const [currentMonth, setCurrentMonth] = useState([])

    const { doLogOut } = props

    const { getClass, selectClass, loginData, standard, sections, selectedClass, getStudents, students, totalStudents, totalAbsent, totalPresent } = props

    useEffect(() => {
        let m = mothsData(new Date())
        setCurrentMonth(m)
        console.log("month data is", m)
        return () => {

        }
    }, [])

    useEffect(() => {
        if (loginData != null) {
            getClass(loginData.userId, loginData.schoolId, loginData.teacherId)
        }
        return () => { }
    }, [])

    console.log("selectedClass", selectedClass)

    useEffect(() => {
        if (loginData != null) {
            getStudents(loginData.userId, loginData.schoolId, selectedClass.standard, selectedClass.section)
        }
        return () => {

        }
    }, [selectedClass])

    console.log("students", students)

    const _selectClass = (item) => {
        console.log("_selectClass", item)
        // selectClass(item)
    }
    const _selectSection = (item) => {
        console.log("item is", item)
    }

    console.log("classes", standard, sections, selectedClass)


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <HomeHeader {...props} classesArr={standard} sectionsArr={sections} selectedClass={selectedClass} loginData={loginData} selectStandard={_selectClass} selectSection={_selectSection} />

            <View style={styles.sectionStyle}>
                <TextInput
                    style={{ flex: 1 }}
                    placeholder="Search Student By name"
                    underlineColorAndroid="transparent"
                />
                <MaterialCommunityIcons name="magnify" size={18} color="#707070" style={styles.imageStyle} />

            </View>

            <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        currentMonth.map((item, index) => (
                            <TouchableOpacity key={index} style={{ marginLeft: 12, height: 46, width: 44, borderRadius: 5, backgroundColor: item.isSelected ? '#2B454E' : '#F2F2F2', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: item.isSelected ? '#fff' : '#707070', }}>{item.dayName}</Text>
                                <Text style={{ fontSize: 12, color: item.isSelected ? '#fff' : '#707070' }}>{item.date}</Text>

                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>

            <View style={{ flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between', paddingTop: 20 }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#263238' }}>Students</Text>
                </View>

                <View>
                    <Text><Text style={{ color: '#3CB833', fontSize: 12 }}> {totalPresent} Present</Text> <Text style={{ color: '#F44336', fontSize: 12 }}> {totalAbsent} Absent</Text> <Text style={{ backgroundColor: '#F2F2F2', color: '#263238', fontSize: 12, textAlign: 'center' }}> {totalStudents} Students</Text></Text>
                </View>

            </View>


            {students.length > 0 &&
                <FlatList
                    contentContainerStyle={{ paddingBottom: 20, paddingTop: 12 }}
                    data={students}
                    extraData={students}
                    renderItem={({ item }) => (
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, marginHorizontal: 15 }}>
                                <TouchableOpacity>
                                    <Image source={{ uri: item.studentImageUrl }} style={{ width: 28, height: 28, borderRadius: 8 }} />
                                </TouchableOpacity>

                                <View style={{ flex: 1, paddingLeft: 16 }}>
                                    <Text style={{ fontSize: 16, fontWeight: '400', color: '#263238' }}>{item.studentName}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <TouchableOpacity style={[styles.presentAbsent]}>
                                        <Text style={{ fontSize: 12, color: '#A3A4A7' }}>Present</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={[styles.presentAbsent, { marginLeft: 8 }]}>
                                        <Text style={{ fontSize: 12, color: '#A3A4A7' }}>Absent</Text>
                                    </TouchableOpacity>

                                </View>


                            </View>
                        </View>

                    )

                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            }

        </View>





    )
}

const styles = StyleSheet.create({

    presentAbsent: {
        backgroundColor: '#F2F2F2',
        width: 54,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6

    },
    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        borderWidth: 0.5,
        borderColor: '#cecece',
        height: 41,
        borderRadius: 10,
        margin: 10,
    },

    imageStyle: {
        margin: 5,
        alignItems: 'center',
    },
})


const mapStateToProps = (state) => ({
    loginData: state.mainReducer.loginData,
    classes: state.mainReducer.classes,
    authReducer: state.authReducer,
    standard: state.mainReducer.standard,
    sections: state.mainReducer.sections,
    selectedClass: state.mainReducer.selectedClass,
    students: state.mainReducer.students,
    totalPresent: state.mainReducer.totalPresent,
    totalAbsent: state.mainReducer.totalAbsent,
    totalStudents: state.mainReducer.totalStudents
})

export default connect(mapStateToProps, { getClass, selectClass, doLogOut, getStudents })(Home);


