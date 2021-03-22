  
import {  ToastAndroid } from 'react-native';

export const Toaster = {
    showToast: (message, duration, pos) => {
        ToastAndroid.showWithGravity(
            `${message}`,
            `${duration}`,
            `${pos}`
          );
    },
};


