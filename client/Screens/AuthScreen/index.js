import { useState, getState } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import SignInScreen from './LoginScreen/LoginScreen.js';
import RegisterScreen from './RegisterScreen/Register';

const AuthScreen = function (props) {
  // login will be default once implemented
  return (
    props.authScreen === 'login' ? (
      <SignInScreen />
    ) : (
      <RegisterScreen />
    )
  );
}

const mapStateToProps = (state) => ({
  authScreen: state.authScreen
})

export default connect(mapStateToProps, null)(AuthScreen);
