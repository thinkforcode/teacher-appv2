import 'react-native-gesture-handler';
import React from 'react';
import { Text, View } from 'react-native';
import Login from './screens/AuthScreens/Login';
import AuthStack from './screens/AuthScreens/AuthStack';
import Otp from './screens/AuthScreens/Otp';
import Signup from './screens/RegistrationScreens/Signup';
import UserIntrest from './screens/RegistrationScreens/UserIntrest';

const App = () => {
 return (
    <View style = {{flex:1}}>
    
      {/* <Login/> */}
      {/* <Otp/> */}
      {/* <AuthStack/> */}
      <Signup/>
      {/* <UserIntrest /> */}
      
    </View>
  );
};

export default App;
 