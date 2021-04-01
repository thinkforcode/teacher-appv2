
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Routing from './Routing';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import { PermissionsAndroid, LogBox } from 'react-native'


const App = (props) => {

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])


  useEffect(() => {
    SplashScreen.hide();
    return () => { }
  }, [])



  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
};

export default App
