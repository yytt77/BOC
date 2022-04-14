import React from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text, Alert } from 'react-native';
import axios from 'axios';

import * as ImagePicker from 'expo-image-picker';

import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../Redux/actions/index';

import { palette } from '../../Utils/ColorScheme';

export default function SettingsScreen() {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { updateProfilePhoto, updateColorScheme, logout } = bindActionCreators(actions, dispatch);

  const choosePhotoAndUpdate = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("You have not granted PetPix permission to access your photos.");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      exif: true,
    });

    if (!result.cancelled) {
      let url = result.uri;
      updateProfilePhoto(url);
      axios({
        method: 'patch',
        baseURL: 'http://localhost:3000',
        url: '/user/profPhoto',
        data: {
          username: 'test',
          profPhoto: url
        }
      }).then(result => {
        console.log('Success: ', result.status);
      }).catch(err => {
        console.log(`Error updating profile photo: ${err}`);
      })
    }
    // console.log('profPhotoUrl out', state.user.userInfo.profPhoto);
    // console.log('state out', state);
  }

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
          onPress={() => {
            choosePhotoAndUpdate();
          }}
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
            choosePhotoAndUpdate();
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
          onPress={() => {
            logout();
          }}
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