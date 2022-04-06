import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import { useEffect, useNavigationState, useState } from 'react';
import { Text, View, Platform, Button, StyleSheet } from 'react-native';

import { AUTH_DOMAIN, AUTH_CLIENT_ID } from '../../constants';

const authorizationEndpoint = `${AUTH_DOMAIN}/authorize`;
const useProxy = Platform.select({web: false, default: true});
const redirectUri = AuthSession.makeRedirectUri({ useProxy });
import API_IP from '../../constants.js';

import axios from 'axios';

export default function Authenticate() {
  const [accessToken, setAccessToken] = useState();
  let [name, setName] = useState(null);
  // console.log('AUTH DOMAIN ', AUTH_DOMAIN)
  let [request, result, promptAsync] = AuthSession.useAuthRequest(
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
        setName(name)
      }
    }
  }, [result]);

  // console.log('NAME ', name);

  return (
    <View>
      {name ? (
        <>
          <Text>You are logged in, {name.nickname}!</Text>
          <Button title="Log out" onPress={() => setName(null)} />
        </>
      ) : (
        <Button
          disabled={!request}
          title='Log in'
          onPress={() => promptAsync({ useProxy })}
        />
      )}
    </View>
  );
}