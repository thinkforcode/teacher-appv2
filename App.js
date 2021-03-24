import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Text, View,StatusBar } from 'react-native';
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
const App = () => {

    useEffect(() => {
         SplashScreen.hide();
        return () => { }
  }, [])

 return (
    <View style = {{flex:1}}>
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
             <Preview/>
    </View>
  );
};

export default App;
 