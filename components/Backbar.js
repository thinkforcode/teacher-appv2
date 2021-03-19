import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
 import { LinearTextGradient } from "react-native-text-gradient";

const Backbar = (props) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            {
                props.screen == "Login" ?
                    <TouchableOpacity style={styles.circle} onPress={() => { props.close() }}>
                        <LinearTextGradient
                            style={{ textAlign: 'center', fontSize: 16, fontWeight: '500' }}
                            locations={[0, 1]}
                            colors={["#FD4783", "#FF9B7B"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <MaterialCommunityIcons name="close" size={22} />
                        </LinearTextGradient>
                    </TouchableOpacity> :
                    <TouchableOpacity style={styles.circle} onPress={() => { props.navigation.goBack() }}>
                        <LinearTextGradient
                            style={{ textAlign: 'center', fontSize: 16, fontWeight: '500' }}
                            locations={[0, 1]}
                            colors={["#FD4783", "#FF9B7B"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <MaterialCommunityIcons name="chevron-left" size={22} />
                        </LinearTextGradient>
                    </TouchableOpacity>
            }
            <LinearTextGradient
                style={{ textAlign: 'center', fontSize: 22, fontWeight: '600', }}
                locations={[0, 1]}
                colors={["#FD4783", "#FF9B7B"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text>{props.title}</Text>
            </LinearTextGradient>

            <TouchableOpacity onPress={() => { props._doAction(props.item) }}>
                <LinearTextGradient
                    style={{ textAlign: 'center', fontSize: 22, fontWeight: '600', }}
                    locations={[0, 1]}
                    colors={["#FD4783", "#FF9B7B"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text>{props.btnText}</Text>
                </LinearTextGradient>
            </TouchableOpacity>
        </View>

    )
}

export default Backbar

const styles = StyleSheet.create({
    circle: {
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 8,
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.12,
        shadowRadius: 60,
    }
})
