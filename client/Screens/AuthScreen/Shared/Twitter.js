import { useCallback, useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

import axios from 'axios';

import { login } from '../../../Redux/actions';
import { API_IP } from '../../../constants.js';
const twitterRegEndpoint = `http://${API_IP}/user/auth/twitter`;

WebBrowser.maybeCompleteAuthSession();

export default function Twitter() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const screen = useSelector(state => state.user);

  const _openAuthSessionAsync = async () => {
    try {
      let result = await WebBrowser.openAuthSessionAsync(twitterRegEndpoint);
      let redirectData;
      if (result.url) {
        redirectData = Linking.parse(result.url);
      }

      let username = redirectData.queryParams.username;
      dispatch(login(username));
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  return (
    // button will include Twitter logo
    <View>
      <Button title="Register with Twitter" onPress={ () => _openAuthSessionAsync() }>Register with Twitter</Button>
    </View>
  )
}
