//External Libraries
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Button, Image, Text, View, Platform, TouchableOpacity, TextInput, Alert, Modal, Pressable, ScrollView} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import { Cloudinary } from '@cloudinary/url-gen';
import axios from 'axios';
import { CLOUDINARY_API, upload_preset } from '@env';
import { useNavigation } from '@react-navigation/native';

//Internal Dependencies
import { getLocally, storeLocally, removeLocally } from '../../LocalStorage/index';

//Components
import CameraRoll  from '../UploadScreen/CameraRoll';
import Gallery  from '../UploadScreen/Gallery';
import FeedTemplate from '../../Templates/FeedTemplate';
import styles from '../UploadScreen/Styles';
import HeaderTemplate from '../../Templates/HeaderTemplate';
import { colorTheme1 } from '../../constants';
import { palette } from '../../Utils/ColorScheme';
import { API_IP } from '../../constants';
import DiscoverScreen from '../DiscoverScreen/index'

export default function Upload({ navigation }) {
// console.log(CLOUDINARY_API, upload_preset)
  //define states
  const didMount = useRef(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const [imgURL, setImgURL] = useState(null);
  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);
  const [readytoSend, setReadytoSend] = useState(false);
  const state = useSelector(state => state);
  const userData = useSelector(state => state.user);

  // camera access functionality
  const CameraAccess = () => {
    async function camera() {
      return await CameraRoll();
    }
    camera().then(() => {
      return getLocally("image");
    })
    .then((res) => {
        let img = JSON.parse(res);
        if (img) {
          setImage(img[img.length - 1]);
        }
    })
    .catch((err) => console.error(err));
  }

  // gallery access functionality
  const GalleryAccess = () => {
    async function gallery() {
        return await Gallery();
    }
    gallery().then(() => {
      return getLocally("image");
    })
    .then((res) => {
      let img = JSON.parse(res);
      if (img) {
        setImage(img[img.length - 1]);
        return getLocally('imageGPS');
      }
    })
    .then((gps) => {
      if (gps === undefined) {
        return;
      }
      let gpsData = JSON.parse(gps);
      if (gpsData[0] && gpsData[1]) {
        setLatitude(gpsData[0]);
        setLongitude(-gpsData[1]);
        locationPicker(gpsData[0], -gpsData[1]);
      } else {
        if (isSelected) {
          locationPicker(undefined, undefined);
        }
      }
    })
    .catch((err) => console.error(err));
  }

  //upload picture to cloudinary API
  const handleUpload = async (image)  =>  {

    const data = new FormData();
    data.append('file',image);
    data.append('upload_preset',upload_preset);

    await fetch(CLOUDINARY_API,{ method:'post', body:data })
      .then(async res => {
        return await res.json();
      })
      .then((data) => { setImgURL(data.url); })
      .then(() => { setModalVisible(!modalVisible); })
      .catch((error) => {
        setModalVisible(!modalVisible);
        alert('You picture upload failed, please upload another lovely pet 😩');
        console.error('Error:', error);
      });
  }

  //to Detect if new image upload, if new image is upload, send to clodinary API
  useEffect(() => {
    if ( !didMount.current ) {
      return didMount.current = true;
    }
      if (image !== null) {
        let newFile = {
          uri:  image,
          type: `test/${image.split(".")[1]}`,
          name: `test.${image.split(".")[1]}`
        };
        handleUpload(newFile);
      }
  }, [image]);

  // GPS location functionality
  const locationPicker = async (latitudeCord, longitudeCord) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
    });

    let gps = await Location.reverseGeocodeAsync({
      latitude : latitude === undefined ? location.coords.latitude : latitudeCord,
      longitude : longitude === undefined ? location.coords.longitude : longitudeCord,
    })
    setLocation(gps[0].city + ', ' + gps[0].region);
  }

  // Post button and go back to Discovery page
  const postData = async () => {

    let uploadInfo = {};
    uploadInfo['url'] = imgURL;
    uploadInfo['caption'] = text;
    uploadInfo['username'] = state.user.userInfo.username;
    uploadInfo['profPhoto'] = state.user.userInfo.profPhoto;

    if (isSelected) {
      if (location === "null, null") {
        uploadInfo['location'] = null;
      } else {
        uploadInfo['location'] = location;
      }
    } else {
      uploadInfo['location'] = null;
    }
    if (image) {
      await fetch(`http://${API_IP}/post/uploadPost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadInfo),
      })
      .then(async res => {
        return await res.json();
      })
      .then(data => {
        // console.log('Success:', data);
        removeLocally("image");
        removeLocally("imageGPS");
        setImage(null);
        navigation.navigate("Home");
        setSelection(false);
        setText('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      alert('You forgot to add your lovely pet picture 😊');
    }

  }

  return (
    <ScrollView style={[
      styles.centeredView,
      {
        backgroundColor: palette(state.theme).pageColor,
      }
    ]}>
      <HeaderTemplate userData={null} showUserDisplay={true}></HeaderTemplate>
      <View style={styles.container}>
        <Text style={[
          styles.header,
          {
            color: palette(state.theme).buttonText
          }
        ]}> Post Your Pets</Text>
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: palette(state.theme).buttonColor,
              borderColor: palette(state.theme).buttonBorderColor,
            }
          ]}
          onPress={() => setModalVisible(true)}>
          {image === null ?
            <FontAwesome
              name="image"
              style={[
                styles.icon,
                {
                  color: palette(state.theme).iconColor
                }
              ]}
              size={100}
            />
            :
            <Image
              source={{ uri: image }} style={{
                width: 300,
                height: 200,
                borderColor: palette(state.theme).buttonBorderColor,
                borderWidth: 1
                }}
            />
          }
        </Pressable>
        <Text style={[
          styles.caption,
          {
            color: palette(state.theme).buttonText
          }
        ]}>Caption </Text>
        <TextInput
          style={[
            styles.inputBox,
            {
              borderColor: palette(state.theme).buttonBorderColor,
            }
          ]}
          placeholder="Say something about your pet!"
          onChangeText={(text) => setText(text)}
          multiline={true}
          value={text}
        />
        <View style={styles.checkBoxSection}>
          <Checkbox
            value={isSelected}
            onValueChange={
              () => {
                setSelection(!isSelected);
                locationPicker(latitude, longitude);
              }
            }
            style={[
              styles.checkbox,
              {
                backgroundColor: palette(state.theme).iconColor
              }
            ]}
            color={isSelected? '#4630EB' : undefined}
          />
          <Text style={styles.locationCaption}>Share Location</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.postButton,
            {
              backgroundColor: palette(state.theme).buttonColor,
              borderColor: palette(state.theme).buttonBorderColor
            }
          ]}
          // onPress={() => navigate('HomeScreen')}
          onPress={() => postData()}
          underlayColor='#fff'>
          <Text style={[
            styles.post,
            {
              color: palette(state.theme).iconColor
            }
          ]}>Post</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        style={styles.selectorButton}
        visible={modalVisible}
        onRequestClose={
          () => {
            setModalVisible(!modalVisible);
          }
        }
      >
        <View style={styles.centeredView} >
          <View style={[
            styles.modalView,
            {
              shadowColor: palette(state.theme).shadowColor,
              backgroundColor: palette(state.theme).pageColor,
            }
          ]}>
            <Pressable onPress={() => {setModalVisible(!modalVisible);}}>
              <Image
                source={require("../../assets/x.png")}
                fadeDuration={0}
                style={{
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  top: -15,
                  right: -15
                }}
              />
            </Pressable>
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor: palette(state.theme).buttonColor,
                  borderColor: palette(state.theme).buttonBorderColor,
                  shadowColor: palette(state.theme).shadowColor
                }
              ]}
              onPress={() => {GalleryAccess()}}
            >
              <Text style={[
                styles.textStyle,
                {
                  color: palette(state.theme).buttonText
                }
              ]}>Pick From Photos Gallery</Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor: palette(state.theme).buttonColor,
                  borderColor: palette(state.theme).buttonBorderColor,
                  shadowColor: palette(state.theme).shadowColor,
                }
              ]}
              onPress={() => {CameraAccess()}}
            >
              <Text style={[
                styles.textStyle,
                {
                  color: palette(state.theme).buttonText,
                }
              ]}>Take a Photo</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
