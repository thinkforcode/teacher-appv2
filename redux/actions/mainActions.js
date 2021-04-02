import firestore from '@react-native-firebase/firestore';
import { GET_CLASSES, GET_STUDENTS, SELECTED_CLASS } from '../actionTypes';
import * as RootNavigation from '../../RootNavigation.js';



//get list of classes
export const getClass = (userId, schoolId, teacherId) => {
  console.log("userId, schoolId", userId, schoolId)
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


//get list of children
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
          console.log("error", e)
        })
    }
    catch (e) {
      console.log(e)

    }

  }

}
// Select class
export const selectClass = (item) => {
  console.log("item", item)
  return async (dispatch) => {
    try {
      dispatch({ type: SELECTED_CLASS, payload: item })
      RootNavigation.navigate('TotalStudent');
    }
    catch (e) {
      console.log(e)
    }
  }
}


// Get class Curriculam Data

// export const getClassCurricullamData = (userId, schoolId, standard, section, screen, type) => {
//   console.log("userId, schoolId, standard, section, screen, type",userId, schoolId, standard, section, screen, type)
//   return async (dispatch) => {
//     try {
//       // dispatch({ type: 'LOADING', payload: true })
//       firestore().collection('users').doc(userId).collection('schools').doc(schoolId)
//         .collection('classes').doc(standard).collection('sections').doc(section).collection(screen).orderBy('creationTime', "desc").limit(10).get().then((snapshot) => {
//           let lastDocument = snapshot.docs[snapshot.docs.length - 1];
//           let d = []
//           snapshot.forEach(function (doc) {
//             doc.data()['docId'] = doc.id
//             d.push(doc.data())
//           });
//           console.log("assignments", d);
//           dispatch({ type: type, payload: d })
//         }).catch(e => {
//           dispatch({ type: 'ON_MAIN_ERROR', payload: false })
//         })
//     }
//     catch (e) {
//       dispatch({ type: 'ON_MAIN_ERROR', payload: false })
//     }
//   }
// }

export const getClassCurricullamData = (userId, schoolId, standard, section, screen, type) => {
  console.log("userId, schoolId, standard, section, screen, type",userId, schoolId, standard, section, screen, type)
  return async (dispatch) => {
    try {
      // dispatch({ type: 'LOADING', payload: true })
      firestore().collection('users').doc(userId).collection('schools').doc(schoolId)
        .collection('classes').doc(standard).collection('sections').doc(section).collection(screen).orderBy('creationTime', "desc").limit(10).onSnapshot((snapshot) => {
          let lastDocument = snapshot.docs[snapshot.docs.length - 1];
          let d = []
          snapshot.forEach(function (doc) {
            doc.data()['docId'] = doc.id
            d.push(doc.data())
          });
          console.log("assignment data", d);
          dispatch({ type: type, payload: d })
        }).catch(e => {
          dispatch({ type: 'ON_MAIN_ERROR', payload: false })
        })
    }
    catch (e) {
      dispatch({ type: 'ON_MAIN_ERROR', payload: false })
    }
  }
}