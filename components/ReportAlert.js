import React from 'react'
import { View, Modal, Dimensions, Image, TouchableOpacity, ImageBackground, StyleSheet, Text, ScrollView } from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { reportData } from '../classData.js'


const ReportAlert = (props) => {
    return (
        <Modal
            onRequestClose={() => { props.setModalVisible(false) }}
            visible={props.isVisiblePopUp} >
                <View style = {{flexDirection:'row', borderBottomColor:'#cecece', borderBottomWidth:1, padding:10, justifyContent:'space-around', alignItems:'center'}}>
                     <Text></Text>
                      <Text style = {{textAlign:'center'}}>Report</Text>
                    <TouchableOpacity onPress = {()=>{props.setModalVisible(false)}}>
                       <MaterialCommunityIcons name = "close" color = "red" size = {22}  />
                    </TouchableOpacity>

                </View>
              <View style={{  marginHorizontal: 15,}}>
                <View  style={{ marginTop:30 }}>
                <MaterialCommunityIcons name = "alert" color = "red" size = {22} />
                <Text style = {{fontSize:18, color:'#000', fontWeight:'700'}}>Please select a problem</Text>
                <Text>If someone post is not good, get help before reporting to Skugal. Donn't wait.</Text>
                </View>

                <View style = {{flexDirection:'row', flexWrap:'wrap',}}>
                    { reportData &&
                        reportData.map((item, index) => (
                            <TouchableOpacity onPress = {()=>{props._selectReasons(item)}}  key={index} style={{padding:5, marginRight:5,  backgroundColor:'#cecece', borderRadius:20, flexDirection: 'row', alignItems: "center", marginVertical: 10, }}>
                                    <Text style={styles.text}>{item}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>

            <View style = {{position:'absolute',  bottom:10, width:'100%' ,  borderTopColor:'#cecece', borderTopWidth:1, padding:5}}>
            <TouchableOpacity onPress = {()=>{_doAction()}} style = {{backgroundColor:props.isReportBtn?'lightgrey':'#E53563', padding:10, width:'90%', marginLeft:10}} disabled = {props.isReportBtn}>
                <Text style = {{textAlign:'center', color:'#fff'}}>Report</Text>
            </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default ReportAlert

const styles = StyleSheet.create({
    text: {
        color:'#000', 
        fontWeight:'600',
        fontSize:16
   
    },

})
