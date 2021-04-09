import React from 'react'
import { View, Text, TouchableOpacity, StatusBar, Picker } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const HomeHeader = (props) => {
    return (
        <View>
            <StatusBar backgroundColor="#2B454E" barStyle="light-content" />
            <View style={{ backgroundColor: "#2B454E" }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, height: 100 }}>
                    <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 10, width: 38, height: 38, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#FFC800' }}>{props.loginData.firstName?.slice(0, 1)}</Text>
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

            <View style={{ backgroundColor: '#37545E' , height:50, justifyContent:'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems:'center' }}>
                    <TouchableOpacity style = {{flexDirection:'row', alignItems:'center'}} onPress = {()=>{props.openClassAndSection()}}>
                        <Text style = {{color:'#fff', fontSize:14}}>Class {props.selectedClass.standard}</Text>
                        <MaterialCommunityIcons name = "chevron-down" color = "#83A2AC" size = {24}  style = {{paddingLeft:10}} />

                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text>|</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {{flexDirection:'row', alignItems:'center'}} onPress = {()=>{props.openClassAndSection()}}>
                        <Text style = {{color:'#fff', fontSize:14}}>Section {props.selectedClass.section }</Text>
                        <MaterialCommunityIcons name = "chevron-down" color = "#83A2AC" size = {24} style = {{paddingLeft:10}} />

                    </TouchableOpacity>
                    {/* <View style={{ flex: 1 }}>
                        <Picker
                            style={{ color: '#fff' }}
                            mode="dropdown"
                            selectedValue={props.selectedClass.standard}
                            onValueChange={props.selectStandard}
                        >
                            <Picker.Item label={ 'Standard '} />
                            { props.classesArr.map((item, index) => (
                                    <Picker.Item key={index} label={item.standard} value={item.standard} style={{ color: '#fff' }} />
                                ))

                            }
                        </Picker>
                    </View> */}

                    {/* <View style={{ flex: 1 }}>
                        <Picker
                            style={{ color: '#fff' }}
                            mode="dropdown"
                            selectedValue={props.selectedClass.section }
                            onValueChange={props.selectSection}
                        >
                            <Picker.Item label="Select Section" />
                            { props.sectionsArr.map((item, index) => (
                                    <Picker.Item key={index} label={item.section} value={item.section} style={{ color: '#fff' }} />
                                ))

                            }
                        </Picker>
                    </View> */}


                </View>
            </View>




        </View>
    )
}

export default HomeHeader
