import firestore from '@react-native-firebase/firestore';
import { GET_CLASSES, GET_STUDENTS, SELECTED_CLASS, SELECTED_SECTION, SELECTED_STUDENT, ATTENDANCE_REPORT, UPDATE_LOCAL_DATA, GET_ONLINE_CLASS, CLEAR_ERROR, UPDATE_STUDENTS, LOADING, ON_ERROR, GET_CLASSES_DATA, GET_INDIVIDUAL_DATA, GET_NOTIFICATION, GET_COMPLAIN } from '../actionTypes';
import * as RootNavigation from '../../RootNavigation.js';
import { store } from '../store';
import { formatDate2 } from '../../functions/timeformat';



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
      let standard = {}
      let sections = {}
      // orderBy('standard')
      firestore().collection('users').doc(userId).collection('schools').doc(schoolId).collection("teachers").doc(teacherId).collection("classes").get().then((classes) => {
        let d = []
        classes.forEach((doc) => {
          doc.data()['id'] = doc.id
          d.push(doc.data())
        })
        for (const doc of d) {
          if (!standard[doc.standard]) {
            standard[doc.standard] = doc;
          }

          if (!sections[doc.section]) {
            sections[doc.section] = doc;
          }
        }

        let standardArr = Object.keys(standard).map((key) => {
          return standard[key]
        });

        let sectionArr = Object.keys(sections).map((key) => {
          return sections[key]
        });
        dispatch({ type: GET_CLASSES, payload: { standard: standardArr, sections: sectionArr } })
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

          console.log("presentcount, absencount", pCount, aCount, t.length)
          dispatch({ type: GET_STUDENTS, payload: { students: t, pCount: pCount, aCount: aCount, totalStudents: t.length } })

        }).catch(e => {
        })
    }
    catch (e) {
    }

  }
}

// take attendance 
export const takeAttendance = (status, item, index) => {
  return async (dispatch) => {
    try {

      let d = store.getState().mainReducer.students;
      d[index]['status'] = status

      // pCount: pCount, aCount: aCount, totalStudents: t.length
      dispatch({ type: GET_STUDENTS, payload: { students: [...d], } })

    }
    catch (e) { }
  }

}

//Get Attendance Report
export const getAttendanceReport = (userId, schoolId, studentUid) => {
  return async (dispatch) => {
    try {
      firestore().collection('users').doc(userId).collection("schools").doc(schoolId).collection('allStudents').doc(studentUid).collection('attendanceLog').get().then((snapshot) => {
        let attendanceData = [];
        let pCount = 0;
        let absentcount = 0;
        let notTakenAttendanceCount = 0
        snapshot.forEach(function (doc) {
          if (doc.data().status) {
            pCount++
          }
          else if (doc.data().attendanceTaken || doc.data().attendanceTaken == undefined) {
            absentcount++
          }
          else {
            notTakenAttendanceCount++
          }
          attendanceData.push(doc.data())
        });

        var obj = attendanceData.reduce((c, v) => Object.assign(c, {
          [formatDate2(v.timestamp * 1000)]: v.status ? 
          { selected: true,
            marked: false,
            customStyles: {
            container: {
              backgroundColor: '#3CB833',
              borderRadius:5,
              width:28,
              height:28
              
            },
            text: {
              color: '#fff',
              fontSize:12
            }
          }
        } : v.attendanceTaken || v.attendanceTaken === undefined ? { selected: true, marked: false,
           customStyles: {
            container: {
              backgroundColor: '#FFC800',
              borderRadius:5,
              width:28,
              height:28
            },
            text: {
              color: '#fff',
              fontSize:12
            }
          }
           } : { selected: true, marked: false, 
           customStyles: {
            container: {
              backgroundColor: '#F44336',
              borderRadius:5,
              width:28,
              height:28
              
            },
            text: {
              color: '#fff',
              fontSize:12
            }
          } }
        }), {});
        dispatch({ type: ATTENDANCE_REPORT, payload: { presentCount: pCount, absentcount: absentcount, notTakenAttendanceCount: notTakenAttendanceCount, attendance: obj } })
      }).catch(e=>{})
    }
    catch (e) { }

  }
}

// Select class
export const selectClass = (standard) => {
  return async (dispatch) => {
    try {
      let section = store.getState().mainReducer.selectedClass.section
      dispatch({ type: SELECTED_CLASS, payload: { standard: standard, section: section } })
    }
    catch (e) {
    }
  }
}

// Select Section
export const selectSection = (section) => {
  return async (dispatch) => {
    try {
      let std = store.getState().mainReducer.selectedClass.standard
      dispatch({ type: SELECTED_SECTION, payload: { section: section, standard: std } })
    }
    catch (e) {
    }
  }
}

//Individual students attndance report 
 export const gotoAttendanceReport = (item) => {
   return async (dispatch) =>{
     try {
      dispatch({ type: SELECTED_STUDENT, payload: item})
      RootNavigation.navigate('AttendanceReport');
     }
     catch(e){
     }

   }
 }



