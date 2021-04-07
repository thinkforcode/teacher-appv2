import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SelectClass from './SelectClass';
import TotalStudent from './TotalStudent';
import Home from './Home';
import Attendance from './Attendance';
import OnlineClass from './OnlineClass';
import ClassCurriculum from './ClassCurriculum';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {Image} from 'react-native'

const MainStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


const MainTab = () => (
    <Tab.Navigator initialRouteName="Home" barStyle={{ backgroundColor: '#2B454E' }} activeColor="#000"
        inactiveColor="#fff"
        activeColor="#FFC800"
        labeled={true} shifting={true} lazy={true}>
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
            name="Chat"
            component={OnlineClass}
            options={{
                tabBarLabel: 'Online Class',
                tabBarIcon: ({ color }) => (
                    <Image source={require('../assets/icons/onlineClass.png')} style={{ tintColor: color }} />
                ),
            }}
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
            name="ClassCurriculum "
            component={ClassCurriculum}
            options={{
                tabBarLabel: 'Curriculum',
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
          {/* <MainStack.Screen name="SelectClass" component={SelectClass} />  */}
          {/* <MainStack.Screen name="Home" component={Home} />  */}
          {/* <MainStack.Screen name="TotalStudent" component={TotalStudent} />  */}
        {/* <MainStack.Screen name="Home" component={MainTab} /> */}


    </MainStack.Navigator>

)


export default MainAppNavigator;

