
import { View, Text,ScrollView,Dimensions,TouchableOpacity,StyleSheet, Image,FlatList} from 'react-native'
import Headers from '../components/Headers'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState} from 'react'

 const width=Dimensions.get('window').width
const ConfirmAttendance = (props) => {

    const [image, setImage] = useState([
        {resourceUrl :"https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",name:"Sonu singh"},
        {resourceUrl :"https://reactnative.dev/img/tiny_logo.png",name:" singh"},
        {resourceUrl :"https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",name:"Sonu "},
        {resourceUrl :"https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",name:"Rahul singh"},
        {resourceUrl :"https://reactnative.dev/img/tiny_logo.png",name:"Deepak"},
        {resourceUrl :"https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",name:"Deepak"},
        {resourceUrl :"https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",name:"Sonu "},
        {resourceUrl :"https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",name:"Rahul singh"},
      
        
    ])

    
    return (
        <View style={{flex:1,backgroundColor:"#fff"}}>
             <Headers {...props} title={`Confirm Attendence`} screen="ConfirmAttendence" />
             <View style={{ backgroundColor: '#fff' }}>
                  <View style={{padding:10,backgroundColor:"#f2f2f2"}}>
                      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                          <View style={{flexDirection:"row"}}>
                               <View style={{width:20,height:20,borderRadius:10,justifyContent:"center",alignItems:"center",backgroundColor:"green"}}>
                               <MaterialCommunityIcons size={18} name="check" color="#fff" />
                               </View>
                               <Text style={{paddingLeft:10}}>Present Student</Text>
                               </View>
                               <View style={{flexDirection:"row"}}>
                               <View style={{width:20,height:20,borderRadius:10,justifyContent:"center",alignItems:"center",backgroundColor:"red"}}>
                               <MaterialCommunityIcons size={18} name="check" color="#fff" />
                               </View>
                               <Text style={{paddingLeft:10}}>Absent Student</Text>
                          </View>
                          
                      </View>
                      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                          <View style={{flexDirection:"row"}}>
                              <Text style={{paddingLeft:30}}>Total Parents:</Text>
                              <Text style={{color:"green"}}>10</Text>
                          </View>
                          <View style={{flexDirection:"row"}}>
                              <Text >Total Absent:</Text>
                              <Text style={{color:"red"}}>16</Text>
                          </View>
                      </View>
                      <Text style={{fontWeight:"bold"}}>Switch To Take Attendence Offline</Text>
                  </View>
                              <FlatList
                        contentContainerStyle={{ paddingBottom: 50, marginHorizontal: 5, marginTop: 5 }}
                          data={image}
                        extraData={image}
                        keyExtractor={(item, index) => { return index.toString(); }}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{flex:1,alignItems:"center",width:width/4,paddingVertical:10}}>
                                 <View style={{flexDirection:"row",alignItems:"center"}}>
                                 <Image style={{ width: 54, height: 54, borderRadius: 27 }}
                                  source={{uri:item.resourceUrl}}
                                />
                            <View style={{marginLeft:-5,marginTop:-25}}> 
                           <View style={{width:14,height:14,borderRadius:7,justifyContent:"center",alignItems:"center",backgroundColor:"green"}}>
                               <MaterialCommunityIcons size={12} name="check" color="#fff" />
                               </View></View> 
                                 </View>
                              <Text style={{flex:1}}>{item.name} </Text>
                             </View>

                            )
                        }}
                        numColumns={4} />
                
                       

                   

                

            </View>
         
        </View>
    )
}

const numColumns = 4;
const size = (Dimensions.get('window').width ) / numColumns;

const styles = StyleSheet.create({
    itemContainer: {
        width: size,
    },
   
 image:
 {
    // resizeMode: 'contain',
     width: 108,
      height: 108,
            borderRadius:54,
       marginVertical: 5,
        marginHorizontal:5,
         
 }

})

export default ConfirmAttendance
