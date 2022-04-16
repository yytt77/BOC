import { useState } from 'react';
import { Alert, Button, Linking, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

import axios from 'axios';

import { API_IP } from '../../../constants.js';
const twitterRegEndpoint = `http://${API_IP}/user/auth/twitter`;
const twitterCbEndpoint = `http://${API_IP}/user/auth/twitter/callback`;

export default function Twitter() {
  const [webAuth, setWebAuth] = useState(<></>);

  const twitterReg = async () => {

    // console.log('RES ', results);

    // Linking.addEventListener('url', (url) => {
    //   console.log('URL ', url)

    //   WebBrowser.dismissBrowser();
    // })

    let result = await WebBrowser.openBrowserAsync(twitterRegEndpoint);
    console.log('RES ', result)
    setWebAuth(result);


    // Linking.openURL(twitterRegEndpoint);

    // try {
    //   const register = await axios.get(twitterRegEndpoint);
    //   console.log('T ', register.data);
    //   await Linking.openURL(register.data);
    // } catch (err) {
    //   console.log(err);
    // }
  }

  return (
    // button will include Twitter logo
    <View>
      <Button title="Register with Twitter" onPress={ () => twitterReg() }>Register with Twitter</Button>
      <Text>
        {typeof webAuth !== 'object' ? (
          webAuth
        ) : (
          <></>
        )}
      </Text>
    </View>
  )
}
