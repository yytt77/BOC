import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getLocally, storeLocally, removeLocally } from "../../LocalStorage";

export default function Gallery() {

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You have not granted PetPix permission to access your photos.");
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
      let GPS = [];
      const onUserPress = async (url) => {
        // Save image to local storage;
        const uploadImage = await getLocally("image");
        let newHistory = uploadImage ? [...JSON.parse(uploadImage)] : [];
        if (!newHistory.includes(url)) {
          newHistory.push(url);
          GPS.push(result.exif.GPSLatitude, result.exif.GPSLongitude);
          storeLocally("image", JSON.stringify(newHistory));
          storeLocally("imageGPS", JSON.stringify(GPS));
        }
      };
     return onUserPress(url);
    }
  };
  return pickImage();

}