import { Text, View, Modal, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import moment from 'moment';

let width = Dimensions.get('window').width - 50;
let height = Dimensions.get('window').height;
// width -= 50;
export default function PostTemplate(props) {
  let date = moment(`${props.data.createdAt}`);
  date = moment(`${props.data.createdAt}`).fromNow();
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <View style ={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            resizeMode='cover'
            source={{
              uri: `${props.userInfo}`,
            }}
          />
        </View>
        <View style={styles.postInfoContainer}>
          <View style={styles.usernameContainer}>
            <Text style={styles.userNameText}>{props.data.username}</Text>
          </View>
          <View style={styles.locationDateContainer}>
            <Text style={styles.locationDateText}>Posted From {props.data.location} - {date}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.submittedPictureContainer}
        onPress={()=>{
          props.displayModal(true, props.data.url)
        }}
      >
        <Image
          style={styles.submittedPicture}
          resizeMode='cover'
          source={{
            uri: `${props.data.url}`,
          }}
        />
      </TouchableOpacity>
      <View style={styles.captionContainer}>
        <Text
          style={styles.captionText}
        >{props.data.caption}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    // height: height,
  },
  userInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 5,
    // backgroundColor: 'green'
  },
  submittedPictureContainer: {
    flex: 9,
    backgroundColor: 'black',
    justifyContent: 'center',
    // backgroundColor: '#2C3E50'
  },
  captionContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'#5B2C6F'
  },
  captionText: {
  },
  postContentContainer: {
    flex: 2,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    // height: 50,
    // width: 50,
    flex: 1,
    // paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F4D03F'
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  submittedPicture: {
    width: width,
    height: width,
  },
  postInfoContainer: {
    flexDirection: 'row',
    flex: 7,
    // alignItems: 'stretch',
    // justifyContent: 'space-between'
  },
  usernameContainer: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  locationDateContainer: {
    flex: 6,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // backgroundColor: 'blue',
    paddingRight: 15
  },
  userNameText: {
    fontWeight: 'bold',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  locationDateText: {
    fontSize: 10,
  }
})