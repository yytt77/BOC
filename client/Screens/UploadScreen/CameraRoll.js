import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getLocally, storeLocally, removeLocally } from "../../LocalStorage";

export default function CameraRoll() {

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      exif: true,
    });

    if (!result.cancelled) {
      let url = result.uri;
      const onUserPress = async (url) => {
        // Save image to local storage;
        const uploadImage = await getLocally("image");
        let newHistory = uploadImage ? [...JSON.parse(uploadImage)] : [];
        if (!newHistory.includes(url)) {
          newHistory.push(url);
          storeLocally("image", JSON.stringify(newHistory));
        }
      };
     return onUserPress(url);
    }
  }
  return openCamera();

}