import AsyncStorage from '@react-native-async-storage/async-storage';
// import { } from 'react-native';


// Only used for testing, revert for production
// import { AsyncStorage } from 'react-native';

export const storeLocally = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (err) {
    throw (err)
  }
}

export const getLocally = async (key) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (e) {
    throw (err)
  }
}

export const removeLocally = async (key) => {
  try {
    return await AsyncStorage.removeItem(key)
  } catch (e) {
    throw (err)
  }
}
