import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ClassesAssigned = () => {

    const [data, setData] = useState([
        { standerd: "11th", section: "A", subject: "All" },
        { standerd: "11th", section: "A", subject: "All" },
        { standerd: "11th", section: "A", subject: "All" },
        { standerd: "11th", section: "A", subject: "All" },
        { standerd: "11th", section: "A", subject: "All" },
        { standerd: "11th", section: "A", subject: "All" },
        { standerd: "11th", section: "A", subject: "All" },
        { standerd: "11th", section: "A", subject: "All" },
        { standerd: "11th", section: "A", subject: "All" }
    ])
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.headerStyle}>
                <MaterialCommunityIcons name="magnify" size={20} color="#35365F" />
                <Text style={styles.headingText}>Search Standerd, Section,Subect eg.10th</Text>
            </TouchableOpacity>
            <View style={styles.titleStyle}>
                <Text style={styles.titleText}>Classes Assigned</Text>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={{ marginHorizontal: 15 }}>
                        <TouchableOpacity style={styles.buttonStyle}>
                            <Text style={{ fontSize: 14, fontWeight: "bold" }}>Class Teacher</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text>Standerd : </Text>
                                <Text style={{ color: "#392C60" }}>{item.standerd} </Text>
                                <Text>Section : </Text>
                                <Text style={{ color: "#392C60" }}>{item.section} </Text>
                                <Text>Subject : </Text>
                                <Text style={{ color: "#392C60" }}>{item.subject} </Text>
                                <MaterialCommunityIcons name="chevron-double-down" size={16} color="green" />
                            </View>
                        </TouchableOpacity>
                    </View>
                )
                }
                keyExtractor={(item, index) => index.toString()}
            />
        </View>


    )
}

export default ClassesAssigned

const styles = StyleSheet.create({
    headerStyle:
    {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        borderBottomWidth: 0.5,
        borderColor: "#C1C6D0",
    },
    headingText:
    {
        paddingLeft: 4,
        fontSize: 14
    },
    titleStyle:
    {
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText:
    {
        fontSize: 14
    },
    buttonStyle:
    {
        borderWidth: 1,
        borderColor: "#f2f2f2",
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 15
    },


})