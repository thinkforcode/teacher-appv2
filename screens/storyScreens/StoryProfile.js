
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity, ImageBackground, StatusBar,Linking } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux';
// import { getUserPost } from '../../redux/actions/storyAction';
import { storyDate } from '../../functions/timeformat';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Autolink from 'react-native-autolink';
import { isValidUrl } from '../../functions/commonfunction'


const StoryProfile = (props) => {

    const { width } = Dimensions.get('window')
    const [loginData, setLoginData] = useState({});
    const [previewData, setpreviewData] = useState({})

    // const { getUserPost, userStory } = props

    // useEffect(() => {
    //     const paramsData = props.route.params.data;
    //     setpreviewData(paramsData)
    //     AsyncStorage.getItem('login').then((r) => {
    //         if (r != null) {
    //             let d = JSON.parse(r)
    //             setLoginData(d)
    //             getUserPost(d.userId, d.schoolId, paramsData.uid)
    //         }
    //         return () => { }
    //     }).catch((e) => { })

    // }, [])
    // console.log("userStory", userStory)

    const [story, setStory] = useState([
        { docType:"image",resourceUrl :"https://wallpapercave.com/wp/wp3190622.jpg",displayImageUrl:"https://reactnative.dev/img/tiny_logo.png",publishBy:"Rahul",displayName:"Sohan"},
        { docType:"text",message:"hello how are you ",displayImageUrl:"https://reactnative.dev/img/tiny_logo.png",publishBy:"Rahul",displayName:"Sohan"},
        { docType:"imageBackground",message:"hello how are you ",displayImageUrl:"https://reactnative.dev/img/tiny_logo.png",resourceUrl:"https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",publishBy:"Rahul",displayName:"Sohan"},
        { docType:"attachmentUrl",message:"hello how are you ",displayImageUrl:"https://reactnative.dev/img/tiny_logo.png",resourceUrl:"https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",publishBy:"Rahul",displayName:"Sohan",dataLink:"https://skugal.com/"},
        { docType:"colorBackground",color:"red",message:"hello how are you ",displayImageUrl:"https://reactnative.dev/img/tiny_logo.png",publishBy:"Rahul",displayName:"Sonu",}
        
    ])
    const _gotoStory = (item) => {
        if (item.dataLink != undefined) {
            if (isValidUrl(item.dataLink)) {
                Linking.openURL(item.dataLink).then(r => { }).catch((e => { }))
            }
            else {
                props.navigation.navigate('StoryPreview', { data: item })
            }
        }
        else {
            props.navigation.navigate('StoryPreview', { data: item })
        }
    }
    const showMenu = (item) => {
        rowRefs[item.storyId].show();
    };

    const ListHeader = (props) => {
        return (
            <View>
                <View style={{ marginTop: 20, height: 250, alignItems: "center", backgroundColor: "#F2F2F2", marginHorizontal: 15 }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('StoryProfile', { data: item }) }}>
                        {/* { previewData.displayImageUrl != '' ?
                            <Image style={styles.avatar1} source={{ uri: previewData.displayImageUrl }}></Image>
                            :
                            <View style={styles.avatar }>
                             <Text style={{color: '#fff', fontSize: 93,fontWeight: "500"}}>{previewData.displayName.charAt(0) ? previewData.displayName.charAt(0) : ''}</Text>

                          </View>
                        } */}


                             
                             
                            <View style={styles.avatar }>
                             <Text style={{color: '#fff', fontSize: 93,fontWeight: "500"}}></Text>
                              </View>
                      

                        <TouchableOpacity style={styles.camera}>
                            <MaterialCommunityIcons size={24} name="camera" color="#fff" />
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 15, color: "#35365F", textTransform: "capitalize", paddingTop: 5 }}>{previewData.displayName}</Text>
                    <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#E53563", height: 35, width: "100%", borderRadius: 10 }}>
                        <MaterialCommunityIcons size={22} name="plus-circle" color="#fff" />
                        <Text style={{ color: "#fff", fontSize: 14, paddingLeft: 2 }}>Create a Story</Text>
                    </TouchableOpacity>

                </View>
                <Text style={{ paddingTop: 23, color: "#35365F", fontSize: 18, fontWeight: "bold", paddingHorizontal: 15, backgroundColor: "#fff" }}>Stories</Text>
            </View>


        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#F2F2F2" }}>
            
            {/* { userStory && */}
                <FlatList
                    ListHeaderComponent={ListHeader}
                    contentContainerStyle={{ paddingTop: 10 }}
                    keyboardShouldPersistTaps="always"
                    keyboardDismissMode="on-drag"
                    // data={userStory}
                    data={story}
                    refreshing={true}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View style={{ ...styles.postContainer, borderBottomWidth: 1, borderColor: "#F2F2F2" }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <View style={styles.customListView}>

                                    <TouchableOpacity onPress={() => { props.navigation.navigate('StoryProfile', { data: item }) }}>
                                        {item.displayImageUrl != '' ?
                                            <Image style={{ width: 30, height: 30, borderRadius: 15, }} source={{ uri: item.displayImageUrl }}></Image>
                                            :
                                
                                            <View style={styles.avtar2}>
                                            <Text style={{color: '#fff'}}>{item.displayName[0]}</Text>
                                        </View>
                                        }

                                    </TouchableOpacity>

                                    <View style={styles.infoWrapper}>

                                        <View style={styles.namesWrapper}>
                                            {
                                                item.docType == 'video' ?
                                                    <TouchableOpacity>
                                                        <Text style={{ fontSize: 16, fontWeight: '500', textTransform: 'capitalize' }}> {item.publishBy}</Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity>
                                                        <Text style={{ fontSize: 16, fontWeight: '500', textTransform: 'capitalize', color: '#35365F' }}> {item.displayName}</Text>
                                                    </TouchableOpacity>

                                            }

                                        </View>

                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }}>
                                            <View style={styles.extraInfoWrapper}>
                                                <Text style={{ color: storyDate(item.createdAt) == 'Just now' ? 'blue' : "#C1C6D0", fontSize: 12 }}> {storyDate(item.createdAt)} ago</Text>
                                                <Text style={{ fontSize: 16, marginHorizontal: 2 }}></Text>
                                                <FontAwesome5Icon color='#C1C6D0' name="clock" />
                                            </View>

                                        </View>

                                    </View>

                                </View>

                                {
                                    loginData.parentId == item.uid &&
                                    <TouchableOpacity style={{ flex: 1, alignItems: "flex-end" }}>
                                        <MaterialCommunityIcons size={22} name="dots-vertical" color="#7D7D7D" />
                                    </TouchableOpacity>
                                }

                            </View>

                            {item.review !== 2 &&
                                <View>
                                    {item.docType == 'image' &&
                                        <View>
                                            <View style={styles.contentContainer}>
                                                <Text style={styles.paragraph}>
                                                    <Autolink text={item.message} />
                                                </Text>
                                            </View>
                                            <View>
                                                <TouchableOpacity style={styles.imageContainer} >
                                                    <Image source={{ uri: item.resourceUrl }} style={{ resizeMode: 'contain' }} style={{ width: Dimensions.get('window').width, height: 400 }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }

                                    {item.docType == 'text' &&
                                        <ImageBackground source={item.bgUrl ? { uri: item.bgUrl } : {}} style={{ ...styles.editorWrapper, backgroundColor: item.bgUrl ? '' : item.color }}>
                                            <TouchableOpacity style={{ width: '100%', justifyContent: item.isBackground != undefined ? item.isBackground ? 'center' : 'flex-start' : 'flex-start', }}>
                                                <Text style={{
                                                    fontWeight: '400', color: "#414268", fontSize: 16, fontSize: item.isBackground != undefined ? item.isBackground ? 26 : 16 : 16,
                                                    textAlign: item.isBackground != undefined ? item.isBackground ? 'center' : 'justify' : 'justify'
                                                }}>
                                                    <Autolink text={item.message} />
                                                </Text>
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    }

                                    {item.docType == 'video' &&
                                        <View>
                                            <View style={styles.contentContainer}>
                                                <Text style={styles.paragraph}>
                                                    <Autolink text={item.message} />
                                                </Text>
                                            </View>
                                        </View>
                                    }
                                    {item.docType == 'attachmentUrl' &&
                                            <View>
                                                <View style={styles.contentContainer}>
                                                    <Text style={styles.paragraph}>
                                                        <Autolink text={item.message} />
                                                    </Text>
                                                </View>
                                                <View>
                                                    {item.resourceUrl != '' &&
                                                        <TouchableOpacity style={styles.imageContainer} onPress={() => _gotoStory(item)}>
                                                            <Image source={{ uri: item.resourceUrl }} style={{ resizeMode: 'contain' }} style={{ width: Dimensions.get('window').width, height: 400 }} />
                                                        </TouchableOpacity>
                                                    }
                                                    {item.dataLink != '' && item.title != '' &&
                                                        <View style={{ elevation: 3 }}>
                                                            <TouchableOpacity style={{ backgroundColor: '#F7F8FA', padding: 10 }} onPress={() => _gotoStory(item)}>
                                                                <Text>{item.dataLink || ''}</Text>
                                                                <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', }}>{item.title || ''}</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    }

                                                </View>
                                            </View>
                                        }
                                        {item.docType == 'imageBackground' &&
                                            <TouchableOpacity onPress={() => _gotoStory(item)}>
                                                <ImageBackground source={item.resourceUrl ? { uri: item.resourceUrl } : {}} style={{ ...styles.editorWrapper, height: 350 }}>
                                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ fontWeight: '400', color: "#fff", fontSize: 26, textAlign: 'center' }}>
                                                            <Autolink text={item.message} />
                                                        </Text>

                                                    </View>
                                                    {item.tag != undefined &&
                                                        <View style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: '#E61A50', borderRadius: 10, padding: 5 }}>
                                                            <Text style={{ color: '#fff' }}>{item.tag || ''}</Text>
                                                        </View>
                                                    }
                                                </ImageBackground>
                                            </TouchableOpacity>
                                            }
                                            {item.docType == 'colorBackground' &&
                                            <TouchableOpacity onPress={() => _gotoStory(item)} style={{ ...styles.editorWrapper, backgroundColor: item.color, height: 350, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontWeight: '400', color: "#fff", fontSize: 26, textAlign: 'center' }}>
                                                    <Autolink text={item.message} />
                                                </Text>
                                                {item.tag != undefined &&
                                                    <View style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: '#E61A50', borderRadius: 10, padding: 5 }}>
                                                        <Text style={{ color: '#fff' }}>{item.tag || ''}</Text>
                                                    </View>
                                                }
                                            </TouchableOpacity>

                                        }

                                    <View style={styles.actionBtncontainer}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <TouchableOpacity  >
                                                {/* <AntDesign
                                                    size={22}
                                                    color={item.likedBy.indexOf(loginData.parentId) > -1 ? "red" : '#414268'}
                                                    name={item.likedBy.indexOf(loginData.parentId) > -1 ? "heart" : 'hearto'}
                                                /> */}

                                                    <AntDesign
                                                        size={22}
                                                        color= 'red'
                                                        name="heart"
                                                    />
                                            </TouchableOpacity >

                                            <TouchableOpacity style={{ paddingLeft: 30 }} onPress={() => { props.navigation.navigate('CommentsPopup', { data: item }) }}>
                                                <FontAwesome5Icon size={22} name="comment" color="#414268" />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{ paddingLeft: 30 }} >
                                                <MaterialCommunityIcons size={22} name="share-outline" color="#414268" />
                                            </TouchableOpacity>

                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ color: "#414268", fontSize: 14 }}>{item.commentCount ? item.commentCount : 0} Comments .</Text>
                                            <Text style={{ color: "#414268", fontSize: 14, paddingLeft: 5 }}>1 Share</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center", marginBottom: 5 }} onPress={() => { props.navigation.navigate('PeopleLike', { data: item }) }}>
                                        <Text style={{ justifyContent: "center", alignItems: "center", paddingLeft: 10 }}>
                                            {/* {item.likedBy.length > 0 &&
                                                <Text style={{ color: "#C1C6D0", fontSize: 14, }}> Like by </Text>
                                            }
                                            {(item.likedBy.indexOf(loginData.parentId) > -1) &&
                                                <Text style={{ color: "#C1C6D0", fontSize: 14 }}>you</Text>
                                            }
                                            {item.likedBy.length > 0 &&
                                                <Text style={{ color: "#C1C6D0", fontSize: 14 }}> {(item.likedBy.length > 0 && item.likedBy.indexOf(loginData.parentId) > -1) ? `and ${item.likedBy.length - 1} others` : `${item.likedBy.length} others`}</Text>
                                            } */}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            <View>
                                {item.review == 2 &&
                                    <View style={{ backgroundColor: '#fff', }}>
                                        <MaterialCommunityIcons name="eye-off" style={{ textAlign: 'center' }} color="#000" size={40} />
                                        <Text style={{ fontWeight: '400', color: 'darkgray', fontSize: 18, paddingHorizontal: 20, paddingBottom: 30, textAlign: 'center' }}>
                                            This Post has been removed due to voilation of Skugal Policy
                                     </Text>
                                    </View>
                                }
                            </View>
                        </View>

                    )}
                    keyExtractor={(item, index) => `${index.toString()}`}
                />
            {/* } */}



        </View>

    )
}
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  
    avatar: {
        backgroundColor: '#F57B2D',
        width: 152,
        height: 152,
        borderRadius: 152 / 2,
       justifyContent:"center"  ,
       alignItems:"center" 
    },

    avatar1: {
        width: 152,
        height: 152,
        borderRadius: 152 / 2,
    },

    camera: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#E61A50",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 10,
        right: 10
    },
    
    avtar2:
    {
        backgroundColor: '#E61A50',
        width: 30,
        height: 30,
        borderRadius: 15,
       justifyContent:"center",
       alignItems:"center",
        
        
    },
    avtar3: {
        width: 20,
        height: 20,
        borderRadius: 10,
        position: "absolute",
        bottom: -10
    },
    avtar4: {
        backgroundColor: '#E61A50',
        width: 20, height: 20,
        borderRadius: 10,
        textAlign: 'center',
        color: '#fff',
        position: "absolute",
    },
    contentContainer: {
        paddingHorizontal: 10,
        paddingBottom: 5
    },
    postContainer: {
        backgroundColor: 'white',
        paddingVertical: 15,
    },

    customListView: {
        paddingHorizontal: 10,
        width: screenWidth - 40,
        flexDirection: 'row',

    },

    infoWrapper: {
        marginLeft: 0
    },

    namesWrapper: {
        flexDirection: 'row',
        alignItems: 'center',


    },

    paragraph: {
        color: '#000',
    },
    imageContainer: {
        marginTop: 5,
        width: Dimensions.get('window').width
    },
    editorWrapper: {
        overflow: 'hidden',
        paddingTop: 10,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    extraInfoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    actionBtncontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginHorizontal: 15,
        paddingVertical: 10
    },

})

// const mapStateToProps = (state) => ({
//     userStory: state.storyReducer.userStory,
// })

// export default connect(mapStateToProps, { getUserPost })(StoryProfile);

export default StoryProfile