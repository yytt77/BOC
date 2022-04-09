import { useState, getState } from 'react';
import { Text, View } from 'react-native';

import Authenticate from './AuthScreen';
import SignInScreen from './LoginScreen/SignIn';
import RegisterScreen from './RegisterScreen/Register';

export default function AuthScreen() {
  const [screen, setScreen] = useState('login');

  return (
    screen === 'login' ? (
      <SignInScreen />
    ) : (
      <RegisterScreen />
    )
  );
}
