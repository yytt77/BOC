import React, { useState } from 'react';
import {
  StyleSheet, SafeAreaView, View, TouchableOpacity, Text, Alert, Modal, Pressable, Image
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import * as actions from '../../Redux/actions/index';
import { palette } from '../../Utils/ColorScheme';
import NotificationTile from './NotificationTile';
import x from '../../assets/x.png';
import { CLOUDINARY_API, upload_preset } from '@env';


export default function SettingsScreen() {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { updateProfilePhoto, updateColorScheme, logout } = bindActionCreators(actions, dispatch);

  const [modalVisible, setModalVisible] = useState(false);

  const isLessThanTenMB = (fileSize: number, smallerThanSizeMB: number) => {
    const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB
    return isOk
  }

  const handleCloudinaryUpload = async (file)  =>  {

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', upload_preset);

    await fetch(CLOUDINARY_API,{ method:'post', body:data })
      .then(async res => {
        return await res.json();
      })
      .then(data => data.url)
      .catch((error) => {
        alert('You picture upload failed. Please try again.');
        console.error('Error:', error);
      });
  }

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
      let filepath = result.uri;
      let fileInfo = await FileSystem.getInfoAsync(filepath);
      let file = {
        uri:  filepath,
        type: `profile/${filepath.split(".")[1]}`,
          name: `profile.${filepath.split(".")[1]}`
      };
      const isLt10MB = isLessThanTenMB(fileInfo.size, 10);
      if (!isLt10MB) {
        alert('Image size must be smaller than 10MB.');
        return;
      }

      let data = new FormData();
      data.append('file', file);
      data.append('upload_preset', upload_preset);

      await fetch(CLOUDINARY_API, { method:'post', body: data })
        .then(async res => {
          return await res.json();
        })
        .then(data => {
          let profPhotoUrl = data.url;
          updateProfilePhoto(profPhotoUrl);
          axios({
            method: 'patch',
            baseURL: 'http://54.215.206.56',
            url: '/user/profPhoto',
            data: {
              username: 'troyqyang',
              profPhoto: profPhotoUrl
            }
          }).then(result => {
            console.log('Success: ', result.status);
          }).catch(err => {
            console.log(`Error updating profile photo: ${err}`);
          });
      })
      .catch((error) => {
        alert('You picture upload failed. Please try again.');
        console.error('Error:', error);
      });
    }
  }

  const getNotificationData = () => {
    const defaultData = [
      {
        "_id": 0,
        "fromuser": "glen",
        "to" : "joe",
        "url" : "https://placeimg.com/100/100/animals",
        "caption": "hello world",
        "createdAt" : "2022-04-14T21:07:14.225Z",
      },
      {
        "_id": 1,
        "fromuser": "troy",
        "to": "ash",
        "url": "https://placeimg.com/100/100/animals",
        "caption": "new pet",
        "createdAt": "2022-04-14T22:07:14.225Z",
      },
      {
        "_id": 2,
        "fromuser": "dominic",
        "to": "jenya",
        "url": "https://placeimg.com/100/100/animals",
        "caption": "d tempor incididunt ut labore et dolore magna al",
        "createdAt": "2022-04-14T23:07:14.225Z",
      },
      {
        "_id": 3,
        "fromuser" : "jenya",
        "to" : "dominic",
        "url" : "https://placeimg.com/100/100/animals",
        "caption": "bus pulvinar elementum integer ",
        "createdAt" : "2022-04-14T24:07:14.225Z",
      }
    ];
    axios({
      method: 'get',
      // baseURL: 'http://localhost:3000',
      baseURL: 'http://54.215.206.56',
      url: '/post/discover?limit=2&offset=0',
      params: { username: state.user.userInfo.username }
    }).then(result => {
      console.log('Success: ', result);
      return result;
    }).catch(err => {
      console.log(`Error getting notifications: ${err}`);
      return defaultData;
    })
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
              ]}>Notifications</Text>
              <Pressable
                style={[styles.exit]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Image
                  source={x}
                  style={[styles.exit]}
                ></Image>
              </Pressable>
              <NotificationTile data={getNotificationData()}/>
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