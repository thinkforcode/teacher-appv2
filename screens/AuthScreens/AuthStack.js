import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Otp from './Otp';


const RootStack = createStackNavigator();

const AuthStack = ({ navigation }) => (
    <RootStack.Navigator>
        <RootStack.Screen options={{ headerShown: false }} name="Let’s get started" component={Login} />
        <RootStack.Screen options={{ headerShown: false }} name="Otp" component={Otp} />
    </RootStack.Navigator>
);

export default AuthStack;