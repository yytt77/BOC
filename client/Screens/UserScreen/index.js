import { Text, View, Modal, StyleSheet } from 'react-native';
import FeedTemplate from '../../Templates/FeedTemplate';
import HeaderTemplate from '../../Templates/HeaderTemplate';
import userInfo from './UserInfo.js';
import { colorTheme1 } from "../../constants";
import { useSelector, useStore } from "react-redux";

export default function UserScreen() {
  const userData = useSelector(state => state.user);

  const refreshUserData = () => {
    console.log('this should run a get request for new account user data and save into redux store')
  };

  return (
    <View style={styles.userScreenContainer}>
      <View
        styles={styles.headerContainer}>
        <HeaderTemplate userData={userData} showUserDisplay={true}></HeaderTemplate>
      </View>
      <View
        styles={styles.feedContainer}>
        <FeedTemplate userData={userData.posts} refreshData={refreshUserData}></FeedTemplate>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userScreenContainer: {
    backgroundColor: `${colorTheme1.pageColor}`,
    // flexDirection: 'column',
  },
  headerContainer: {
  },
  feedContainer: {
  }
})