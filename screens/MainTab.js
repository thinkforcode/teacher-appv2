import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ClassesAssigned from './ClassesAssigned';
import Preview from '../components/Preview';



const MainStack = createStackNavigator();



const MainAppNavigator = () => (
    <NavigationContainer>
    <MainStack.Navigator>
   
    <MainStack.Screen name="ClassesAssigned" component={ClassesAssigned} />
    <MainStack.Screen name="Preview" component={Preview} />

    </MainStack.Navigator>
    </NavigationContainer>
)
    

export default MainAppNavigator
