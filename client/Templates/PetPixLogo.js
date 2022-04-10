import { Text, View, Dimensions, StyleSheet, Image } from 'react-native';
import userInfo from '../Screens/UserScreen/UserInfo';

const PetPixLogo = (props) => {
  return (
    <View
    style={styles.headerContainer}>
      <View
      style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          resizeMode='contain'
          source={require('../assets/petpixLogoSmall.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: 'blue'
  },
  logoContainer: {
    width: 75,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 70,
    height: 70,
    // top: 5,
    // left: 10,
  },
})

export default PetPixLogo;