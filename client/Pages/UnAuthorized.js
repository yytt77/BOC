import { useState } from 'react';
import { Button, Text, View } from "react-native";

import AuthScreen from "../Screens/AuthScreen/index";

const UnAuthorized = () => {
  const [screen, setScreen] = useState('home')

  return (
    screen === 'auth' ? (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Discovery Feed Here</Text>
        <Button title={'Login Icon Here'} onPress={() => setScreen('auth')}></Button>
      </View>
    ) : (
      <AuthScreen />
    )
  )
};

export default UnAuthorized;
