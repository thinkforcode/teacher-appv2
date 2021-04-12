import firestore from '@react-native-firebase/firestore';
import { Vibration, } from 'react-native';
import { guidGenerator, Toast } from '../../functions/commonfunction';
import { store } from '../store';
import * as RootNavigation from '../../RootNavigation.js';
import { RNS3 } from 'react-native-s3-upload';


//Getting story
export const getStory = (userId, schoolId, isPullToRefresh) => {
  return async (dispatch) => {
    try {
      let storyRef = firestore().collection('users').doc(userId).collection('schools').doc(schoolId).collection('stories');
      dispatch({ type: 'STORY_CLEAR_ERROR', payload: null })
      dispatch({ type: 'STORY_LOADING', payload: true })
      dispatch({ type: 'CLEAR_STORY', payload: [] })

      const d = [];
      if(isPullToRefresh){
        dispatch({ type: 'PULL_TO_REFRESH', payload: true })
      }

      storyRef.orderBy('createdAt', 'desc').limit(20).onSnapshot({ includeMetadataChanges: false }, (snapshot) => {
        console.log("snapshot", snapshot)
        if (!snapshot.empty) {
          let isPost = store.getState().storyReducer.isCreatePost
          let lastDocument = snapshot.docs[snapshot.docs.length - 1]

          snapshot.docChanges().forEach((change, index) => {
            if (change.type === "added") {
              console.log("change.type 31", change.type)
              if (isPost) {
                d.unshift({ ...change.doc.data() });
              }
              else {
                if (index == 2) { }
                d.push({ ...change.doc.data() });
              }
            }
            else if (change.type === "modified") {
              console.log("change.type 42", change)
              d[change.newIndex] = change.doc.data();
            }
            else if (change.type === "removed") {
              console.log("change.type 47", change)
              d.splice(change.oldIndex, 1)

            }
            else {
            }
          });
          console.log("storyData and local data is line 48", d)
          dispatch({ type: 'GET_STORY', payload: { storiesData: [...d], lastVisible: lastDocument } })
          dispatch({ type: 'STORY_LOADING', payload: false })

        }
        else {
          dispatch({ type: 'GET_STORY', payload: { storiesData: [] } })
          dispatch({ type: 'STORY_LOADING', payload: false })
          // this._getInrestsData()
        }
      });
    }
    catch (e) {
      dispatch({ type: 'STORY_ON_ERROR', payload: { isError: true, errorMessage: 'Error to get story!' } })
      dispatch({ type: 'STORY_LOADING', payload: false })
    }
  }
}

//Pagination logic
export const retreiveMore = (userId, schoolId) => {
  return async (dispatch) => {
    try {
      let stories = store.getState().storyReducer.stories;
      let lastStory = store.getState().storyReducer.lastStory
      console.log("stories, lastStory ln 74", stories, lastStory)

      let ref = firestore().collection('users').doc(userId).collection('schools').doc(schoolId)

      ref.collection('stories').orderBy('createdAt', 'desc').startAfter(lastStory).limit(5)
        .get().then((r) => {
          if (!r.empty) {
            let lastDocument = r.docs[r.docs.length - 1]
            const d = [];
            if (lastDocument) {
              r.docs.map((story, index) => {
                d.push({ ...story.data() })
              })
              console.log("retrive more stories ln 88", d)

              dispatch({ type: 'GET_STORY', payload: { storiesData: [...stories, ...d], lastVisible: lastDocument } })
              dispatch({ type: 'STORY_LOADING', payload: false })

            }
            else {
              console.log("else 94")
            }
          }
          else {
            console.log("else 98")
          }
        }).catch(e => { console.log(e) })
    }
    catch (e) {
    }
  }

}

//Getting post like user
export const getLikeData = (userId, schoolId, storyId) => {
  return async (dispatch) => {
    try {
      let likeRef = firestore().collection('users').doc(userId).collection('schools').doc(schoolId).collection('stories').doc(storyId)
        .collection('likes').where('status', '==', true).orderBy('likedAt', 'desc').limit(10)
      likeRef.get().then((postRes) => {
        let lastDocument = postRes.docs[postRes.docs.length - 1];
        let d = []
        postRes.forEach((doc) => { d.push(doc.data()) })
        dispatch({ type: 'GET_LIKE', payload: d })
      }).catch((e) => { })
    } catch (e) { }
  }
}



