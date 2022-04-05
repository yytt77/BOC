import React from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../Redux/actions/index';

export default function SettingsScreen() {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { increment, decrement } = bindActionCreators(actions, dispatch);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
          style={styles.uploadProfilePictureButton}
          // onPress={() => Alert.alert('Upload Profile Picture Button Pressed')}
          onPress={() => increment(10)}
          underlayColor='#FFF'>
        <Text style={styles.uploadProfilePictureText}>Upload Profile Picture</Text>
      </TouchableOpacity>
      <Text>{state.uploadProfilePictureClickCount}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#84C0FB'
  },
  uploadProfilePictureButton:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#57D785',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#6E96BD'
  },
  uploadProfilePictureText:{
      color:'#FEFB9F',
      fontWeight: 'bold',
      textAlign:'center',
      paddingLeft : 5,
      paddingRight : 5
  }
});