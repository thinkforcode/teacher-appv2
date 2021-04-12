import React, { useEffect } from 'react'
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import { connect } from 'react-redux'
import { Calendar } from 'react-native-calendars';
import Backbar from '../components/Backbar'
import { getAttendanceReport } from '../redux/actions/mainActions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { monthNames } from '../functions/timeformat';


const AttendanceReport = (props) => {

    const { loginData, activeStudents, getAttendanceReport, attendance, presentCount, absentcount, notTakenAttendanceCount } = props

    useEffect(() => {
        if (loginData != null && activeStudents.studentUid != undefined) {
            getAttendanceReport(loginData.userId, loginData.schoolId, activeStudents.studentUid)

            console.log("Logindata", loginData, "activeStudents", activeStudents, "attendance", attendance)
        }
        return () => { }
    }, [])



    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Backbar {...props} title="Attendance Report" screen="AttendanceReport" />

            <ScrollView>
                {activeStudents &&
                    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', marginHorizontal: 16 }} >

                        <Image source={{ uri: activeStudents.studentImageUrl }} style={{ width: 28, height: 28, borderRadius: 8 }} />

                        <View style={{ marginLeft: 16, flex: 1 }}>
                            <Text style={{ color: '#392C60', fontSize: 16, fontWeight: 'bold', textTransform: 'capitalize', fontWeight: "bold" }}>{activeStudents.studentName}</Text>
                            <Text style={{ marginTop: 4, padding: 4, width: 107, textAlign: 'center', fontSize: 12, backgroundColor: '#F2F2F2', color: "#707070", borderRadius: 4 }}>{activeStudents.parentMobileNumber ? activeStudents.parentMobileNumber : ''}</Text>
                        </View>

                        <TouchableOpacity onPress={() => { Linking.openURL(`tel:${activeStudents.parentMobileNumber} `) }} style={{ backgroundColor: '#2B454E', borderRadius: 6, width: 36, height: 36, justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="phone" color="#fff" size={16} />
                        </TouchableOpacity>

                    </View>
                }

                <View style={{ marginHorizontal: 15, paddingTop: 15 }}>
                    <Text><Text style={{ fontSize: 14, color: '#263238', fontWeight: 'bold' }}>Today's Report |</Text> <Text style={{ color: '#A3A4A7', fontSize: 14 }}>{new Date().getDate() + ' ' + monthNames[new Date().getMonth()] + ', ' + new Date().getFullYear()}</Text></Text>
                </View>

                { activeStudents &&
                         <TouchableOpacity style = {{backgroundColor:activeStudents.status ? '#3CB833':'#F44336', marginHorizontal:15, marginTop:8, height:30, borderRadius:6}}>
                         <Text>{activeStudents.studentName} is {activeStudents.status ? 'Present':'Absent'} today!</Text>
                     </TouchableOpacity>
                }

           
                {attendance &&
                    <View>
                        <Calendar
                            markingType={'custom'}
                            current={new Date()}
                            maxDate={'2050-05-30'}
                            monthFormat={'MMM, yyyy'}
                            disableMonthChange={true}
                            // enableSwipeMonths={true}

                            hideExtraDays={true}
                            firstDay={1}
                            markedDates={attendance}
                            onPressArrowLeft={substractMonth => substractMonth()}
                            onPressArrowRight={addMonth => addMonth()}
                            style={{
                                height: 350,
                            }}

                            theme={{
                                backgroundColor: '#fff',
                                calendarBackground: '#fff',
                                textSectionTitleColor: '#848598',
                                textSectionBackgroundColor: "#F2F2F2",
                                selectedDayBackgroundColor: '#2a2e42',
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: '#00adf5',
                                dayTextColor: '#A3A4A7',
                                dayFontSize: 12,
                                dayFontWeight: "500",
                                textDisabledColor: '#d9e1e8',
                                selectedDotColor: '#ffffff',
                                arrowColor: '#2a2e42',
                                monthTextColor: '#2a2e42',
                                textMonthFontWeight: 'bold',
                                textMonthFontSize: 16,
                                textDayFontSize: 16,
                                textDayHeaderFontSize: 16,
                                textDayHeaderFontWeight: 'bold',
                                textDayHeaderFontSize: 16

                            }}
                        />

                        <View style={{ borderTopWidth: 2, borderColor: "#F2F2F2" }}>

                            <TouchableOpacity style={styles.borderText} >
                                <View>
                                    <Text style={styles.totaldaytext}>Total Number of working days</Text>
                                    <Text style={styles.totaldaytext}>so far</Text>
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#35365F" }}>{presentCount + absentcount + notTakenAttendanceCount} days</Text>
                            </TouchableOpacity>



                            <View style={styles.border}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: 5, backgroundColor: "#0FD893", height: 55, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}></View>
                                    <View style={styles.presenttext}>
                                        <Text style={styles.borderline}>Present</Text>
                                        <Text style={styles.borderline}>{presentCount} days</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.border}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: 5, backgroundColor: "#F63C3C", height: 55, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}></View>
                                    <View style={styles.presenttext}>
                                        <Text style={styles.borderline}>Absent</Text>
                                        <Text style={styles.borderline}>{absentcount} days</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.border}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: 5, backgroundColor: "#FF9100", height: 55, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}></View>
                                    <View style={styles.presenttext}>
                                        <Text style={styles.borderline}>No Attendance Record</Text>
                                        <Text style={styles.borderline}>{notTakenAttendanceCount} days</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>

                }
            </ScrollView>

        </View>

    )
}

const styles = StyleSheet.create({
    totaldaytext: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#263238"
    },

    borderText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 15,
        height: 55
    },

    borderline: {
        fontSize: 16,
        color: "#35365F"
    },

    border: {
        borderTopWidth: 2,
        borderColor: "#F2F2F2"
    },

    presenttext: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
        marginRight: 15,
        alignItems: "center"
    }

})


const mapStateToProps = (state) => ({
    loginData: state.mainReducer.loginData,
    activeStudents: state.mainReducer.activeStudents,
    presentCount: state.mainReducer.presentCount,
    absentcount: state.mainReducer.absentcount,
    notTakenAttendanceCount: state.mainReducer.notTakenAttendanceCount,
    attendance: state.mainReducer.attendance,

})

export default connect(mapStateToProps, { getAttendanceReport })(AttendanceReport)