import React from 'react';
import { Button, View, Platform } from 'react-native';
import * as ScreenCapture from 'expo-screen-capture';
import * as MediaLibrary from 'expo-media-library';


export default class ScreenShotDetector extends React.Component {
  async componentDidMount() {
    // This permission is only required on Android
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      ScreenCapture.addScreenshotListener(() => {
        alert('Thanks for screenshotting my beautiful app 😊');
      });
    }
  }

  render() {
    return null;
  }
}