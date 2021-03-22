import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Assignment from './Assignment';
import Notification from './Notification';


const MainStack = createStackNavigator();

const MainTab = () => {
    return (
        <View>
            <Text>Main Tab</Text>
        </View>
    )
}

const MainAppNavigator = () => (
    <MainStack.Navigator>
        
        <MainStack.Screen name="Notification" component={Notification} />
    <MainStack.Screen name="Assignment" component={Assignment} />

    </MainStack.Navigator>
)
    

export default MainTab
