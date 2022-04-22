import { Text, View, Dimensions, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { palette } from '../../Utils/ColorScheme';

const UserInfo = (props) => {
  // console.log('userInfo', props);

  const state = useSelector((state) => state);

  return (
    <View
      style={styles.userInfoContainer}>
      <View
        style={styles.textContainer}>
        <Text
          style={[styles.usernameText, {color: palette(state.theme).buttonText}]}>
          {props.userData.userInfo.username} </Text>
          <Text
          style={[styles.followersText, {color: palette(state.theme).buttonText}]}>
          {(props.userData.userInfo.followers) ? props.userData.userInfo.followers.length : 0} Followers</Text>
          <Text
          style={[styles.followingText, {color: palette(state.theme).buttonText}]}>
          {(props.userData.userInfo.followers) ?props.userData.userInfo.following.length : 0} Following</Text>
      </View>
      <View
        style={styles.profileContainer}>
        <Image
          style={styles.profilePicture}
          resizeMode='cover'
          source={{
            uri: `${props.userData.userInfo.profPhoto}`,
          }}/>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    paddingRight: 5,
  },
  profileContainer: {
  },
  profilePicture: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  usernameText: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#FEFB9F',
  },
  followersText: {
    textAlign: 'right',
    fontSize: 10,
    color: '#FDFEFE',
  },
  followingText: {
    textAlign: 'right',
    fontSize: 10,
    color: '#FDFEFE',
  },
});

export default UserInfo;