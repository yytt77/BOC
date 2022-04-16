//import { Text, View, Image } from 'react-native';

import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';

import PetPixLogo from '../../../Templates/PetPixLogo';
import Tabs from '../Shared/Tabs';
import BackButton from '../Shared/BackButton';
import Google from '../Shared/Google';
import Twitter from '../Shared/Twitter';


import AccountInput from './AccountInput.js';
import PasswordInput from './PasswordInput.js';
import ForgotPassword from './ForgotPassword.js';
import ContinueButton from './ContinueButton.js';
import Logo from '../../../assets/logo_small.png';


//import { Register as styles } from '..RegisterScreen/Styles'
import { Register as styles } from '../RegisterScreen/Styles'

import { lightTheme, darkTheme } from '../../../constants';


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
      <PasswordInput />
      <Text>Forgot password?</Text>
      <ContinueButton />
    </View>
  )
}

const mapStateToProps = (state) => ({
  theme: state.theme
})

export default connect(mapStateToProps, null)(SignInScreen);


// export default function SignInScreen() {

//    const onPressSignInButton = () => {
//      //send login and password to backend
//      //receive answer from backend
//    }

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Image
//       source = {Logo} />
//       <BackButton />
//       <Text>Sign in here</Text>
//       <AccountInput />
//       <PasswordInput />
//      <Text>Forgot password?</Text>
//       <ContinueButton onPress = {onPressSignInButton} />
//     </View>
//   );
// }//
