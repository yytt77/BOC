import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getLocally, storeLocally, removeLocally } from "../../LocalStorage";

export default function Gallery() {

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
  };
  return pickImage();
  
}