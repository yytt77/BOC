import { useState, getState } from 'react';
import { Button, Text, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux';

import DiscoverScreen from '../Screens/DiscoverScreen/index';
import AuthScreen from '../Screens/AuthScreen/index';
import { guestAuth } from '../Redux/actions';

const UnAuthorized = () => {
  const guestHome = useSelector(state => state.guestHome);
  const dispatch = useDispatch();

  // <DiscoverScreen />
  return (
    guestHome === 'home' ? (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Button title={'Login Icon Here'} onPress={() => dispatch(guestAuth())}></Button>
      </View>
    ) : (
      <AuthScreen />
    )
  )
};

export default UnAuthorized;
