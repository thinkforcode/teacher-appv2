import React, { useState, useEffect, useRef } from 'react'
import { Text, TouchableOpacity, View, Image, StyleSheet, Dimensions, Clipboard } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageZoom from 'react-native-image-pan-zoom';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
// import { like } from '../../redux/actions/storyAction';
// import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionBottomSheet1 from '../../components/ActionBottomSheet1';
import { StoryPreviewOptions } from '../../classData.js'
import RBSheet from 'react-native-raw-bottom-sheet';
import ReportAlert from '../../components/ReportAlert';
import { Toast } from '../../functions/commonfunction';


const StoryPreview = (props) => {
    const { like } = props
    const [previewData, setpreviewData] = useState({})
    const [showOptions, setShowOptions] = useState(false)
    const [loginData, setLoginData] = useState({})
    const refRBSheet = useRef()
    const [isVisiblePopUp, setIsVisiblePopUp] = useState(false)
    const [isReportBtn, setIsReportBtn] = useState(true)

    // useEffect(() => {
    //     const paramsData = props.route.params.data;
    //     setpreviewData(paramsData)
    //     return () => { }
    // }, [])



    // useEffect(() => {
    //     AsyncStorage.getItem('login').then((r) => {
    //         if (r != null) {
    //             let d = JSON.parse(r)
    //             setLoginData(d)
    //         }
    //         return () => { }
    //     }).catch((e) => { })

    // }, [])

    const showHideOptions = () => {
        setShowOptions(!showOptions)
    }


    const likePost = (item) => {
        let data = {...previewData}
        let i = data.likedBy.indexOf(loginData.parentId)
        if(i > -1){
            data.likedBy.splice(loginData.parentId)
        }
        else {
            data.likedBy.push(loginData.parentId)
        }
        setpreviewData({ ...data })
        like(loginData, item)
    }

   const closeModal = (visible) => {
       setIsVisiblePopUp(visible)
      }

      const perfomAction = (item) =>{
        refRBSheet.current.close()
          if(item.screen == "ReportAlert"){
            setIsVisiblePopUp(!isVisiblePopUp)
          }
          else if(item.screen ==  'CopyLink' && (previewData.docType == "image" || previewData.docType == "pdf")){
            Clipboard.setString(previewData.resourceUrl)
            Toast('Copied successfully')

          }
          else {

          }

      }

      const selectReasons = (item) => {
          console.log("item is", item)

      }


    return (
        <View style={{ flex: 1 }}>
            {/* { isVisiblePopUp &&
                    <ReportAlert _selectReasons = {selectReasons}  {...props} isModalVisible={isVisiblePopUp} isReportBtn = {isReportBtn}  setModalVisible={closeModal}/>
            } */}
            {/* { previewData.docType == 'image' && */}
                <View style={{ backgroundColor: '#000' }}>

                    <ImageZoom onClick={() => { showHideOptions() }}
                        cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={Dimensions.get('window').width}
                        imageHeight={Dimensions.get('window').height}
                        minScale={1}
                    >

                        <Image
                            style={{ height: null, width: null, flex: 1, resizeMode: 'contain' }}
                            // source={{ uri: previewData.imageUrl ? previewData.imageUrl : previewData.resourceUrl }} />
                            source={{ uri: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}} />
                        {!showOptions &&
                            <TouchableOpacity style={styles.header} onPress={() => refRBSheet.current.open()}>
                                <MaterialCommunityIcons size={25} name="dots-vertical" color="#fff" />
                            </TouchableOpacity>
                        }

                        {!showOptions &&
                            <View style={styles.footer}>
                                {
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 10 }}>
                                        <TouchableOpacity onPress={() => { props.navigation.navigate('PeopleLike', { data: previewData }) }}>
                                            <Text style={{ justifyContent: "center", alignItems: "center", }}>
                                                {/* {previewData.likedBy.length > 0 &&
                                                    <Text style={{ color: "#fff", fontSize: 14 }}>#Like by </Text>
                                                }
                                                {(previewData.likedBy.indexOf(loginData.parentId) > -1) &&
                                                    <Text style={{ color: "#fff", fontSize: 14 }}>you</Text>
                                                }
                                                {previewData.likedBy.length > 0 &&
                                                    <Text style={{ color: "#fff", fontSize: 14 }}> {(previewData.likedBy.length > 0 && previewData.likedBy.indexOf(loginData.parentId) > -1) ? `and ${previewData.likedBy.length - 1} others` : `${previewData.likedBy.length} others`}</Text>
                                                } */}
                                            </Text>
                                        </TouchableOpacity>
                                        {/* <Text style={{ color: "#fff", fontSize: 14 }}>{previewData.commentCount ? previewData.commentCount : 0} Comments </Text> */}
                                        {/* <Text style={{ color: "#fff", fontSize: 14 }}>{previewData.commentCount ? previewData.commentCount : 0} Comments </Text> */}
                                    </View>
                                }
                                {/* <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 10, borderTopColor: '#cecece', borderTopWidth: 0.5, justifyContent: "space-around" }}>
                                    <TouchableOpacity onPress={() => { likePost(previewData) }}>
                                        <AntDesign size={18} color={previewData.likedBy.indexOf(loginData.parentId) > -1 ? "red" : '#fff'} name={previewData.likedBy.indexOf(loginData.parentId) > -1 ? "heart" : 'hearto'}> Like</AntDesign>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => { props.navigation.navigate('CommentsPopup', { data: previewData }) }} >
                                        <FontAwesome5Icon size={18} name="comment" color="#fff" > Comment</FontAwesome5Icon>
                                    </TouchableOpacity>

                                </View> */}

                            </View>
                        }

                    </ImageZoom>
                </View>
            {/* } */}

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={170}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent",
                    },
                    container: {
                        // position: 'absolute',
                        // bottom: 70,
                    },
                    draggableIcon: {
                        backgroundColor: "#000",
                        borderRadius: 10,
                        width: 80
                    }
                }}
            >
                <ActionBottomSheet1 {...props} data={StoryPreviewOptions}  _doAction={perfomAction} />

            </RBSheet>

        </View>
    );
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#404040",
        width: 30,
        height: 30,
        borderRadius: 15,
        position: 'absolute',
        right: 15,
        top: 15,
        justifyContent: 'center',
        alignItems: 'center'

    },

    footer: {
        position: 'absolute',
        left: 15,
        right: 15,
        bottom: 15,
    },

    button: {
        width: 100,
        height: 40,
        backgroundColor: "#404040",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5
    },
    text: {
        alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff"
    }
})


// const mapStateToProps = (state) => ({
//     storyReducer: state.storyReducer,
// })

// export default connect(mapStateToProps, { like })(StoryPreview);

export default StoryPreview