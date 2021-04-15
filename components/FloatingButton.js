import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const FloatingButton = (props) => {
    return (
        <View>

            <TouchableOpacity style={styles.floatingBtn} onPress={() => { props.doAction()}}>
                <MaterialCommunityIcons name={props.iconName} size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

export default FloatingButton

const styles = StyleSheet.create({
    floatingBtn: {
        position: "absolute",
        bottom: 10,
        right: 10,
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2B454E"
    }

})
