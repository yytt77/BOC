import { Text, View, Dimensions, StyleSheet, Image } from 'react-native';


const UserInfo = (props) => {
  return (
    <View
      style={styles.userInfoContainer}>
      <View
        style={styles.textContainer}>
        <Text
          style={styles.usernameText}>
          {props.userData.userInfo.username} </Text>
          <Text
          style={styles.followersText}>
          {props.userData.userInfo.followers.length} Followers</Text>
          <Text
          style={styles.followingText}>
          {props.userData.userInfo.following.length} Following</Text>
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
  },
  followersText: {
    textAlign: 'right',
    fontSize: 10,
  },
  followingText: {
    textAlign: 'right',
    fontSize: 10,
  },
});

export default UserInfo;