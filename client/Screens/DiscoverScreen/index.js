import { Text, View, Modal, StyleSheet } from 'react-native';
import { colorTheme1 } from "../../constants";
import FeedTemplate from '../../Templates/FeedTemplate';
import HeaderTemplate from '../../Templates/HeaderTemplate';
import { randomData } from '../../Templates/sampleData';
import { useSelector, useStore } from "react-redux";

export default function DiscoverScreen() {
  const refreshRandomUserData = () => {
    console.log('this should run a get request for new random user data')
  };

  const userData = useSelector(state => state.user);

  return (
    <View style={styles.discoverScreenContainer}>
      <View>
      <HeaderTemplate userData={null} showUserDisplay={false}></HeaderTemplate>
      </View>
      <View>
        <FeedTemplate userData={randomData} refreshData={refreshRandomUserData}></FeedTemplate>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  discoverScreenContainer: {
    flex: 1,
    backgroundColor: `${colorTheme1.pageColor}`,
  }
});