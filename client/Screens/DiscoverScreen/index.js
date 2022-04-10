import { Text, View, Modal, StyleSheet } from 'react-native';
import { useSelector, useStore } from "react-redux";

import FeedTemplate from '../../Templates/FeedTemplate';
import HeaderTemplate from '../../Templates/HeaderTemplate';
import { randomData } from '../../Templates/sampleData';
import { palette } from '../../Utils/ColorScheme';

export default function DiscoverScreen() {

  const state = useSelector((state) => state);
  const refreshRandomUserData = () => {
    console.log('this should run a get request for new random user data')
  };

  const userData = useSelector(state => state.user);

  return (
    <View style={[
      styles.discoverScreenContainer,
      {
        backgroundColor: palette(state.theme).pageColor
      }
      ]}>
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
    justifyContent: 'center',
    alignItems: 'center'
  }
});