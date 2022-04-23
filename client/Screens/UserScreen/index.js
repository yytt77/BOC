import { Text, View, Modal, StyleSheet } from 'react-native';
import { useSelector, useStore, useDispatch } from "react-redux";
import { useEffect } from 'react';
import axios from "axios";

import FeedTemplate from '../../Templates/FeedTemplate';
import HeaderTemplate from '../../Templates/HeaderTemplate';
import userInfo from './UserInfo.js';
import { palette } from '../../Utils/ColorScheme';
import { API_IP } from "../../constants";
import { updateUser } from "../../Redux/actions";

export default function UserScreen({ navigation }) {

  const state = useSelector(state => state);
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();

  const updateReduxUser = async () => {
    try {
      const response = await axios.get(
        `http://${API_IP}/user/getUser/${state.user.userInfo.username}`
      );
      if (response.data.userInfo) {
        dispatch(updateUser(response.data));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const refreshPage = navigation.addListener('focus', () => {
      updateReduxUser();
    });
    return refreshPage;
  }, [navigation]);

  return (
    <View style={[
      styles.userScreenContainer,
      {
        backgroundColor: palette(state.theme).pageColor
      }
      ]}>
      <View
        styles={styles.headerContainer}>
        <HeaderTemplate userData={userData} showUserDisplay={true}></HeaderTemplate>
      </View>
      <View
        styles={styles.feedContainer}>
        <FeedTemplate userData={userData.posts} refreshData={updateReduxUser} type={'feed'}></FeedTemplate>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userScreenContainer: {
    flex: 1,
  },
  headerContainer: {
  },
  feedContainer: {

  }
})