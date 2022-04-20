import { useState, getState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import SignInScreen from './LoginScreen/LoginScreen.js';
import RegisterScreen from './RegisterScreen/Register';

const AuthScreen = function () {
  const authScreen = useSelector(state => state.authScreen);

  return (
    authScreen === 'login' ? (
      <SignInScreen />
    ) : (
      <RegisterScreen />
    )
  );
}

export default AuthScreen;
