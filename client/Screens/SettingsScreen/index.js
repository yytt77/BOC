import React from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../Redux/actions/index';

import { palette } from '../../Utils/ColorScheme';

export default function SettingsScreen() {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { updateColorScheme } = bindActionCreators(actions, dispatch);

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: palette(state.theme).pageColor }
    ]}>
      <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: palette(state.theme).buttonColor,
              borderColor: palette(state.theme).buttonBorderColor
            }
          ]}
          onPress={() => Alert.alert('Upload Profile Picture Button Pressed')}
          underlayColor='#FFF'>
        <Text style={[
          styles.buttonText,
          { color: palette(state.theme).buttonText }
        ]}>Upload Profile Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: palette(state.theme).buttonColor,
              borderColor: palette(state.theme).buttonBorderColor
            }
          ]}
          onPress={() => {
            updateColorScheme();
          }}
          underlayColor='#FFF'>
        <Text style={[
          styles.buttonText,
          { color: palette(state.theme).buttonText }
          ]}>
          {(state.theme === true) ? 'Dark Mode' : 'Light Mode'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={[
            styles.logOutButton,
            {
              backgroundColor: palette(state.theme).buttonColor,
              borderColor: palette(state.theme).buttonBorderColor
            }
          ]}
          onPress={() => Alert.alert('Log Out Button Pressed')}
          underlayColor='#FFF'>
        <Text style={[
          styles.logOutButtonText,
          { color: palette(state.theme).buttonText }
          ]}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button:{
    height: 40,
    width: 240,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonText:{
    fontWeight: 'bold',
    textAlign:'center',
    paddingLeft: 5,
    paddingRight: 5
  },
  logOutButtonText: {
    fontWeight: 'bold',
    textAlign:'center',
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20
  },
  logOutButton: {
    height: 60,
    width: 120,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 250,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
  }
});