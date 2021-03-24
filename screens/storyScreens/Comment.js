import React, { useState, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, } from 'react-native'
import { storyDate } from '../../functions/timeformat'



const Comment = (props) => {
     const { comment } = props;

    // const [comment,setComment] = useState([
    //     {displayImageUrl:"https://reactnative.dev/img/tiny_logo.png",displayName:"Sonu Singh",comment:"welcome"},
        
    // ])
    
    return (     
         <View style={styles.container}>
             <TouchableOpacity style={styles.datatext}>
            <Image style={styles.avatar} source={{ uri: comment.displayImageUrl }}></Image>
            <View style={styles.centerContainer} onLongPress={() => { props.isDeleteAlert ? props.delete(comment) : '' }} >
               <Text style={styles.name}>{comment.displayName}</Text>
                    <Text style={styles.content}>{comment.comment}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.createAt]}>{storyDate(comment.createdAt)}{'    '}
                        <Text>Like</Text>
                    </Text>
                    <Text style={{ fontSize: 13, color: "#C1C6D0",paddingRight:10 }}><MaterialCommunityIcons name="heart" size={13} color="#FF3636" /></Text>
                </View>

            </View>

        </TouchableOpacity>
         </View>
        
        
        

    )
}

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginHorizontal:15,
        backgroundColor:"#fff"
    },

    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        
    },
    datatext:{
        flexDirection: "row",
       
        paddingTop:20,
        paddingBottom:10
    },
    

    centerContainer: {
        width: screenWidth * 0.7,
        borderBottomWidth:0.5,
        borderColor:"#ECF0F8" ,
    },

    name: {
        fontWeight: '500',
        fontSize: 16,
        color: '#35365F',
        paddingLeft:5
    },

    content: {
        color: '#414268',
        fontSize: 14,
        paddingLeft:5
    },

    image: {
        borderRadius: 10
    },

    toolContainer: {
        flexDirection: 'row',
        width: 0.4 * screenWidth,

    },
    createAt: {
        flex: 1,
        fontSize: 13,
        color: "#C1C6D0",
        paddingLeft:5
    },
    likeBtn: {
        textAlign: 'center',
        flex: 1
    },
    replyBtn: {
        textAlign: 'center',
        flex: 1
    },
    text: {
        color: "#35365F",
        fontSize: 18,
        paddingLeft: 10,
        paddingTop: 18
    },

    
})



export default Comment