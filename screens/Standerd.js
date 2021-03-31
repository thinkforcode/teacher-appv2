import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Standerd = () => {


    const [logo, setLogo] = useState([
        { resourceUrl: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", title: "Your Schedule" },
        { resourceUrl: "https://reactnative.dev/img/tiny_logo.png", title: "Assignment" },
        { resourceUrl: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", title: "Test" },
        { resourceUrl: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", title: "Result" },
        { resourceUrl: "https://reactnative.dev/img/tiny_logo.png", title: "Photo Gallery" },
        { resourceUrl: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", title: "Send Message" },
        { resourceUrl: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", title: "Online Class" },
        { resourceUrl: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", title: "Gate Pass" },
        { resourceUrl: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", title: "Complain" },
    ])


    return (
        <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 5, paddingHorizontal: 5 }}>
                <MaterialCommunityIcons name="lightbulb-on" size={18} color="#000" />
                <Text style={{ color: "#392C60" }}> All </Text>
                <Text>Standerd : </Text>
                <Text style={{ color: "#392C60" }}>10th </Text>
                <Text>Section : </Text>
                <Text style={{ color: "#392C60" }}>A </Text>
            </View>
            <FlatList
                data={logo}
                extraData={logo}
                keyExtractor={(item, index) => { return index.toString(); }}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={{ alignItems: "center", width: width / 3, }}>
                            <View style={{ backgroundColor: "#fff", alignItems: "center", width: width / 3, paddingVertical: 15, borderWidth: 2, borderColor: "#f2f2f2" }}>
                                <Image style={{ width: 54, height: 54, borderRadius: 27 }}
                                    source={{ uri: item.resourceUrl }} />
                                <Text style={{ flex: 1, fontSize: 12, fontWeight: "bold", paddingTop: 10 }}>{item.title} </Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                numColumns={3} />
        </View>

    )
}
const width = Dimensions.get('window').width
const numColumns = 3;
const size = (Dimensions.get('window').width) / numColumns;

export default Standerd


const styles = StyleSheet.create({




})