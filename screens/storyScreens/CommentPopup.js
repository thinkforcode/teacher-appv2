import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, Dimensions, FlatList, TextInput, KeyboardAvoidingView, Image, Animated, PanResponder } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import { connect } from 'react-redux'
// import { sendComment, getComments } from '../redux/actions/dashboardAction'
import Comment from './Comment'

const CommentPopup = (props) => {

    let onEndReachedCalledDuringMomentum = true;

    const textInputRef = useRef(null)
    const flatList = useRef(null)
    const [loginData, setLoginData] = useState({})
    const [comment, setComment] = useState('')
    const [activeData, setActiveData] = useState({})
    const { dashboardReducer, sendComment, getComments } = props
   
      const [finalComments, setFinalComments] = useState([
          {comment:"hello",displayImageUrl:"https://reactnative.dev/img/tiny_logo.png",displayName:"Sonu Singh",},
          {comment:"hello",displayImageUrl:"https://reactnative.dev/img/tiny_logo.png",displayName:"Sonu Singh",}
      ])

    let behavior = '';
    if (Platform.OS == 'ios') { behavior = 'padding' }


    const position = new Animated.ValueXY({ x: 0, y: 0 })

    const pan = PanResponder.create(
        {
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([
                null, { dx: position.x, dy: position.y }
            ],
            {useNativeDriver: false}),
            onPanResponderRelease: () => {
                position.setValue({ x: 0, y: 0 })
                props.navigation.navigate('Home')
            }
        }
    )


    // useEffect(() => {
    //     try {
    //         var unsubscribeComment
    //         const paramsData = props.route.params.data;
    //         setActiveData(paramsData)
    //         AsyncStorage.getItem('login').then((r) => {
    //             let d = JSON.parse(r)
    //             setLoginData(d)
    //             unsubscribeComment = getComments(d, 10, paramsData)
    //         }).catch((e) => { console.log(e) })
    //         return () => {
    //             unsubscribeComment
    //         }
    //     }
    //     catch (e) {
    //     }

    // }, [])



    // useEffect(() => {
    //     if (dashboardReducer.isCommented) {
    //         textInputRef.current.clear()
    //         setComment('')
    //     }
    //     return () => { }
    // }, [dashboardReducer.isCommented])


    const makeComemnt = () => {
        let d = activeData
        d['comment'] = comment
        sendComment(d, loginData)
    }



    return (
        <View style={{ flex: 1, }}>
            <View style={{ height: 20, backgroundColor: "#fff" }}></View>
            <KeyboardAvoidingView style={{ flex: 1, marginHorizontal: 15, }} behavior={behavior} >
                <Animated.View
                    // {...pan.panHandlers}
                    style={{
                        flex: 1,
                        marginTop: 10,
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10, borderBottomWidth: 1, borderColor: "#C1C6D0",
                        // transform: [
                        //     { translateY: position.y },
                        // ]
                    }}>

                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width: 100, height: 5, borderRadius: 5, backgroundColor: "#E61A50" }}></View>
                    </TouchableOpacity>

                    <View style={styles.headertext}>
                        <Image style={styles.avatar}></Image><Image style={styles.avatarone}></Image><Image style={styles.avatartwo}></Image>
                        <Text style={styles.text}>Like BY sangam or 34 others</Text>
                        <TouchableOpacity onPress = {()=>{props.navigation.goBack()}} >
                            <MaterialCommunityIcons name="arrow-right" size={16} color="#E5194F" />
                        </TouchableOpacity>
                    </View>
                    {/* {dashboardReducer.finalComments && */}
                        <FlatList
                            style={{ flex: 1 }}
                            contentContainerStyle={{ paddingBottom: 50 }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            // data={dashboardReducer.finalComments}
                            // extraData={dashboardReducer.finalComments}
                            data={finalComments}
                            ref={flatList}
                            keyboardShouldPersistTaps="always"
                            onEndReachedThreshold={0.1}
                            onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false }}
                            onContentSizeChange={() => flatList.current.scrollToEnd({ animated: true })}
                            onLayout={() => flatList.current.scrollToEnd({ animated: true })}
                            renderItem={({ item, index }) => (
                                // delete={this._deleteComment} isDeleteAlert={item.uid === this.state.loginData.parentId ? true : false} 
                                <Comment comment={item} ></Comment>
                                
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    {/* } */}

                    {/* {
                    this.state.isLoading ? this.renderLoading() :
               
                            :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Octicons name="comment-discussion" size={50} />
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'gray' }}>No Comments Yet</Text>
                                <Text>Be the first to Comment.</Text>
                            </View>
                } */}

                    
                </Animated.View>


            </KeyboardAvoidingView>
            <View style={styles.commentInputWrapper}>
                        <View style={styles.textInputWrapper}>
                            <TextInput
                                ref={textInputRef}
                                multiline={true}
                                style={styles.textInput}
                                placeholder="Write comment...."
                                onChangeText={value => setComment(value)}

                            >
                            </TextInput>
                        </View>
                        <View style={styles.iconWrapper}>
                            <TouchableOpacity onPress={() => { makeComemnt() }} disabled={comment.length > 0 ? false : true} style={styles.iconItem} >
                                <MaterialCommunityIcons name="send" size={20} color={comment.length > 0 ? "#0366d6" : 'lightgray'}></MaterialCommunityIcons>
                            </TouchableOpacity>
                        </View>
                    </View>
        </View>
    )
}

// const mapStateToProps = (state) => ({
//     dashboardReducer: state.dashboardReducer,
// })

// export default connect(mapStateToProps, { sendComment, getComments })(CommentPopup);
export default CommentPopup

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    header: {
        marginHorizontal: 10,
        backgroundColor: "#fff",
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: "#C1C6D0",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    headertext: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        borderBottomWidth:1,
        borderColor:"#C1C6D0"
    },

    keyboardAvoidingContainer: {
        height: screenHeight,
        zIndex: 2
    },

    wrapper: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '100%'
    },

    commentInputWrapper: {
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: '#ddd',
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingHorizontal: 15,
        height: 50,
        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },

    iconItem: {
        width: 30,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

    cameraIconWrapper: {
        backgroundColor: '#f2f3f5',
        borderRadius: 50,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textInputWrapper: {
        height: 40,
        borderTopLeftRadius: 48,
        borderBottomLeftRadius: 48,
        backgroundColor: '#f2f3f5',
        marginLeft: 10,
        width: screenWidth - 80 - 10,
        borderRightWidth: 0
    },

    textInput: {
        width: "100%",
        height: 40,
        paddingHorizontal: 15,
        alignItems: 'center'
    },

    iconWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderTopRightRadius: 48,
        borderBottomRightRadius: 48,
        height: 40,
        backgroundColor: '#f2f3f5',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 0
    },

    navigationStackBar: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 10
    },

    btnBack: {
        zIndex: 99
    },

    stackBarTitle: {
        position: 'absolute',
        width: screenWidth,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: 40,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        position: "absolute",
        marginLeft: 15,
        backgroundColor: "green",

    },
    avatarone: {
        width: 28,
        height: 28,
        borderRadius: 14,
        position: "absolute",
        marginLeft: 27,
        backgroundColor: "red",

    },
    avatartwo: {
        width: 28,
        height: 28,
        borderRadius: 14,
        position: "absolute",
        marginLeft: 39,
        backgroundColor: "green",

    },
    text:{
        flex: 1, fontSize: 16, color: "#35365F", paddingLeft: 52 
    }

})

