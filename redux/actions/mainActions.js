import firestore from '@react-native-firebase/firestore';
import { GET_CLASSES, GET_STUDENTS, SELECTED_CLASS, UPDATE_LOCAL_DATA, CLEAR_ERROR, LOADING, ON_ERROR, GET_CLASSES_DATA, GET_INDIVIDUAL_DATA, GET_NOTIFICATION,GET_COMPLAIN } from '../actionTypes';
import * as RootNavigation from '../../RootNavigation.js';



//Update local data global store
export const updateUserData = (data) => {
  return async (dispatch) => {
      try {
          dispatch({ type: UPDATE_LOCAL_DATA, payload: data })
      }
      catch (e) {
      }
  }
}

//get list of classes
export const getClass = (userId, schoolId, teacherId) => {
  return async (dispatch) => {
    try {
      firestore().collection('users').doc(userId).collection('schools').doc(schoolId).collection("teachers").doc(teacherId).collection("classes").get().then((classes) => {
        let t = []
        classes.forEach((doc) => {
          doc.data()['id'] = doc.id
          t.push(doc.data())
        })
        dispatch({ type: GET_CLASSES, payload: t })
        console.log("data", t);
      }).catch(e => {
        console.log(e)
      })
    }
    catch (e) {
      console.log(e)

    }

  }

}


//Get list of children
export const getStudents = (userId, schoolId, standard, section) => {
  return async (dispatch) => {
    try {
      firestore().collection('users').doc(userId).collection('schools').doc(schoolId).collection("classes").doc(standard).collection('sections').doc(section).collection('students')
        .get().then((students) => {
          let t = []
          let pCount = 0;
          let aCount = 0
          students.forEach((doc) => {
            if (doc.data().status) {
              pCount++
            }
            else {
              aCount++
            }
            doc.data()['id'] = doc.id
            t.push(doc.data())
          })
          dispatch({ type: GET_STUDENTS, payload: t })

        }).catch(e => {
        })
    }
    catch (e) {
    }

  }
}

// Select class
export const selectClass = (item) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SELECTED_CLASS, payload: item })
      RootNavigation.navigate('TotalStudent');
    }
    catch (e) {
    }
  }
}


// Get class Curriculam Data
export const getClassCurricullamData = (loginData, selectedClass, screen) => {
  console.log("loginData, selectedClass, screen",loginData, selectedClass, screen)
  return async (dispatch) => {
    try {
      let ref =   firestore().collection('users').doc(loginData.userId).collection('schools').doc(loginData.schoolId).collection('classes').doc(selectedClass.standard)
      .collection('sections').doc(selectedClass.section).collection(screen)
      dispatch({ type: CLEAR_ERROR, payload: null })
      dispatch({ type: LOADING, payload: true })
   
      const d = [];
     
      ref.orderBy('createdAt', 'desc').limit(10).onSnapshot({ includeMetadataChanges: false }, (snapshot) => {
       console.log("snapshot",snapshot)
        if (!snapshot.empty) {
          let lastDocument = snapshot.docs[snapshot.docs.length - 1]
          snapshot.docChanges().forEach((change, index) => {
            if (change.type === "added") {
              console.log("change.type 31", change.type)
              if (isPost) {
                d.unshift({ ...change.doc.data() });
              }
              else {
                d.push({ ...change.doc.data() });
              }
            }
            else if(change.type === "modified") {
              d[change.newIndex] = change.doc.data();
            }
            else if(change.type === "removed") {
              d.splice(change.oldIndex, 1)
            }
            else {
              dispatch({ type: LOADING, payload: true })
            }
          });
          console.log("assignment",d)
          dispatch({ type: GET_CLASSES_DATA, payload: { classData:d, lastVisible: lastDocument } })
          dispatch({ type: LOADING, payload: false })

        }
        else {
          dispatch({ type: LOADING, payload: true })
        }
      });
    }
   
    catch (e) {
      dispatch({ type: ON_ERROR, payload: { isError: true, errorMessage: 'Error!' } })
      dispatch({ type: LOADING, payload: true })

    }
  }
}

