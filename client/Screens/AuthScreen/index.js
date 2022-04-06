import { Text, View } from "react-native";
import { useState, useNavigationState } from "react";
import { AuthSession } from "expo";

import { AUTH_DOMAIN, AUTH_CLIENT_ID } from '../../constants';
import RegisterScreen from './RegisterScreen' //temp

const auth0 = ({domain: AUTH_DOMAIN, clientId: AUTH_CLIENT_ID});

// <RegisterScreen />
export default function AuthScreen() {
  const [accessToken, setAccessToken] = useState();

  const startAuth = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    let authUrl = `${AUTH_DOMAIN}/authorize` + toQueryString({
      client_id: AUTH_CLIENT_ID,
      response_type: 'token',
      scope: 'openid profile email',
      redirect_uri: redirectUrl
    })

    console.log('AUTH TEST ', authUrl);
    let result = await AuthSession.startAsync({
      authUrl: authUrl
    })

    if (result.type === 'success') {
      console.log('RESULT ', result);
      let token = result.params.access_token;
      setAccessToken(token);
      console.log('TOKEN ', token);
      // this.props.navigation.navigate('Next Screen');
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Random Feed Here</Text>
      <Text onPress={() => startAuth()}>Login Button</Text>
    </View>
  );
}