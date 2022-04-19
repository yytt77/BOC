//import { Text, View, Image } from 'react-native';

import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';

import PetPixLogo from '../../../Templates/PetPixLogo';
import Tabs from '../Shared/Tabs';
import BackButton from '../Shared/BackButton';
import Google from './Google';
import Twitter from '../Shared/Twitter';


import AccountInput from './AccountInput.js';
import PasswordInput from './PasswordInput.js';
import ContinueButton from './ContinueButton.js';
import Logo from '../../../assets/logo_small.png';


//import { Register as styles } from '..RegisterScreen/Styles'
import { Register as styles } from '../RegisterScreen/Styles'

import { lightTheme, darkTheme } from '../../../constants.js';


const SignInScreen = function(props){
  var theme;
  if (props.theme) {
    theme = lightTheme;
  } else {
    theme = darkTheme;
  }


  return (
    <View style={[{ backgroundColor: theme.pageColor }, styles.container]}>
      <PetPixLogo />
      <BackButton />
      <Tabs />
      <AccountInput />
      <Google />
      <Twitter />
    </View>
  )
}

const mapStateToProps = (state) => ({
  theme: state.theme
})

export default connect(mapStateToProps, null)(SignInScreen);


