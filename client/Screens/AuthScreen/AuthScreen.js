import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';

import { useEffect, useNavigationState, useState } from 'react';
import { Text, View, Platform, Button, StyleSheet } from 'react-native';

import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../Redux/actions/authorizeUser';

import { AUTH_DOMAIN, AUTH_CLIENT_ID } from '../../constants';
import API_IP from '../../constants.js';
import DiscoverScreen from '../DiscoverScreen';

const authorizationEndpoint = `${AUTH_DOMAIN}/authorize`;
const useProxy = Platform.select({web: false, default: true});
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

import axios from 'axios';

export default function Authenticate() {

  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const { login, logout } = bindActionCreators(actions, dispatch);

  const [accessToken, setAccessToken] = useState();
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: AUTH_CLIENT_ID,
      responseType: 'id_token',
      scopes: ['openid', 'profile'],
      extraParams: {
        nonce: 'nonce'
      }
    },
    { authorizationEndpoint }
  );

  // console.log(`Redirect URL: ${redirectUri}`);

  useEffect(() => {
    if (result) {
      if (result.error) {
        Alert.alert(
          'Authentication error',
          result.params.error_description || 'something went wrong'
        );
        return;
      }

      if (result.type === 'success') {
        const jwtToken = result.params.id_token;
        const decoded = jwtDecode(jwtToken);
        let name = decoded;
        login(name.name);
      }
    }
  }, [result]);

  return (
    <View>
      <Button
        disabled={!request}
        title='Log In'
        onPress={() => promptAsync({ useProxy })}
      />
    </View>
  );
}
