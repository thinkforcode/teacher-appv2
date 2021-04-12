import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Backbar = (props) => {
    return (
        <View style={{ backgroundColor: '#fff' }}>
            <StatusBar backgroundColor="#2B454E" barStyle="light-content" />
            <View style={{ backgroundColor: "#2B454E" }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, height: 100 }}>
                    <TouchableOpacity style={{ borderRadius: 50, backgroundColor: '#37545E', opacity: .5 }} onPress={() => { props.navigation.goBack() }}>
                        <MaterialCommunityIcons name="chevron-left" color="#fff" size={24} />
                    </TouchableOpacity>

                    <View style={{ paddingLeft: 25 }}>
                        <Text style={{ fontSize: 18, color: '#fff', fontWeight: '500' }}>{props.title}</Text>
                    </View>


                </View>
            </View>
            {
                props.screen != 'Gallery' &&
                <View style={{ backgroundColor: '#37545E', height: 50, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 14 }}>Class 10th</Text>

                        <TouchableOpacity>
                            <Text>|</Text>
                        </TouchableOpacity>

                        <Text style={{ color: '#fff', fontSize: 14 }}>Section A</Text>

                    </View>
                </View>
            }


        </View>


    )
}

export default Backbar

const styles = StyleSheet.create({

})