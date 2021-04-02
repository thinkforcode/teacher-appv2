import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import SelectClass from './SelectClass';
import TotalStudent from './TotalStudent';
import Assignment from './Assignment';
import Gallery from './Gallery';

const MainStack = createStackNavigator();


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







const MainAppNavigator = () => (
    <MainStack.Navigator headerMode={false}>
          <MainStack.Screen name="SelectClass" component={SelectClass} /> 
          <MainStack.Screen name="Home" component={Home} /> 
          <MainStack.Screen name="TotalStudent" component={TotalStudent} /> 
          <MainStack.Screen name="Assignment" component={Assignment} />
          <MainStack.Screen name="Gallery " component={Gallery} />
        {/* <MainStack.Screen name="Home" component={MainTab} /> */}


    </MainStack.Navigator>

)


export default MainAppNavigator;

