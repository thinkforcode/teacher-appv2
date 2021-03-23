import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Otp from './Otp';


const AuthStackNavigator = createStackNavigator();

const AuthStack = ({ navigation }) => (
    <AuthStackNavigator.Navigator>
        <AuthStackNavigator.Screen options={{ headerShown: false }} name="Let’s get started" component={Login} />
        <AuthStackNavigator.Screen options={{ headerShown: false }} name="Otp" component={Otp} />
    </AuthStackNavigator.Navigator>
);

export default AuthStack;