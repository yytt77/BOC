import { Text, View, Modal, StyleSheet } from 'react-native';
import FeedTemplate from '../../Templates/FeedTemplate'
import HeaderTemplate from '../../Templates/HeaderTemplate'
import { colorTheme1 } from "../../constants";
import userData from '../../Templates/sampleData';

export default function UserScreen() {
  const refreshUserData = () => {
    console.log('this should run a get request for new account user data and save into redux store')
  };
  return (
    <View style={styles.userScreenContainer}>
      <View
        styles={styles.headerContainer}>
        <HeaderTemplate userData={userData}></HeaderTemplate>
      </View>
      <View
        styles={styles.feedContainer}>
        <FeedTemplate userData={userData} refreshData={refreshUserData}></FeedTemplate>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userScreenContainer: {
    backgroundColor: `${colorTheme1.pageColor}`,
  },
  headerContainer: {
    // width: 70,
    // height: 70,
  },
  feedContainer: {
    // position: 'absolute',
  }
})