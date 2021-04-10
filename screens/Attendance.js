import React, { useEffect, useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView, FlatList, Vibration, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import HomeHeader from '../components/HomeHeader'
import { doLogOut } from '../redux/actions/authActions'
import { getClass, getStudents, gotoAttendanceReport, selectClass, selectSection, takeAttendance } from '../redux/actions/mainActions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { mothsData } from '../functions/timeformat'


const Attendance = (props) => {

    const [currentMonth, setCurrentMonth] = useState([])
    const [isClassModal, setIsClassModal] = useState(false)
    const [isSectionModal, setIsSectionModal] = useState(false)

    const scrollRef = useRef()



    const { getClass, selectClass, gotoAttendanceReport, takeAttendance, isTakenAttendance, selectSection, loginData, standard, sections, selectedClass, getStudents, students, totalStudents, totalAbsent, totalPresent } = props

    useEffect(() => {
        let m = mothsData(new Date())
        setCurrentMonth(m)
        return () => {
        }
    }, [])

    useEffect(() => {
        if (loginData != null) {
            getClass(loginData.userId, loginData.schoolId, loginData.teacherId)
        }
        return () => { }
    }, [])


    useEffect(() => {
        if (loginData != null) {
            getStudents(loginData.userId, loginData.schoolId, selectedClass.standard, selectedClass.section)
        }
        return () => { }
    }, [selectedClass])



    useEffect(() => {
        setTimeout(() => {
            if(scrollRef.current) {
              const node = scrollRef.current
              if (node) {
                node.scrollTo({ x: Dimensions.get('window').width , y: 0, animated:true });
              }
            }
            
        }, 5000);

        return () => {
        }
      }, [])


    const _openClassAndSectionModal = (standardStatus, sectionStatus) => {
        setIsClassModal(standardStatus)
        setIsSectionModal(sectionStatus)
    }

    const _selectClassAndSection = (standardStatus, sectionStatus, item) => {
        setIsClassModal(false)
        setIsSectionModal(false)
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

    const _takeAttendance = (status, item, index) => {
        Vibration.vibrate(50) 
        takeAttendance(status, item, index)

    }

    console.log("students", students)

    console.log("loginData ln 84", loginData)

    const renderHeader = () => {
        return (
            <View>
                <View style={styles.sectionStyle}>
                    <TextInput
                        style={{ flex: 1, paddingLeft:16 }}
                        placeholder="Search Student By name"
                        underlineColorAndroid="transparent"
                    />
                    <MaterialCommunityIcons name="magnify" size={18} color="#707070" style={styles.searchIcon} />

                </View>

                <View>
                    <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}  ref={scrollRef}>
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
            </View>
        )
    }

    const _gotoAttendanceReport = (item) =>{
        gotoAttendanceReport(item)
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
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

            {students.length > 0 &&
                <FlatList
                    contentContainerStyle={{ paddingBottom: 20, paddingTop: 12 }}
                    data={students}
                    extraData={students}
                    ListHeaderComponent = {renderHeader()}
                    renderItem={({ item, index }) => (
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, marginHorizontal: 15 }}>
                                <TouchableOpacity>
                                    <Image source={{ uri: item.studentImageUrl }} style={{ width: 28, height: 28, borderRadius: 8 }} />
                                </TouchableOpacity>

                                <TouchableOpacity style={{ flex: 1, paddingLeft: 16 }} onPress = {()=>{_gotoAttendanceReport(item)}}>
                                    <Text style={{ fontSize: 16, fontWeight: '400', color: '#263238' }}>{item.studentName}</Text>
                                </TouchableOpacity>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity style={[styles.presentAbsent, { backgroundColor: item.status ? '#3CB833' : "#F2F2F2" }]} onPress={() => { _takeAttendance(true, item, index) }}>
                                        <Text style={{ fontSize: 12, color: item.status ? '#fff' : "#A3A4A7" }}>Present</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={[styles.presentAbsent, { marginLeft: 8, backgroundColor: !item.status ? '#F44336' : "#F2F2F2" }]} onPress={() => { _takeAttendance(false, item, index) }}>
                                        <Text style={{ fontSize: 12, color: !item.status ? '#fff' : "#A3A4A7" }}>Absent</Text>
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

    searchIcon: {
        margin: 5,
        alignItems: 'center',
        paddingRight:16
    },
})


const mapStateToProps = (state) => ({
    loginData: state.mainReducer.loginData,
    classes: state.mainReducer.classes,
    authReducer: state.authReducer,
    standard: state.mainReducer.allStandard,
    sections: state.mainReducer.allSections,
    selectedClass: state.mainReducer.selectedClass,
    students: state.mainReducer.students,
    totalPresent: state.mainReducer.totalPresent,
    totalAbsent: state.mainReducer.totalAbsent,
    totalStudents: state.mainReducer.totalStudents,
    isTakenAttendance: state.mainReducer.isTakenAttendance,
    // mainReducer:state.mainReducer

})

export default connect(mapStateToProps, { getClass, selectClass, selectSection, getStudents, takeAttendance, gotoAttendanceReport })(Attendance);


