import React from 'react';
import { Image, } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import SelectClass from './SelectClass';
import TotalStudent from './TotalStudent';




const MainStack = createStackNavigator();
const BrainTrainStackNavigator = createStackNavigator()
const TutorialStackNavigator = createStackNavigator()


// const MainTab = () => (
//     <Tab.Navigator initialRouteName="Home" barStyle={{ backgroundColor: '#fff' }} activeColor="#000"
//         inactiveColor="#35365F"
//         activeColor="#E61A50"
//         labeled={true} shifting={true} lazy={true}>
//         <Tab.Screen
//             name="Home"
//             component={Home}
//             options={navigation => ({
//                 tabBarLabel: 'Home',
//                 tabBarIcon: ({ color }) => (
//                     <Image source={require('../assets/icons/light-home.png')} style={{ tintColor: color }} />
//                 ),
//             })}
//         />

//         <Tab.Screen
//             name="AttendanceReport"
//             component={AttendanceReport}
//             options={navigation => ({
//                 tabBarLabel: 'Attendance',
//                 tabBarIcon: ({ color }) => (
//                     <Image source={require('../assets/icons/attendance-check.png')} style={{ tintColor: color }} />
//                 ),
//             })}
//         />


//         <Tab.Screen
//             name="FeePayment"
//             component={FeePayment}
//             options={{
//                 tabBarLabel: 'Pay fee',
//                 tabBarIcon: ({ color }) => (
//                     <Image source={require('../assets/icons/rupee-indian.png')} style={{ tintColor: color }} />
//                 ),
//             }}
//         />

//         <Tab.Screen
//             name="ChatList"
//             component={ChatList}
//             options={({ route }) => ({
//                 tabBarLabel: 'Chat',
//                 // tabBarVisible: getTabBarVisibility(route),
//                 tabBarIcon: ({ color }) => (
//                     <Image source={require('../assets/icons/light-chat.png')} style={{ tintColor: color }} />
//                 ),
//             })}
//         />

//         <Tab.Screen
//             name="Settings"
//             component={Settings}
//             options={{
//                 tabBarLabel: 'Setting',
//                 tabBarIcon: ({ color }) => (
//                     <Image source={require('../assets/icons/light-setting.png')} style={{ tintColor: color }} />
//                 ),
//             }}
//         />
//     </Tab.Navigator>

// );




// const TutorialStack = () => (
//     <TutorialStackNavigator.Navigator headerMode={false}>
//         <TutorialStackNavigator.Screen name="ListTutorial" component={ListTutorial} />
//         <TutorialStackNavigator.Screen name="TutorialWeb" component={TutorialWeb} />
//     </TutorialStackNavigator.Navigator>
// )



const MainAppNavigator = () => (
    <MainStack.Navigator headerMode={false}>
          {/* <MainStack.Screen name="Home" component={Home} />  */}
          <MainStack.Screen name="SelectClass" component={SelectClass} /> 
          <MainStack.Screen name="Home" component={Home} /> 
          <MainStack.Screen name="TotalStudent" component={TotalStudent} /> 

        {/* <MainStack.Screen name="Home" component={MainTab} /> */}
        {/* <MainStack.Screen name="Notification" component={Notification} />
        <MainStack.Screen name="Categories" component={Categories} />
        <MainStack.Screen name="Curriculum" component={Curriculum} />
        <MainStack.Screen name="OnlineClass" component={OnlineClass} />
        <MainStack.Screen name="Assignment" component={Assignment} />
        <MainStack.Screen name="Test" component={Test} />
        <MainStack.Screen name="Gallery" component={Gallery} />
        <MainStack.Screen name="Review" component={Review} />
        <MainStack.Screen name="Remarks" component={Remarks} />
        <MainStack.Screen name="Preview" component={Preview} />
        <MainStack.Screen name="Message" component={Message} />
        <MainStack.Screen name="Holiday" component={Holiday} />
        <MainStack.Screen name="Comments" component={Comments} />
        <MainStack.Screen name="CommentsPopup" component={CommentsPopup} />
        <MainStack.Screen name="AttendanceReport" component={AttendanceReport} />
        <MainStack.Screen name="Popup" component={Popup} />
        <MainStack.Screen name="Popupone" component={Popupone} />
        <MainStack.Screen name="ContactUs" component={ContactUs} />
        <MainStack.Screen name="StoryPreview" component={StoryPreview} />
        <MainStack.Screen name="StoryProfile" component={StoryProfile} />
        <MainStack.Screen name="CreatePost" component={CreatePost} />
        

        <MainStack.Screen name="PeopleLike" component={PeopleLike} />
        <MainStack.Screen name="TutorialStackScreen" component={TutorialStack} />
        <BrainTrainStackNavigator.Screen name="BrainTrainDetails" component={BrainTrainDetails} />
        <MainStack.Screen name="Chat" component={Chat} />
        <MainStack.Screen name="Camera" component={Camera} />
        <MainStack.Screen name="ImagePreview" component={ImagePreview} />
        
        <MainStack.Screen name="EditProfile" component={EditProfile} />
        <MainStack.Screen name="EditIntrest" component={EditIntrest} />
        <MainStack.Screen name="MediaPlayer" component={MediaPlayer} />
        <MainStack.Screen name="Complain" component={Complain} />
        <MainStack.Screen name="Gatepass" component={Gatepass} />
        <MainStack.Screen name="ComplainConversation" component={ComplainConversation} /> */}

    </MainStack.Navigator>

)


export default MainAppNavigator;

