import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Signup from './Signup';
import UserIntrest from './UserIntrest';

const RootStack = createStackNavigator();

const RegisterStack = ({ navigation }) => (
    <RootStack.Navigator>
        <RootStack.Screen options={{ headerShown: false }} name = "Signup"  component={Signup} />
        <RootStack.Screen options={{ headerShown: false }}  name = "UserIntrest"   component={UserIntrest} />
    </RootStack.Navigator>
);

export default RegisterStack;