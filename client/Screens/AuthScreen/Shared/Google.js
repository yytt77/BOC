import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';

import { login } from '../../../Redux/actions';
import { API_IP } from '../../../constants.js';

import styles from './Styles'
import { lightTheme, darkTheme } from '../../../constants';
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "expo-font";


const googleRegEndpoint = `http://${API_IP}/user/login/federated/google`;

WebBrowser.maybeCompleteAuthSession();

export default function Google() {
  const state = useSelector(state => state);
  const authScreen = useSelector(state => state.authScreen);
  const theme = useSelector(state => state.theme);
  const [current, setCurrent] = useState(() => {
    if (theme) {
      return lightTheme;
    } else {
      return darkTheme;
    }
  });

  const [screen, setScreen] = useState(() => {
    if (authScreen === 'login') {
      return 'Login';
    } else {
      return 'Register';
    }
  });

  const [fontsLoaded] = useFonts({
    comicSans: require('../../../assets/fonts/comic.ttf')
  });

  const dispatch = useDispatch();
  const _openAuthSessionAsync = async () => {
    try {
      let result = await WebBrowser.openAuthSessionAsync(googleRegEndpoint);
      let redirectData;
      if (result.url) {
        redirectData = Linking.parse(result.url);
      }

      let username = redirectData.queryParams.username;
      dispatch(login(username));
    } catch (err) {
      alert('Unable to connect to Google.');
    }
  }

  return (
    <View style={styles.googleContainer}>
      <Pressable
        style={[{ backgroundColor: current.buttonColor }, styles.socialButton]}
        title="Register with Google"
        onPress={ () => _openAuthSessionAsync() }>
        <View
          style={styles.socialInner}>
          <FontAwesome5
            name='google'
            size={30}
            color={current.iconColor}
          />
          <Text
            style={[{ color: current.tabIconInactive }, styles.socialText]}>
            &nbsp;&nbsp;{screen} with Google
          </Text>
        </View>
      </Pressable>
    </View>
  )
}