// Get class getIndividualData
export const getIndividualData = (loginData, studentUid, screen) => {
  return async (dispatch) => {
    try {
      let ref =   firestore().collection('users').doc(loginData.userId).collection('schools').doc(loginData.schoolId).collection('allStudents').doc(studentUid).collection(screen)
      dispatch({ type: CLEAR_ERROR, payload: null })
      dispatch({ type: LOADING, payload: true })
   
      const d = [];

      ref.orderBy('createdAt', 'desc').limit(10).onSnapshot({ includeMetadataChanges: false }, (snapshot) => {
        if (!snapshot.empty) {
          let lastDocument = snapshot.docs[snapshot.docs.length - 1]
          snapshot.docChanges().forEach((change, index) => {
            if (change.type === "added") {
              console.log("change.type 31", change.type)
              if (isPost) {
                d.unshift({ ...change.doc.data() });
              }
              else {
                d.push({ ...change.doc.data() });
              }
            }
            else if(change.type === "modified") {
              d[change.newIndex] = change.doc.data();
            }
            else if(change.type === "removed") {
              d.splice(change.oldIndex, 1)
            }
            else {
              dispatch({ type: LOADING, payload: true })
            }
          });
          console.log("storyData and local data is line 48", d)
          dispatch({ type: GET_INDIVIDUAL_DATA, payload: { classData:d, lastVisible: lastDocument } })
          dispatch({ type: LOADING, payload: false })

        }
        else {
          dispatch({ type: LOADING, payload: true })
        }
      });
    }
    catch (e) {
      dispatch({ type: ON_ERROR, payload: { isError: true, errorMessage: 'Error!' } })
      dispatch({ type: LOADING, payload: true })
    }
  }
}

//Get notifications
export const getNotification = (loginData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING, payload: true })
      firestore().collection('users').doc(loginData.userId).collection('schools').doc(loginData.schoolId).collection('teachers').doc(loginData.teacherId).collection('notifications').where('visibility', '==', true).orderBy('timestamp', 'desc').limit(10).get().then((r) => {
        let d = []
        let lastDocument = r.docs[r.docs.length - 1];
        r.forEach((doc) => {
          doc.data()['isSelect'] = false
          doc.data()['id'] = doc.id
          d.push(doc.data())
        })
        dispatch({ type: GET_NOTIFICATION, payload: d })
      }).catch((e) => {
        dispatch({ type: LOADING, payload: false })
      })

    }
    catch (e) {
      dispatch({ type: LOADING, payload: false })
    }
  }
}

// Get online class

export const getOnlineClass = (userId, schoolId, standard, section) => {
  return async (dispatch) => {
    try {
      // dispatch({ type: 'CLEAR_MAIN_ERROR', payload: null })
      dispatch({ type: 'LOADING', payload: true })
      firestore().collection('users').doc(userId).collection('schools').doc(schoolId).collection('events')
        .where('class', '==', standard).where('section', '==', section).orderBy('timestamp', 'desc').onSnapshot((courses) => {
          var groups = {};
          if (!courses.empty) {
            courses.docs.forEach((doc, index) => {
              if (doc.data().days != undefined) {
                for (let i = 0; i < doc.data().days.length; i++) {
                  var groupName = groups[doc.data().days[i]];
                  if (!groupName) {
                    groups[doc.data().days[i]] = [];
                  }
                  groups[doc.data().days[i]].push(doc.data());
                }
              }
              else {
              }
            })
            let groupData = [];
            for (var groupName in groups) {
              groupData.push({ group: groupName, events: groups[groupName] });
            }
            console.log("groupData",groupData)
            dispatch({ type: 'GET_ONLINE_CLASS', payload: groupData })
          }
          else {
            dispatch({ type: 'ON_ERROR ', payload: false })
          }
        })
    }
    catch (e) {
      dispatch({ type: 'ON_ERROR ', payload: false })

    }
  }
}

//Get List of Activit

export const getActivityData = (loginData, collectionname, actionType) => {
  console.log("loginData, type, actionType",loginData, collectionname, actionType)
  return async (dispatch) => {
    try {
      firestore().collection('users').doc(loginData.userId).collection('schools').doc(loginData.schoolId).collection('activity').where('type', '==', collectionname).orderBy('createdAt', 'desc').onSnapshot((res) => {
          let dt = []
          res.forEach((doc) => {
            doc.data()['id'] = doc.id
            dt.push(doc.data())
          })
          console.log('activity Data',dt)
          dispatch({ type: actionType, payload: dt })
        })

    }
    catch (e) {

    }
  }
}