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
  console.log('AUTH DOMAIN ', AUTH_DOMAIN)
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

  console.log(`Redirect URL: ${redirectUri}`);

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

  let styles = StyleSheet.create({ // temp
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      textAlign: "center",
      marginTop: 40,
    },
  });

  // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //   <TouchableOpacity onPress={() => onRegisterPress()}>
  //     <Text>Register Screen</Text>
  //   </TouchableOpacity>
  // </View>

  console.log('NAME ', name);
  return (
    <View style={styles.container}>
      {name ? (
        <>
          <Text style={styles.title}>You are logged in, {name.nickname}!</Text>
          <Button title="Log out" onPress={() => setName(null)} />
        </>
      ) : (
        <Button
          disabled={!request}
          title='Log in with Auth0'
          onPress={() => promptAsync({ useProxy })}
        />
      )}
    </View>
  );
}