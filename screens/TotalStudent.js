import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ClassesAssigned = () => {

    const [data, setData] = useState([
        { name: "Deepak Singh", displayImageUrl: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", text: "Click to View Attendence report", present: "present" },
        { name: "Deepak Singh", displayImageUrl: "", text: "Click to View Attendence report" },
        { name: "Deepak Singh", displayImageUrl: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", text: "Click to View Attendence report", present: "present" },
        { name: "Deepak Singh", displayImageUrl: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", text: "Click to View Attendence report", present: "present" },
        { name: "Deepak Singh", displayImageUrl: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", text: "Click to View Attendence report", present: "absent" },
        { name: "Deepak Singh", displayImageUrl: "", text: "Click to View Attendence report" },
        { name: "Deepak Singh", displayImageUrl: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", text: "Click to View Attendence report" },
        { name: "Deepak Singh", displayImageUrl: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", text: "Click to View Attendence report" },

    ])
    return (
        <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
            <View style={{ flexDirection: "row", alignItems: "center", padding: 5, backgroundColor: "#fff", paddingHorizontal: 5 }}>
                <Text style={{ color: "#392C60" }}>All </Text>
                <Text>Standerd : </Text>
                <Text style={{ color: "#392C60" }}>10th </Text>
                <Text>Section : </Text>
                <Text style={{ color: "#392C60" }}>A </Text>
                <Text>Total Student : </Text>
                <Text style={{ color: "#392C60" }}>26 </Text>
            </View>

            <View style={{ flexDirection: "row", backgroundColor: "#f2f2f2", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialCommunityIcons name="circle" size={10} color="green" />
                    <Text style={{ paddingLeft: 10 }}>Total Prestent: </Text>
                    <Text style={{ color: "green" }}>10</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialCommunityIcons name="circle" size={10} color="red" />
                    <Text style={{ paddingLeft: 10 }}>Total Absent: </Text>
                    <Text style={{ color: "red" }}>20</Text>
                </View>

            </View>

            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 15 }}>
                        <TouchableOpacity style={{ flexDirection: "row", paddingVertical: 15, alignItems: "center", borderColor: "#C1C6D0", paddingHorizontal: 15, backgroundColor: "#fff", justifyContent: "center" }}>

                            {item.present == "present" ?
                                <View style={{ marginTop: -20, marginRight: -3 }}><MaterialCommunityIcons name="circle" size={10} color="green" /></View> :
                                <View style={{ marginTop: -20, marginRight: -3 }}><MaterialCommunityIcons name="circle" size={10} color="red" /></View>
                            }
                            {

                                item.displayImageUrl != '' ?
                                    <Image style={styles.avatar1} source={{ uri: item.displayImageUrl }}></Image>
                                    :
                                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        <Text style={styles.avatar}></Text>
                                    </View>

                            }

                            <View style={{ paddingLeft: 10 }}>
                                <Text>{item.name}</Text>
                                <Text style={{ color: "green" }}>{item.text}</Text>
                            </View>
                            <Text style={{ paddingLeft: 20 }}><MaterialCommunityIcons name="chevron-right" size={20} color="green" /></Text>
                        </TouchableOpacity>


                    </View>
                )

                }
                keyExtractor={(item, index) => index.toString()}
            />
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

export default ClassesAssigned