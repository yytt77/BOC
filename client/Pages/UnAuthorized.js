import { useState, getState } from 'react';
import { Button, Text, View } from "react-native";
import { connect, useSelector, useDispatch } from 'react-redux';

import DiscoverScreen from '../Screens/DiscoverScreen/index';
import AuthScreen from '../Screens/AuthScreen/index';
import { guestAuth } from '../Redux/actions';

const UnAuthorized = (props) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const screen = useSelector(state => state.guestHome);

  // <DiscoverScreen />
  return (
    props.guestHome === 'home' ? (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Button title={'Login Icon Here'} onPress={() => dispatch(guestAuth())}></Button>
      </View>
    ) : (
      <AuthScreen />
    )
  )
};

const mapStateToProps = (state) => ({
  guestHome: state.guestHome
})

export default connect(mapStateToProps, null)(UnAuthorized);
