import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Button, Image, Text, View, Platform, TouchableOpacity, TextInput, Alert, Modal, Pressable} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { getLocally, storeLocally, removeLocally } from "../../LocalStorage/index";
import  CameraRoll  from '../UploadScreen/CameraRoll';
import  Gallery  from '../UploadScreen/Gallery';
import {Cloudinary} from "@cloudinary/url-gen";
import axios from 'axios';

export default function Upload() {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const didMount = useRef(false);
  // console.log(Cloudinary());

  const CameraAccess = () => {
    async function camera() {
        return await CameraRoll();
    }
    camera().then(() => {
      return getLocally("image");
    })
    .then((res) => {
      let img = JSON.parse(res);
      setImage(img[img.length - 1]);
      setModalVisible(!modalVisible);
    })
    .catch((err) => console.error(err));
  }

  const GalleryAccess = () => {
    async function gallery() {
        return await Gallery();
    }
    gallery().then(() => {
      return getLocally("image");
    })
    .then((res) => {
      let img = JSON.parse(res);
      setImage(img[img.length - 1]);
      setModalVisible(!modalVisible);
    })
    .catch((err) => console.error(err));
  }

  const handleUpload = (image)=>{
    const data = new FormData(); // fetch ucun data hazirlayiriq
    data.append('file',image);  // cloudinary ucun img file,hansiki imgpicker den gelir
    data.append('upload_preset','p9buobh3'); // cloudinary ucun preset ti teyin edirik

     fetch("https://api.cloudinary.com/v1_1/dy91vvft0/image/upload",{  method:'post',body:data})
       .then(res=>res.json())
       .then(data=>{  console.log('picture',data.url); }); // cloudinary yuklenenden sora gelen datani state guncelliyirik,data cloudinaryden gelir
  }

  useEffect(() => {
    if ( !didMount.current ) {
      return didMount.current = true;
    }
    let newFile = {
      uri:image,
      type:`test/${image.split(".")[1]}`,
      name:`test.${image.split(".")[1]}`
    };
    handleUpload(newFile);
    console.log('Do something after counter has changed', newFile);
  }, [image]);

  const locationPicker = async () => {
    // if (isSelected === true) {
      cosole.log('isSelected', isSelected);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      // setSelection(true);

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest,
      });
      let gps = await Location.reverseGeocodeAsync({
        latitude : location.coords.latitude,
        longitude : location.coords.longitude
      })
      // let address = await Location.geocodeAsync({
      // })
      setLocation(location);
      // console.log('thisis', location);
      // // console.log('address', address);
      // console.log('we have city', gps[0].city, '    ', gps[0].region);
    // }
  }

  return (
    <View style={styles.centeredView}>
       <View style={styles.container}>
        <Text style={styles.header}> Post Your Pets</Text>
        <Pressable
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          {image === null ? <FontAwesome name="image" style={styles.icon} size={100} /> : <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />}
        </Pressable>
        <Text style={styles.caption}>Caption </Text>
          <TextInput
            style={styles.inputBox}
            // style={{ height: 150, width: 300, backgroundColor: 'azure', fontSize: 15 }}
            placeholder="Say something about your pet!"
            onChangeText={(text) => setText({ text })}
            multiline={true}
          />
        <View style={styles.checkBoxSection}>
          <Checkbox
            value={isSelected}
            onValueChange={() => {setSelection(!isSelected);locationPicker();}}
            style={styles.checkbox}
            color={isSelected? '#4630EB' : undefined}
          />
          <Text style={styles.locationCaption}>Share Location</Text>
        </View>
        <TouchableOpacity
              style={styles.postButton}
              // onPress={() => navigate('HomeScreen')}
              underlayColor='#fff'>
              <Text style={styles.post}>Post</Text>
        </TouchableOpacity>
       </View>
      <Modal
        animationType="slide"
        transparent={true}
        style={styles.selectorButton}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {GalleryAccess()}}
            >
            <Text style={styles.textStyle}>Pick From Photos Gallary</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {CameraAccess()}}
            >
            <Text style={styles.textStyle}>Pick From Camera roll</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#84C0FB',
  },
  container: {
    flex: 1,
    backgroundColor: '#84C0FB',
    marginTop: 80,
  },
  modalView: {
    margin: 20,
    marginTop: 140,
    backgroundColor: "#84C0FB",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#84C0FB",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    backgroundColor: '#57D785',
    // borderRadius: 20,
    padding: 10,
    marginTop: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    width: 300,
    height: 200,
    borderRadius:10,
    borderColor: '#6E96BD',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonClose: {
    backgroundColor: "#57D785",
  },

  icon: {
    color: '#D6F7D6',
  },
  header: {
    color: '#FFFFFF',
    fontSize: 25,
    textAlign: 'center',
  },
  caption: {
    color: '#FFFFFF',
    fontSize: 15,
    padding: 10,
    left: 45,
    marginTop: 20,
  },
  locationCaption: {
    color: '#FFFFFF',
    fontSize: 15,
    padding: 10,
    textAlign: 'center',
  },
  checkbox: {
    margin: 8,
    backgroundColor: '#D6F7D6',
    borderWidth: 1,
  },
  checkBoxSection: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  captionSection: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  inputBox: {
    height: 150,
    width:310,
    // margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'azure',
    fontSize: 15,
    borderRadius:10,
    borderColor: '#6E96BD',
    alignSelf: 'center',
    textAlignVertical: 'top'
  },
  post: {
    color:'#D6F7D6',
    textAlign:'center',
    marginTop:5,
    paddingLeft : 10,
    paddingRight : 10,
    fontSize: 20,
  },
  postButton: {
    height: 60,
    width: 120,
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#57D785',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#6E96BD',
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#FEFB9F',
  },
});