//Like Story
export const like = (loginData, item, screen) => {
  console.log("loginData, item", loginData, item)
  Vibration.vibrate(50)
  let likeData = {
    studentImageUrl: loginData.childrenImageUrl,
    studentName: loginData.childrenName,
    studentUid: loginData.childrenUid,
    email: loginData.email || '',
    profileName: loginData.profileName || '',
    mobileNumber: loginData.mobileNumber,
    parentId: loginData.parentId,
    schoolId: loginData.schoolId,
    section: loginData.section,
    standard: loginData.class || '',
    userPhotoUrl: loginData.userPhotoUrl,
    userId: loginData.userId,
    uid: item.uid,
    storyId: item.storyId,
    createdAt: item.createdAt,
    userType: item.userType,
    resourceUrl: item.resourceUrl || '',
    message: item.message || '',
    docType: item.docType,
    displayName: loginData.childrenName,
    displayImageUrl: loginData.childrenImageUrl,
    userType: 1 //for parents app
  }

  const storyRef = firestore().collection('users').doc(loginData.userId).collection('schools').doc(loginData.schoolId).collection('stories').doc(item.storyId)
  return async (dispatch) => {
    try {
      let d = store.getState().storyReducer.stories;
      let lastStory = store.getState().storyReducer.lastStory
      let i = d[item.index].likedBy.indexOf(loginData.parentId)
      if (i > -1) {
        d[item.index].likedBy.splice(loginData.parentId)
      }
      else {
        d[item.index].likedBy.push(loginData.parentId)
      }
      dispatch({ type: 'GET_STORY', payload: { storiesData: [...d], lastVisible: lastStory } })

      storyRef.get().then(res => {
        // already liked 
        if (res.data().likedBy.indexOf(loginData.parentId) > -1) {
          console.log("if calling 162")
          storyRef.update({
            likedBy: firestore.FieldValue.arrayRemove(loginData.parentId),
          }).then(res => {
            console.log("res 166", res)
            storyRef.collection('likes').doc(loginData.parentId).set({ status: false }, { merge: true }).then(res => {
              console.log("res 168", res)
            })
          }).catch(e => { console.log(e) })
        }

        else {
          console.log("else calling 172")
          // first time liking 
          likeData['likedAt'] = new Date().getTime(),
            likeData['status'] = true
          storyRef.collection('likes').doc(loginData.parentId).set(likeData, { merge: true }).then(res => {
            console.log("res 177", res)
            storyRef.update({
              likedBy: firestore.FieldValue.arrayUnion(loginData.parentId)
            }).then(res => {
              console.log("res 181", res)
            }).catch(e => { console.log(e) })
          }).catch(e => { console.log(e) })
        }
      }).catch(e => {
        console.log(e)
      })
    } catch (err) { console.log(err) }
  }
}


// Getting individual user post
export const getUserPost = (userId, schoolId, parentId) => {
  return async (dispatch) => {
    try {
      let storyRef = firestore().collection('users').doc(userId).collection('schools').doc(schoolId).collection('stories').where('uid', '==', parentId).orderBy('createdAt', 'desc')
      storyRef.get().then((postRes) => {
        let lastDocument = postRes.docs[postRes.docs.length - 1];
        let d = []
        postRes.forEach((doc) => { d.push(doc.data()) })
        dispatch({ type: 'USER_STORY', payload: d })
      }).catch(e => {
      })
    }
    catch (e) { }
  }
}


//Upload local image to S3 bucket
export const uploadToS3 = (imageDoc) => {
  return async (dispatch) => {
    try {
      const options = {
        bucket: "skugal-story",
        region: "us-east-1",
        accessKey: "AKIAVUVZQHR4QTLPAWPH",
        secretKey: "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",
        successActionStatus: 201
      }
      const file = {
        uri: `${imageDoc.uri}`,
        name: `${imageDoc.name}`,
        type: imageDoc.type
      }
      RNS3.put(file, options).then(response => {
        if (response.status !== 201) {
          throw new Error("Failed to upload image to S3");
        }
        else {
          if (response.body) {
            return new Promise(function (Resolve, Reject) {
              if (response.body) {
                Resolve(response.body);
              } else {
                Reject("Error to upload image to S3");
              }
            });
          }
        }
      }).catch(e => {
      })
    } catch (err) {
    }
  }
}


export const creatingPost = (item) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'CREATING_POST', payload: item })
      RootNavigation.navigate('Home');
    }
    catch (e) {
    }
  }
}

export const finishCreatingPost = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'FINISH_CREATING_POST', payload: false })
      RootNavigation.navigate('Home');
    }
    catch (e) {
    }
  }
}


