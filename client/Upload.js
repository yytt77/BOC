import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Image, Text, View, Platform, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
// import 'font-awesome/css/font-awesome.min.css';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export default function Upload() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const pickImage = async () => {

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      exif: true,
    });

    // let result2 = await ImagePickergetPendingResultAsync({
    // });

    console.log('result', result);
    // console.log('result2', ImagePicker);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      exif: true,
    });

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
    }
    locationPicker();
  }

  const locationPicker = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let gps = await Location.reverseGeocodeAsync({
      latitude : location.coords.latitude,
      longitude : location.coords.longitude
    })
    let address = await Location.geocodeAsync({
    })
    setLocation(location);
    console.log('thisis', location);
    console.log('address', address);
    console.log('we have city', gps[0].city, '    ', gps[0].region);
  }

return (
  <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#84C0FB' }}>
    <Text style={styles.header}> Post Your Pets</Text>

    <TouchableOpacity style={styles.button} onPress={openCamera}>
      {image === null ? <FontAwesome name="image" style={styles.icon} size={100} /> : <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />}
    </TouchableOpacity>
    <Text style={styles.caption}>Caption</Text>
    <TextInput
      style={{ height: 150, width: 300, backgroundColor: 'azure', fontSize: 15 }}
      placeholder="Say something about your pet!"
      onChangeText={(text) => setText({ text })}
    />
  </View>
);
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#57D785',
    // borderRadius: 20,
    // padding: 10,
    // marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    width: 300,
    height: 200
  },
  icon: {
    color: '#D6F7D6',
  },
  header: {
    color: '#FFFFFF',
    fontSize: 25
  },
  caption: {
    color: '#FFFFFF',
    fontSize: 15,
    padding: 10
  }
});