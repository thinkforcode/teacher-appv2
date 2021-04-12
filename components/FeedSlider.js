
import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';


export default function (props) {
    return (
        <TouchableOpacity key = {props.ind} onPress={() => props.openSotry(props.item, props.ind)}>
            { props.item.docType == 'image' && props.item.resourceUrl != "" && props.item.review !== 2 &&
                <View style = {{ marginLeft:16}}>
                    <Image source={{ uri: props.item.resourceUrl }} style={{ width: 76, height: 76, borderRadius: 38, borderColor:'#2B454E', borderWidth:1 }} />
                    <Text style = {{fontSize:12, color:'#263238'}}>{props.item.displayName || 'N/As'}</Text>
                </View>

            }
        </TouchableOpacity>


    );
};

const styles = StyleSheet.create({
    textStyle: {
        color: '#35365F',
        fontWeight: '500',
        textTransform: 'capitalize',
        paddingTop: 20,
        fontSize: 12,
        textAlign: 'center'
    },

})