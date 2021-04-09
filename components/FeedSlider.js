import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const FeedSlider = () => {

    const [image, setImage] = useState([
        { displayImageUrl: "", profileName: 'rahul singh' },
        { displayImageUrl: "https://reactnative.dev/img/tiny_logo.png", profileName: 'rahul singh' },
        { displayImageUrl: "", profileName: 'rahul singh' },
        { displayImageUrl: "https://reactnative.dev/img/tiny_logo.png", profileName: 'rahul singh' },

    ])

    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {image &&
                image.map((item, index) => (
                    <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}>
                        {item.displayImageUrl != '' ?
                            <Image style={{ width: 70, height: 70, borderRadius: 35, marginLeft: 15 }} source={{ uri: item.displayImageUrl }}></Image>
                            :
                            <View style={{ width: 70, height: 70, backgroundColor: "#EE9BA5", borderRadius: 35, alignItems: "center", justifyContent: "center", marginLeft: 15 }}>
                                <Text style={{ fontSize: 22, fontWeight: "500", color: "#fff", textTransform: "capitalize" }}>{item.profileName[0]}</Text>
                            </View>
                        }
                <Text style={{ fontSize: 12, fontWeight: "500", color: "#263238", paddingLeft: 15, paddingTop: 5 }}>{item.profileName}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default FeedSlider

const styles = StyleSheet.create({})
