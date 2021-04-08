import RNFetchBlob from 'rn-fetch-blob'
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Share from 'react-native-share'
import { ToastAndroid } from 'react-native';

export const shareImage = (item) => {
    console.log("shareitem is", item)
    var fileType = { u: "" }
    if (item.docType == 'pdf') {
        fileType.u = "data:application/pdf;base64,"
    }
    else {
        fileType.u = 'data:image/png;base64,'
    }
    try {
        RNFetchBlob.fetch('GET', `${item.imageUrl}`)
            .then(resp => {
                let base64image = resp.data;
                dynamicLinks().buildShortLink({
                    link: 'https://skugal.com/parents',
                    domainUriPrefix: 'https://skugal.page.link',
                    android: {
                        packageName: 'com.skugal_parents',
                        fallbackUrl: 'https://skugal.com/parents',
                      },
                  }).then((res)=>{
                    share(fileType.u + base64image, res);
                      console.log("dynamic link res", res)
                  })
            }).catch(err => {
                console.log("error to create links", err)
             });

        share = (base64image, dynamicUrl) => {
            let shareOptions = {
                title: 'Skugal',
                url: base64image,
                message: `${item.message} ${dynamicUrl}`
            };
            Share.open(shareOptions)
                .then(res => { })
                .catch(err => { err && console.log(err); });
        }
    }
    catch (e) {
        alert("Technical problem to share the resource !")
    }
};


 const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const isValidUrl = (str) => {
    var expression =  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi; 
    // regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (expression.test(str)) {
      return true;
    }
    else {
      return false;
    }
  }
  


export const guidGenerator = () => {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}



export const addAnalyticsData = (item, lData, e, l, dId) => {
    try {
        if (item) {
            item['schoolName'] = lData.schoolName ? lData.schoolName : 'N/A'
            item['address'] = lData.address ? lData.address : 'N/A'
            let objJsonStr = JSON.stringify(item);
            let objJsonB64 = window.btoa(objJsonStr)
            console.log("item is", item)
            let d = {
                ut: new Date().getTime(), //updtated time
                uid: lData.parentId, //parent Id
                usrid: lData.userId, // userId
                sid: lData.schoolId,  //schoolId
                e: e, // event (impression)
                eid: item.storyId ? item.storyId : '', // eid eventId
                p: "P_App", // platform
                l: l, //url
                vp: "722x657", //viewport
                eml: lData.email ? lData.email : '', //email
                cx: objJsonB64, //encoded data
                m: lData.mobileNumber ? lData.mobileNumber : '', //user mobile numbber
                i: lData.intrests ? lData.intrests : '', //user intrests
                ar: lData.address ? lData.address : '' ,//address
                dId:dId , // document id
                item:item
            }
            //https://us-central1-skugal-production.cloudfunctions.net/anaGal
            fetch("https://us-central1-skugal-production.cloudfunctions.net/anaGal", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(d)
            }).then(res => {
                console.log('res', res);
            }).catch(err => {
                console.log('err', err);
            })
        }
        else {
            console.log("item is empty!")
        }
    }
    catch (e) {
        console.log("error to add analytucs data", e)
    }

}

export const Toast = (title) =>{
    ToastAndroid.showWithGravity(
        `${title}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
    );
}


            {/* <TouchableOpacity onPress={() => { doLogOut() }}>
                <Text>Logout</Text>
            </TouchableOpacity> */}
            {/* 
            <TouchableOpacity onPress = {()=>{Assignment()}}>
                <Text style={{paddingTop:20}}>Assignment</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = {()=>{Gallery()}}>
                <Text style={{paddingTop:20}}>Gallery</Text>
            </TouchableOpacity> 

            <TouchableOpacity onPress = {()=>{UserIntrest()}}>
                <Text style={{paddingTop:20}}>UserIntrest</Text>
            </TouchableOpacity> */}