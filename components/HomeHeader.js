import React from 'react'
import { View, Text, TouchableOpacity, StatusBar, Picker, ScrollView, Modal } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const HomeHeader = (props) => {
    return (
        <View>
            <StatusBar backgroundColor="#2B454E" barStyle="light-content" />
            <View style={{ backgroundColor: "#2B454E" }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, height: 100 }}>
                    <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 10, width: 38, height: 38, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#FFC800' }}>{props.loginData.firstName != undefined ? props.loginData.firstName.slice(0, 1) : ''}</Text>
                    </TouchableOpacity>
                    <View style={{ paddingLeft: 16, flex: 1 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>{props.loginData.firstName != undefined ? props.loginData.firstName : ''} {props.loginData.lastName != undefined ? props.loginData.lastName : ''}</Text>
                        <Text style={{ fontSize: 12, color: '#C6DBE2', paddingTop: 2 }}>{props.loginData.schoolName != undefined ? props.loginData.schoolName : 'N/A'}</Text>
                    </View>

                    <TouchableOpacity style={{ width: 26, height: 26, backgroundColor: '#fff', borderRadius: 10, justifyContent: 'center' }}>
                        <MaterialCommunityIcons name="bell" size={18} style={{ textAlign: 'center' }} color={"#FFC800"} />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{ backgroundColor: '#37545E', height: 50, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { props.openClassSectionModal(true, false) }}>
                        <Text style={{ color: '#fff', fontSize: 14 }}>Class {props.selectedClass.standard}</Text>
                        <MaterialCommunityIcons name="chevron-down" color="#83A2AC" size={24} style={{ paddingLeft: 10 }} />
                    </TouchableOpacity>


                    <TouchableOpacity>
                        <Text>|</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { props.openClassSectionModal(false, true) }}>
                        <Text style={{ color: '#fff', fontSize: 14 }}>Section {props.selectedClass.section}</Text>
                        <MaterialCommunityIcons name="chevron-down" color="#83A2AC" size={24} style={{ paddingLeft: 10 }} />
                    </TouchableOpacity>

                </View>

                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={props.isClassModal || props.isSectionModal}
                    animationType={'fade'}
                    onRequestClose={() => props.closeModal()}
                >
                    <View style={[{ backgroundColor: '#37545E', width: 200, height: 160, position: 'absolute', left: props.isClassModal ? 0 : null, right: props.isSectionModal ? 0 : null, top: 150 }]}>
                        <ScrollView style={{}}>
                            {props.isClassModal &&
                                props.classesArr.map((item, index) => (
                                    <TouchableOpacity key={index} onPress={() => props.selectClassAndSection(true, false, item)} style={{ borderBottomWidth: 1, borderBottomColor: "#2B454E", padding: 10 }}>
                                        <Text style={{ textAlign: 'center', color: '#83A2AC', fontSize: 14, fontWeight: '500' }}>{item.standard}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                            {
                                props.isSectionModal &&
                                props.sectionsArr.map((item, index) => (
                                    <TouchableOpacity key={index} onPress={() => props.selectClassAndSection(false, true, item)} style={{ borderBottomWidth: 1, borderBottomColor: "#2B454E", padding: 10 }}>
                                        <Text style={{ textAlign: 'center', color: '#83A2AC', fontSize: 14, fontWeight: '500' }}>{item.section}</Text>
                                    </TouchableOpacity>
                                ))

                            }

                        </ScrollView>

                    </View>
                </Modal>
            </View>

        </View>
    )
}

export default HomeHeader
