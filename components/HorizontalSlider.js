
import React from 'react';
import {Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const HorizontalSlider = (props) => {
    return (
        <TouchableOpacity onPress={() => props.openScreen(props.item)} style={[styles.shadoBox]}>
            { (props.type == "news" || props.type == "tutorial") ? <Image source={{ uri: props.item.imageUrl }} resizeMode="contain" style={{ alignSelf: 'center', width:45, height:34 }} /> :
                <Image source={props.item.imageUrl} resizeMode="contain" style={{ alignSelf: 'center', width:45, height:34 }} />
            }
            
            { <Text style={{ color: '#35365F', fontSize: 10, fontWeight: 'bold', textAlign: 'center', paddingTop:10, width:70}}>{props.type == "tutorial" ? props.item.category : props.item.title}</Text> }
        </TouchableOpacity>


    )
}


const numColumns = 4;
const size = (Dimensions.get('window').width) / numColumns;

const styles = StyleSheet.create({
    shadoBox: {
        width: size,
        padding: 20,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default HorizontalSlider