import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Support = (props) => {
    return (
        
        <View style={{flex:1}}>
            <View style={{ flex:1,justifyContent:"center",alignItems:"center"}}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <MaterialCommunityIcons name="phone" size={18} color="#000" />
                <Text style={{fontSize:18,fontWeight:"bold"}}> 8882218182 </Text>
                </View>
                <Text style={{paddingTop:15}}>Or</Text>
                <Text>Email your query at</Text>
                <Text style={{fontSize:18,paddingTop:15,fontWeight:"bold"}}> Support@skugal.com </Text>
            </View>
        </View>
    )
}

export default Support

const styles = StyleSheet.create({




})