// React | Redux
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';

// Components
import Header from '../Shared/Header';
import LogoBackButton from '../Shared/LogoBackButton';
import Tabs from '../Shared/Tabs';
import BackButton from '../Shared/BackButton';
import Google from '../Shared/Google';
import Twitter from '../Shared/Twitter';
import AccountInput from './components/AccountInput';
import NavBar from '../Shared/NavBar';

// Styling
import styles from '../Styles'
import { lightTheme, darkTheme } from '../../../constants';


const RegisterScreen = function() {
  const theme = useSelector(state => state.theme);
  const [current, setCurrent] = useState(() => {
    if (theme) {
      return lightTheme;
    } else {
      return darkTheme;
    }
  })

  return (
    <View style={[{ backgroundColor: current.pageColor }, styles.container]}>
      <Header />
      <LogoBackButton />
      <Tabs />
      <AccountInput />
      <Google />
      <Twitter />
    </View>
  )
}

export default RegisterScreen;
