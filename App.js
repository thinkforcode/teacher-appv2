import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Text, View, StatusBar,TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Login from './screens/AuthScreens/Login';
import AuthStack from './screens/AuthScreens/AuthStack';
import Otp from './screens/AuthScreens/Otp';
import Signup from './screens/RegistrationScreens/Signup';
import UserIntrest from './screens/RegistrationScreens/UserIntrest';
import Notification from './screens/Notification'
import OnlineClas from './screens/OnlineClas';
import Assignment from './screens/Assignment';
import Gallery from './screens/Gallery';
import Review from './screens/Review';
import Remarks from './screens/Remarks';
import StoryPreview from './screens/storyScreens/StoryPreview';
import ContactUs from './screens/ContactUs';
import Feed from './screens/storyScreens/Feed';
import StoryProfile from './screens/storyScreens/StoryProfile';
import PeopleLike from './screens/storyScreens/PeopleLike';
import Comment from './screens/storyScreens/Comment';
import CommentPopup from './screens/storyScreens/CommentPopup';
import Preview from './components/Preview';
import ClassesAssigned from './screens/ClassesAssigned';
import Home from './screens/Home';
import MainAppNavigator from './screens/MainTab'
import TotalStudent from './screens/TotalStudent';
import ConfirmAttendance from './screens/ConfirmAttendance';
import Standerd from './screens/Standerd';
import Support from './screens/Support';

const App = (props) => {

  useEffect(() => {
    SplashScreen.hide();
    return () => { }
  }, [])

  


  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#E61A50" barStyle="light-content" />
      {/* <Login/> */}
      {/* <Otp/> */}
      {/* <AuthStack/> */}
      {/* <Signup/> */}
      {/* <UserIntrest /> */}
      {/* <Notification/> */}
      {/* <OnlineClas/> */}
      {/* <Assignment/> */}
      {/* <SplashScreen/> */}
      {/* <Gallery/> */}
      {/* <Review/> */}
      {/* <Remarks/> */}
      {/* <ContactUs/> */}
      {/* <Feed/> */}
      {/* <StoryProfile/> */}
      {/* <PeopleLike/> */}
      {/* <Comment/> */}
      {/* <CommentPopup/> */}
      {/* <StoryPreview/> */}
      {/* <Preview /> */}
      {/* <ClassesAssigned/> */}
      {/* <Home/> */}
      {/* <TotalStudent/> */}
      {/* <ConfirmAttendance/> */}
      {/* <Standerd/> */}
      <Support/>
      
      {/* <TouchableOpacity style={{paddingTop:20,alignItems:"center"}} onPress={() => { props.navigation.navigate('ClassesAssigned') }}>
        <Text>ClassesAssigned</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{paddingTop:20,alignItems:"center"}} onPress={() => { props.navigation.navigate('Preview') }}>
        <Text>Preview</Text>
      </TouchableOpacity> */}
      
    </View>
  );
};

export default App;
