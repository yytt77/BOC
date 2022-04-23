import { Text, View, ScrollView, Modal, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput, Button } from 'react-native';
import { useSelector, useStore } from "react-redux";
import moment from 'moment';
import axios from "axios";

import { palette } from '../Utils/ColorScheme';
import { API_IP } from "../constants";


const CommentTemplate = (props) => {
  const state = useSelector(state => state);
  const userData = useSelector(state => state.user);

  let date = moment(`${props.commentData.createdAt}`);
  date = moment(`${props.commentData.createdAt}`).fromNow();

  return (
    <View
    style={styles.commentContainer}
    style={[styles.commentContainer,
      {
        borderColor: palette(state.theme).commentBorderColor
      }]}>
      <View
      style={styles.profileContainer}>
        <View
        style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            resizeMode='cover'
            source={{
              uri: `${props.commentData.profPhoto}`,
            }}/>
        </View>
      </View>
      <View
        style={styles.textContainer}>
        <View
        style={styles.commentHeader}>
          <Text
          style={styles.userNameText}>
            {props.commentData.username}
          </Text>
          <Text
          style={styles.dateText}>
            {date}
          </Text>
        </View>
        <View
        style={styles.commentTextContainer}>
          <Text
          style={styles.commentText}>
            {props.commentData.comment}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    padding: 10,
    borderBottomWidth: 2,
    // borderColor: 'black',
    flexDirection: 'row',
  },
  textContainer: {
    flex: 5,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  profileContainer: {
    flex: 1,
  },
  profileImageContainer: {
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  userNameText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#FEFB9F',
  },
  dateText: {
    fontSize: 10,
    color: '#FDFEFE',
  },
  commentTextContainer: {
    paddingTop: 5,
  },
  commentText: {
    color: '#FDFEFE',
  }
});

export default CommentTemplate;