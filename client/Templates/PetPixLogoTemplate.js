import { Text, View, Dimensions, StyleSheet, Image } from 'react-native';
import userInfo from '../Screens/UserScreen/UserInfo';

const PetPixLogoTemplate = (props) => {
  return (
    <View
    style={styles.headerContainer}>
      <Image
        style={styles.logoImage}
        source={require('../assets/petpixLogoSmall.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
  },
  logoImage: {
    width: 75,
    height: 30,
    top: 5,
    left: 10,
  },
})

export default PetPixLogoTemplate;