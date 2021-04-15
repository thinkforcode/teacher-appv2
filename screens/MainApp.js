import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Attendance from './Attendance';
import OnlineClass from './OnlineClass';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Image } from 'react-native'
import AttendanceReport from './AttendanceReport';
import Notification from './Notification';
import Gallery from './Gallery';
import Assignment from './Assignment';
import CreateAssignment from './CreateAssignment';
import Settings from './Settings';
import ContactUs from './ContactUs';
import UserIntrest from './RegistrationScreens/UserIntrest';
import EditProfile from './EditProfile';
const MainStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTab = () => (
    <Tab.Navigator
        initialRouteName="Home"
        barStyle={{ backgroundColor: '#2B454E' }}
        activeColor="#000"
        inactiveColor="#fff"
        activeColor="#FFC800"
        labeled={true}
        shifting={false}
        lazy={true}
    >
        <Tab.Screen
            name="Home"
            component={Home}
            options={navigation => ({
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <Image source={require('../assets/icons/home.png')} style={{ tintColor: color }} />
                ),
            })}
        />

        <Tab.Screen
            name="OnlineClass"
            component={OnlineClass}
            options={navigation => ({
                tabBarLabel: 'Online Class',
                tabBarIcon: ({ color }) => (
                    <Image source={require('../assets/icons/onlineClass.png')} style={{ tintColor: color }} />
                ),
            })}
        />


        <Tab.Screen
            name="Attendance"
            component={Attendance}
            options={({ route }) => ({
                tabBarLabel: 'Attendance',
                tabBarIcon: ({ color }) => (
                    <Image source={require('../assets/icons/attendance.png')} style={{ tintColor: color }} />
                ),
            })}
        />


        <Tab.Screen
            name="Imanage"
            component={OnlineClass}
            options={{
                tabBarLabel: 'Imanage',
                tabBarIcon: ({ color }) => (
                    <Image source={require('../assets/icons/onlineClass.png')} style={{ tintColor: color }} />
                ),
            }}
        />


        <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({ color }) => (
                    <Image source={require('../assets/icons/curricullum.png')} style={{ tintColor: color }} />
                ),
            }}
        />
    </Tab.Navigator>

);


const MainAppNavigator = () => (
    <MainStack.Navigator headerMode={false}>
        <MainStack.Screen name="Home" component={MainTab} />
        <MainStack.Screen name="AttendanceReport" component={AttendanceReport} />
        <MainStack.Screen name="Notification" component={Notification} />
        <MainStack.Screen name="Gallery" component={Gallery} />
        <MainStack.Screen name="Assignment" component={Assignment} />
        <MainStack.Screen name="CreateAssignment" component={CreateAssignment} />
        <MainStack.Screen name="ContactUs" component={ContactUs} />
         <MainStack.Screen name="EditProfile" component={EditProfile} /> 
    </MainStack.Navigator>

)


export default MainAppNavigator;

