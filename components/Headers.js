import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'

import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'

export default function Headers(props) {
    return (
        <SafeAreaView style={{ height: 60, backgroundColor: '#E61A50', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                {
                    ( props.screen != 'ChatList' && props.screen != 'FeePayment' && props.screen != 'Chat' && props.screen != 'Settings' && props.screen != 'Notification' && props.screen != 'AttendanceReport') &&
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                        <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
                    </TouchableOpacity>
                }
                {
                    (props.screen == "Notification") &&
                    <View>
                        {props.selectedCount > 0 ?
                            <TouchableOpacity onPress={() => { props.resetNotification() }}>
                                <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                                <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
                            </TouchableOpacity>
                        }

                    </View>
                }

                {
                    props.screen == "Chat" &&
                    <View>
                        {props.selectedCount > 0 ?
                            <TouchableOpacity onPress={() => { props.resetSelectedChat() }}>
                                <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
                            </TouchableOpacity> :

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                                    <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
                                </TouchableOpacity>

                                <TouchableOpacity style={{ backgroundColor: '#FCA40C', marginLeft: 10, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: '#fff', fontSize: 17 }}>{props.name ? props.name.charAt(0).toUpperCase() : ''}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 18, color: '#FFFFFF' }}>{props.title}</Text>
                                    <Text style={{ fontSize: 9, color: '#fff' }}>Last seen today at 1:26 PM</Text>
                                </TouchableOpacity>

                            </View>


                        }

                    </View>
                }

                {props.screen != "Chat" &&
                    <View>
                        {
                            (props.screen == "Notification" && props.selectedCount > 0) ?
                                <Text style={{ fontSize: 18, color: '#FFFFFF', marginLeft: 24 }}>{props.selectedCount}</Text>
                                :
                                <Text style={{ fontSize: 18, color: '#FFFFFF', marginLeft: 24 }}>{props.title}</Text>

                        }
                    </View>
                }

                {(props.screen == "Chat" && props.selectedCount > 0) &&
                    <View>
                        <Text style={{ fontSize: 18, color: '#FFFFFF', marginLeft: 24 }}>{props.selectedCount}</Text>
                    </View>
                }

                {
                    props.screen == "Preview" &&
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', backgroundColor: '#fff', opacity: .4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 }}>
                            <TouchableOpacity onPress={() => props.download()}><Feather name="download" size={28} color="#fff" /></TouchableOpacity>
                            <TouchableOpacity onPress={() => props.share()} style={{ marginLeft: 20 }}><Feather name="share-2" size={28} color="#fff" /></TouchableOpacity>
                        </View>
                    </View>

                }

                {
                    props.screen == "UserIntrest" &&
                    <TouchableOpacity onPress={() => { props._doAction(props.item) }} style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: '#fff', alignSelf: 'flex-end' }}>{props.btnText}</Text>
                    </TouchableOpacity>
                }

                {(((props.screen == 'Notification' || props.screen == 'Chat') && props.selectedCount > 0)) &&
                    <TouchableOpacity onPress={() => { props._delete(props.item) }} style={{ flex: 1 }}>
                        <MaterialCommunityIcons
                            style={{ fontSize: 18, color: '#fff', alignSelf: 'flex-end' }}
                            name="delete"
                            size={22}
                            color='#fff'
                        />
                    </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    )
}