// Get class Curriculam Data
export const getClassCurricullamData = (loginData, selectedClass, cName, type) => {
  return async (dispatch) => {
    try {
      console.log("getClassCurricullamData called",  loginData, selectedClass, cName, type)
      let isPost = true
      let ref = firestore().collection('users').doc(loginData.userId).collection('schools').doc(loginData.schoolId).collection('classes').doc(selectedClass.standard)
        .collection('sections').doc(selectedClass.section).collection(cName)
      
      dispatch({ type: CLEAR_ERROR, payload: null })
      dispatch({ type: LOADING, payload: true })

      const d = [];
      ref.orderBy('creationTime', 'desc').limit(10).onSnapshot({ includeMetadataChanges: false }, (snapshot) => {
        console.log("snapshot", snapshot)
        
        if (!snapshot.empty) {
          let lastDocument = snapshot.docs[snapshot.docs.length - 1]
          snapshot.docChanges().forEach((change, index) => {
            if (change.type === "added") {
              if (isPost) {
                d.unshift({ ...change.doc.data() });
              }
              else {
                d.push({ ...change.doc.data() });
              }
            }
            else if (change.type === "modified") {
              d[change.newIndex] = change.doc.data();
            }
            else if (change.type === "removed") {
              d.splice(change.oldIndex, 1)
            }
            else {
              dispatch({ type: LOADING, payload: true })
            }
          });
          console.log("If condition is running", d)
          dispatch({ type: GET_CLASSES_DATA, payload: {type:type, classData: d, lastVisible: lastDocument } })
          dispatch({ type: LOADING, payload: false })
        }
        else {
          console.log("else condition is running", d)
          dispatch({ type: GET_CLASSES_DATA, payload: {type:type, classData: d, lastVisible: null } })
          dispatch({ type: LOADING, payload: false })
        }
      });

      console.log("d is ", d)

    }

    catch (e) {
      console.log("Error", e)
      dispatch({ type: ON_ERROR, payload: { isError: true, errorMessage: 'Error!' } })
      dispatch({ type: LOADING, payload: true })

    }
  }
}

// Get class getIndividualData
export const getIndividualData = (loginData, studentUid, screen) => {
  return async (dispatch) => {
    try {
      let ref = firestore().collection('users').doc(loginData.userId).collection('schools').doc(loginData.schoolId).collection('allStudents').doc(studentUid).collection(screen)
      dispatch({ type: CLEAR_ERROR, payload: null })
      dispatch({ type: LOADING, payload: true })

      const d = [];

      ref.orderBy('createdAt', 'desc').limit(10).onSnapshot({ includeMetadataChanges: false }, (snapshot) => {
        if (!snapshot.empty) {
          let lastDocument = snapshot.docs[snapshot.docs.length - 1]
          snapshot.docChanges().forEach((change, index) => {
            if (change.type === "added") {
              if (isPost) {
                d.unshift({ ...change.doc.data() });
              }
              else {
                d.push({ ...change.doc.data() });
              }
            }
            else if (change.type === "modified") {
              d[change.newIndex] = change.doc.data();
            }
            else if (change.type === "removed") {
              d.splice(change.oldIndex, 1)
            }
            else {
              dispatch({ type: LOADING, payload: true })
            }
          });
          dispatch({ type: GET_INDIVIDUAL_DATA, payload: { classData: d, lastVisible: lastDocument } })
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
      firestore().collection('users').doc(loginData.userId).collection('schools').doc(loginData.schoolId).collection('teachers').doc(loginData.teacherId).collection('notifications')
      .where('visibility', '==', true).orderBy('timestamp', 'desc').limit(10).get().then((r) => {
        console.log('responce',r)
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
            console.log("groupData", groupData)
            dispatch({ type: GET_ONLINE_CLASS, payload: groupData })
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

//Get List of Activity Data
export const getActivityData = (loginData, collectionname, actionType) => {
  console.log("loginData, type, actionType", loginData, collectionname, actionType)
  return async (dispatch) => {
    try {
      firestore().collection('users').doc(loginData.userId).collection('schools').doc(loginData.schoolId).collection('activity').where('type', '==', collectionname).orderBy('createdAt', 'desc').onSnapshot((res) => {
        let dt = []
        res.forEach((doc) => {
          doc.data()['id'] = doc.id
          dt.push(doc.data())
        })
        console.log('activity Data', dt)
        dispatch({ type: actionType, payload: dt })
      })
    }
    catch (e) {
    }
  }
}

    // Search Student
  export const _searchStudent = (text) => {
  console.log("text",text)
  const newData = this.state.searchData.filter(function (item) {
      if (item.studentName) {
          let d = item.studentName
          var itemData = d.trim().toUpperCase()
          var textData = text.toUpperCase();
      }
      else {
          ''.toUpperCase();
      }
      return itemData.indexOf(textData) > -1;
  });
  this.setState({ student: newData, text: text, });
}

//Update teacher profile
export const updateProfile = (data, id) => {
  console.log("data, id",data, id)
  return async (dispatch) => {
    try {
      dispatch({ type: 'LOADING', payload: true })
        firestore().collection('users').doc(loginData.userId).collection('schools').doc(loginData.schoolId).collection('teachers').doc(loginData.teacherId).set(data, { merge: true }).then((r) => {
          console.log('res',r)
        dispatch({ type: 'EDIT_PROFILE', payload: data })
        dispatch({ type: 'LOADING', payload: false })
        mergeDataInLocal(data)
        Toast('Your Profile has been successfully updated!')
        RootNavigation.navigate('Settings');
      }).catch((e) => {
        alert("Technical error! Please update after some times.")
        dispatch({ type: 'LOADING', payload: false })
      })
    }
    catch (err) {
      alert("Technical error! Please update after some times.")
      dispatch({ type: 'LOADING', payload: false })
    }
  }
}