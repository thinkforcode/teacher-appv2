import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const CustomButton = (props) => {
    return (
        <TouchableOpacity style={[props.button]} onPress={() => { props._doAction() }} >
            <Text style={props.buttonText}>{props.title}</Text>
            <View>
                {
                    props.screen == 'Login' &&
                    <View style={{ backgroundColor: "#fff", opacity: 0.4, justifyContent: "center", alignItems: "center", width: 20, height: 20, borderRadius: 10, marginRight: 20 }}>
                        <MaterialCommunityIcons name="chevron-right" color="#fff" size={18} />
                    </View>

                }
            </View>

        </TouchableOpacity>
    )
}

export default CustomButton
