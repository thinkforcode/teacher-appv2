package com.digitlschool;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen; //spash screen package 

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

@Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  //called splash screen 
        super.onCreate(savedInstanceState);
    }

  @Override
  protected String getMainComponentName() {
    return "teacherApp";
  }
   
}


