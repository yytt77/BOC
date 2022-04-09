import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

import AccountInput from './components/AccountInput';
import { Register as styles } from './Styles'
import { colorTheme1 } from '../../../constants';

export default function RegisterScreen() {
  return (
    <View style={[{ backgroundColor: `${colorTheme1.pageColor}` }, styles.container]}>
      <View>
        <Text>Login and Register Container Here</Text>
      </View>
      <AccountInput />
    </View>
  )

}