//Create Story
export const createStories = (params, loginData) => {
  console.log("createStories params and activestudents", params, loginData)
  let storyId = guidGenerator()
  return async (dispatch) => {
    try {
      const increment = firestore.FieldValue.increment(1);
      let itemData = {
        docType: params.docType,
        message: params.message || '',
        color: params.color || '',
        tag: params.tag || '',
        textColor: params.textColor || '',
        likedBy: [],
        schoolId: loginData.schoolId,
        userId: loginData.userId,
        createdAt: new Date().getTime(),
        priority: 1,
        seen: false,
        userType: 1,
        title: params.title || '',
        uid: loginData.parentId,
        profileName: loginData.profileName || '',
        mobileNumber: loginData.mobileNumber,
        studentImageUrl: loginData.childrenImageUrl,
        studentUid: loginData.childrenUid,
        section: loginData.section,
        standard: loginData.class,
        review: 0,
        studentName: loginData.childrenName,
        storyId: storyId,
        commentCount: 0,
        resourceUrl: params.resourceUrl || '',
        filename: '',
        displayName: loginData.childrenName,
        displayImageUrl: loginData.childrenImageUrl,
        dataLink: params.dataLink || ''
      }
      let docRef = firestore().collection('users').doc(loginData.userId).collection('schools').doc(loginData.schoolId).collection('stories')
      docRef.doc(storyId).set(itemData, { merge: true }).then((res) => {
        firestore().collection('parents').doc(loginData.parentId)
          .update({ storyCount: increment }).then((r) => {
            console.log("params.docType", params.docType)
            if (params.docType == "image") {
              const options = {
                bucket: "skugal-story",
                region: "us-east-1",
                accessKey: "AKIAVUVZQHR4QTLPAWPH",
                secretKey: "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",
                successActionStatus: 201
              }
              const file = {
                uri: `${params.uri}`,
                name: `${params.name}`,
                type: params.type
              }
              RNS3.put(file, options).then(response => {
                if (response.status !== 201) {
                  throw new Error("Failed to upload image to S3");
                }
                else {
                  if (response.body) {
                    docRef.doc(storyId).set({ resourceUrl: response.body.postResponse.location }, { merge: true }).then((imgres) => {
                      dispatch(finishCreatingPost(false))
                    }).catch((err) => {
                      dispatch(finishCreatingPost(false))
                    })
                  }
                }
              }).catch(e => {
                dispatch(finishCreatingPost(false))
              })

            }
            else {
              dispatch(finishCreatingPost(false))
            }
          }).catch((e) => {
            dispatch(finishCreatingPost(false))
          })

      }).catch(e => {
        dispatch(finishCreatingPost(false))
      })
    }
    catch (e) { dispatch(finishCreatingPost(false)) }
  }
}

// Getting individual user post
export const readOG = (url) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'STORY_LOADING', payload: true })
      let endPoint = `https://us-central1-skugal-production.cloudfunctions.net/readOG?url=${url}`
      fetch(endPoint, {
        method: "GET",
        headers: { "content-type": 'application/json' },
      }).then((r) => r.json()).then(res => {
        dispatch({ type: 'STORY_LOADING', payload: false })
        dispatch({ type: 'GET_OG', payload: res })

      }).catch(e => {
        dispatch({ type: 'STORY_LOADING', payload: false })
      })
    }
    catch (e) {
      dispatch({ type: 'STORY_LOADING', payload: false })
    }
  }
}

// getting individual user post
export const closeAttachmentUrl = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_OG', payload: {} })
    }
    catch (e) {
      dispatch({ type: 'STORY_LOADING', payload: false })

    }
  }
}


//Delete post/sotry
export const deletePost = (item) => {
  return async (dispatch) => {
    let d = store.getState().dashboardReducer.activeStudent
    try {
      const decrement = firestore.FieldValue.increment(-1);
      let storyRef = firestore().collection('users').doc(d.userId).collection('schools').doc(d.schoolId).collection('stories');

      storyRef.doc(item.storyId).delete().then((res) => {
        firestore().collection('parents').doc(d.parentId)
          .update({ storyCount: decrement }).then((r) => {
            Toast('Your Post has been deleted successfully!')
          }).catch((e) => {
          })
      }).catch((e) => {
      })
    }
    catch (e) {
    }
  }
}

//go to story preview

export const gotoStory = (item) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'STORY_PREVIEW', payload: item })
      RootNavigation.navigate('StoryPreview');
    }
    catch (e) {
    }
  }
}