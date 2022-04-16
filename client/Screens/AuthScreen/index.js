import { useState, getState } from 'react';
import { Text, View } from 'react-native';

import SignInScreen from './LoginScreen/LoginScreen.js';
import RegisterScreen from './RegisterScreen/Register';

export default function AuthScreen() {
  // login will be default once implemented
  const [screen, setScreen] = useState('register');

  return (
    screen === 'login' ? (
      <SignInScreen />
    ) : (
      <RegisterScreen />
    )
  );
}
