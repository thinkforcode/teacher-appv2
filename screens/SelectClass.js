import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'
import { getClass, selectClass } from '../redux/actions/mainActions';


const SelectClass = (props) => {
    const { getClass, classes, selectClass, loginData } = props

    useEffect(() => {
        console.log("loginData", loginData)
        if(loginData!= null){
             getClass(loginData.userId, loginData.schoolId, loginData.teacherId)
        }
        return () => { }
    }, [])

    const _selectClass = (item) => {
        selectClass(item)
    }

    console.log("classes", classes, loginData)


    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.headerStyle}>
                <MaterialCommunityIcons name="magnify" size={20} color="#35365F" />
                <Text style={styles.headingText}>Search Standerd, Section,Subect eg.10th</Text>
            </TouchableOpacity>
            <View style={styles.titleStyle}>
                <Text style={styles.titleText}>Classes Assigned</Text>
            </View>
            {classes.length > 0 &&
                <FlatList
                    data={classes}
                    extraData={classes}
                    renderItem={({ item }) => (
                        <View style={{ marginHorizontal: 15 }}>
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => { _selectClass(item) }}>
                                <Text style={{ fontSize: 14, fontWeight: "bold" }}>Class Teacher</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text>Standerd : </Text>
                                    <Text style={{ color: "#392C60" }}>{item.standard} </Text>
                                    <Text>Section : </Text>
                                    <Text style={{ color: "#392C60" }}>{item.section} </Text>
                                    <Text>Subject : </Text>
                                    <Text style={{ color: "#392C60" }}>{item.subject ? item.subject : "No Subject"} </Text>
                                    <MaterialCommunityIcons name="chevron-double-down" size={16} color="green" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                    }
                    keyExtractor={(item, index) => index.toString()}
                />

            }

            {
                classes.length == 0 &&
                <Text style={{ color: 'red', textAlign: 'center', paddingTop: 100 }}>No classes available now !</Text>
            }

        </View>


    )
}



const styles = StyleSheet.create({
    headerStyle:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        borderBottomWidth: 0.5,
        borderColor: "#C1C6D0",
    },

    headingText:{
        paddingLeft: 4,
        fontSize: 14
    },

    titleStyle:{
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center"
    },

    titleText:{
        fontSize: 14
    },
    
    buttonStyle:{
        borderWidth: 1,
        borderColor: "#f2f2f2",
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 15
    },


})

const mapStateToProps = (state) => ({
    loginData:state.mainReducer.loginData,
    classes: state.mainReducer.classes,
})

export default connect(mapStateToProps, { getClass, selectClass })(SelectClass);

