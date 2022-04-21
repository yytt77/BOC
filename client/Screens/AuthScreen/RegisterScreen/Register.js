import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';

// import HeaderTemplate from '../../../Templates/HeaderTemplate';
import PetPixLogo from '../../../Templates/PetPixLogo';
import Tabs from '../Shared/Tabs';
import BackButton from '../Shared/BackButton';
import Google from '../Shared/Google';
import Twitter from '../Shared/Twitter';
import AccountInput from './components/AccountInput';
import { Register as styles } from './Styles'
import { lightTheme, darkTheme } from '../../../constants';

// console.log(props.theme)
const RegisterScreen = function() {
  const theme = useSelector(state => state.theme);

  var current;
  if (theme) {
    current = lightTheme;
  } else {
    current = darkTheme;
  }

  return (
    <View style={[{ backgroundColor: current.pageColor }, styles.container]}>
      <PetPixLogo />
      <BackButton />
      <Tabs />
      <AccountInput />
      <Google />
      <Twitter />
    </View>
  )
}

export default RegisterScreen;
