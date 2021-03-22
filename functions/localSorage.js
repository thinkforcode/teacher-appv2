import AsyncStorage from '@react-native-async-storage/async-storage';

const setDataInLocal = async (loginData) => {
    try {
      await AsyncStorage.setItem('login', JSON.stringify(loginData));
    } catch (err) {
      console.log(err);
    }
  };

  const mergeDataInLocal = async (loginData) => {
    try {
      await AsyncStorage.mergeItem('login', JSON.stringify(loginData));
    } catch (err) {
      console.log(err);
    }
  };

  const mergeDataInshowIntroPage = async (introPageStatus) => {
    try {
      await AsyncStorage.setItem('showIntroPage', JSON.stringify(introPageStatus));
    } catch (err) {
      console.log(err);
    }
  };

  const clearLocalStorage = async () => {
    try {
     await AsyncStorage.removeItem('login')
    }
    catch(e){
    }
  }

  export {setDataInLocal, mergeDataInLocal, mergeDataInshowIntroPage, clearLocalStorage}