import React, { useState } from 'react';
import {
  StyleSheet, SafeAreaView, View, TouchableOpacity, Text, Alert, Modal, Pressable, Image
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

import * as actions from '../../Redux/actions/index';
import { palette } from '../../Utils/ColorScheme';
import NotificationTile from './NotificationTile';
import x from '../../assets/x.png';


export default function SettingsScreen() {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { updateProfilePhoto, updateColorScheme, logout } = bindActionCreators(actions, dispatch);

  const [modalVisible, setModalVisible] = useState(false);

  const choosePhotoAndUpdate = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('You have not granted PetPix permission to access your photos.');
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
        ]}>Update Profile Picture</Text>
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
            setModalVisible(true);
          }}
          underlayColor='#FFF'>
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[
              styles.modalView,
              {
                backgroundColor: palette(state.theme).buttonColor,
                borderColor: palette(state.theme).buttonBorderColor,
                shadowColor: palette(state.theme).shadowColor
              }
              ]}>
              <Text style={[
                styles.modalText,
                {
                  color: palette(state.theme).buttonText
                }
              ]}>Messages</Text>
              <Pressable
                style={[styles.exit]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Image
                  source={x}
                  style={[styles.exit]}
                ></Image>
              </Pressable>
              <NotificationTile/>
            </View>
          </View>
        </Modal>
        <Text style={[
          styles.buttonText,
          { color: palette(state.theme).buttonText }
        ]}>Notifications</Text>
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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    height: 'auto',
    width: 'auto',
    minHeight: 400,
    minWidth: 300,
    marginTop: 150,
    marginBottom: 200,
    margin: 10,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'flex-start',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  exit: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 5,
    right: 5
  }
});