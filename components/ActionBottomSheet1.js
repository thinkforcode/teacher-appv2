import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export default function ActionBottomSheet1(props) {
    console.log("props.data", props.data)
    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                {props.data != undefined &&
                    props.data.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => { props._doAction(item) }} style={{ flexDirection: 'row', alignItems: "center", marginVertical: 10, marginHorizontal: 15, }}>
                            <View >
                                <MaterialCommunityIcons size={22} name={item.navOptionThumb} color="#E61A50" />
                            </View>
                            <View style={{ paddingLeft: 10, borderBottomWidth: .5, borderBottomColor: '#cecece', paddingBottom: 10, width: '100%' }}>
                                <Text style={styles.midbigtext}>{item.title}</Text>
                                <Text style={styles.midsmalltext}>{item.subTitle}</Text>
                            </View>

                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    midbigtext: {
        fontSize: 16,
        color: "#35365F"
    },
    midsmalltext: {
        fontSize: 12,
        color: "#35365F"
    }

})
