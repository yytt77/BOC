import { Text, View, Modal, StyleSheet } from 'react-native';
import { colorTheme1 } from "../../constants";
import FeedTemplate from '../../Templates/FeedTemplate'
import { randomData } from '../../Templates/sampleData';

export default function DiscoverScreen() {
  const refreshRandomUserData = () => {
    console.log('this should run a get request for new random user data')
  };
  return (
    <View style={styles.discoverScreenContainer}>
      <FeedTemplate userData={randomData} refreshData={refreshRandomUserData}></FeedTemplate>
    </View>
  );
};

const styles = StyleSheet.create({
  discoverScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${colorTheme1.pageColor}`,
  }
});