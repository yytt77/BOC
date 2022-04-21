import React from 'react';
import { Button, View, Platform } from 'react-native';
import * as ScreenCapture from 'expo-screen-capture';
import * as MediaLibrary from 'expo-media-library';
import {connect} from 'react-redux';
import axios from 'axios';
import { API_IP } from '../constants';


class ScreenShotDetector extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        reduxState : {}
    };
    this.postRequest = this.postRequest.bind(this);
  }

  async componentDidMount() {
    // This permission is only required on Android
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      ScreenCapture.addScreenshotListener(() => {
        alert('Thanks for screenshotting PetPix 😊');
        this.postRequest(this.props.notification);
      });
    }
  }

  postRequest(notification) {
    if (notification['touser'] && notification['url']) {
      notification['fromuser'] = 'joe';
      console.log('let see state', notification);
      fetch(`http://${API_IP}/post/screenshot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
      })
      .then(response => response.json())
      .then((results) => {
        console.log('res', results);
      })
      .catch((err) => {
      })
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(ScreenShotDetector)