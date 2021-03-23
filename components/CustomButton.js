import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
 import LinearGradient from 'react-native-linear-gradient';

const CustomButton = (props) => {
    return (
        <TouchableOpacity style={props.button} onPress={() => { props._doAction() }} >
            <Text style={props.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton
