
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux";
import IntroSlider from './screens/IntroSlider';
import Loader from './components/Loader';
import AuthStack from './screens/AuthScreens/AuthStack';
import RegisterStack from './screens/RegistrationScreens/RegisterStack';
import MainAppNavigator from './screens/MainApp';
import { updateUserData } from './redux/actions/mainActions';
import { navigationRef } from './RootNavigation.js';


const Routing = (props) => {
  const [loginData, setLoginData] = useState(null)
  const [introPageStatus, setIntroPageStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const {updateUserData} = props


  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const data = await AsyncStorage.getItem("login");
        const introData = await AsyncStorage.getItem("showIntroPage");
        setIntroPageStatus(JSON.parse(introData))
        setIsLoading(false)
        if (data!= null) {
          updateUserData(JSON.parse(data))
          setLoginData(JSON.parse(data))
        }
        else {
          updateUserData(props.authReducer.loginData)
          setLoginData(props.authReducer.loginData)
        }

      }
      catch (e) {
        setIsLoading(false)
       }
    };

    bootstrapAsync();

    return () => { }
  }, [props.authReducer.showIntroPage, props.authReducer.isOtpPage, props.authReducer.isBasicDetails, props.authReducer.isLogout, props.authReducer.isHome])




  return (
    <NavigationContainer ref = {navigationRef} >
      {
       isLoading ? <Loader />: introPageStatus == null ? (<IntroSlider />) : loginData != null ? !loginData.isBasicDetails ? (<RegisterStack />) : loginData.isBasicDetails ? (<MainAppNavigator />) : (<AuthStack />) : (<AuthStack />)
      }
    </NavigationContainer>
  );
};


const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  }; 
};

export default connect(mapStateToProps, {updateUserData })(Routing);


