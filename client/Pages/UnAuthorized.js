import { useState, getState } from 'react';
import { Button, Text, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux';

import AuthScreen from '../Screens/AuthScreen/index';
import { guestAuth } from '../Redux/actions';

const UnAuthorized = () => {
  const guestHome = useSelector(state => state.guestHome);
  const dispatch = useDispatch();

  return (
    guestHome === 'home' ? (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Discovery Feed Here</Text>
        <Button title={'Login Icon Here'} onPress={() => dispatch(guestAuth())}></Button>
      </View>
    ) : (
      <AuthScreen />
    )
  )
};

export default UnAuthorized;
