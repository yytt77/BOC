import { useState } from 'react';
import { Button, Text, View } from "react-native";

import AuthScreen from "../Screens/AuthScreen/index";

const UnAuthorized = () => {
  // home will be default once implemented
  const [screen, setScreen] = useState('auth')

  return (
    screen === 'home' ? (
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
