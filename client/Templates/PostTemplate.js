import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Modal, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput, Button } from 'react-native';
import { useSelector, useStore, useDispatch } from "react-redux";
import moment from 'moment';
import axios from "axios";

import backIcon from '../assets/back.png';
import CommentTemplate from './CommentTemplate';
import { updateUser } from "../Redux/actions";
import { palette } from '../Utils/ColorScheme';
import { API_IP } from "../constants";

let width = Dimensions.get('window').width;
let pictureWidth = width - 50;
let height = Dimensions.get('window').height;

const PostTemplate = (props) => {
  const state = useSelector(state => state);
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const displayModal = (show) => {
    setIsVisible(show);
  }

  let date = moment(`${props.data.createdAt}`);
  date = moment(`${props.data.createdAt}`).fromNow();

  var data = JSON.stringify({
    "postID": `${props.data._id}`,
    "username": `${state.user.userInfo.username}`,
    "profPhoto": `${state.user.userInfo.profPhoto}`,
    "comment": `${inputText}`
  });

  const submitComment = () => {
    var config = {
      method: 'POST',
      url: `http://localhost:3000/post/comment`,
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };
    return axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        props.refreshData();
        setInputText('');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <Modal
        style={styles.modalContainer}
        animationType = {'slide'}
        transparent={false}
        visible={isVisible}>
        <View
        style={[styles.modalComponentContainer,
          {
            backgroundColor: palette(state.theme).pageColor
          }]}>
          <View
          style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => {
                displayModal(!isVisible)
              }}>
              <View
              style={styles.backIconContainer}>
                <Image
                style={styles.backIcon}
                resizeMode='contain'
                source={backIcon}/>
              </View>
            </TouchableOpacity>
            <View
            style={styles.commentTextContainer}>
              <Text
              style={styles.commentText}>
                Comments
              </Text>
            </View>
          </View>
          <View
          style={styles.scrollViewContainer}>
            <ScrollView
            style={styles.modalCommentContainer}>
              {props.data.comments.map((element, index) => {
              return <CommentTemplate commentData={element} key={index}></CommentTemplate>
            })}
            </ScrollView>
          </View>
          <View
          style={styles.inputTextContainer}>
            <TextInput
            style={styles.inputText}
            placeholder='Type Comment Here'
            onChangeText={(text) => {
              setInputText(text);
            }}
            value={inputText}>
            </TextInput>
            <Button
            onPress={()=> {
              submitComment();
            }}
            title='Submit Comment'>
            </Button>
          </View>
        </View>
      </Modal>
      <View style={styles.userInfoContainer}>
        <View style ={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            resizeMode='cover'
            source={{
              uri: `${props.data.profPhoto}`,
            }}/>
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
          props.displayModal(true, props.data.url, props.data.username, props.data.caption)
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
      <TouchableOpacity
        onPress={() => {
          displayModal(!isVisible)
      }}>
        <Text> {props.data.comments.length} Comments</Text>
      </TouchableOpacity>
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
  },
  userInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 5,
  },
  submittedPictureContainer: {
    flex: 9,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  captionContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  submittedPicture: {
    width: pictureWidth,
    height: pictureWidth,
  },
  postInfoContainer: {
    flexDirection: 'row',
    flex: 7,
  },
  usernameContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  locationDateContainer: {
    flex: 6,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 15
  },
  userNameText: {
    fontWeight: 'bold',
  },
  locationDateText: {
    fontSize: 10,
  },
  // <--------------------Modal CSS--------------------->
  modalContainer: {
  },
  modalComponentContainer:{
    flex: 1,
  },
  modalHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 40,
  },
  backIconContainer: {
  },
  backIcon: {
    width: 50,
    height: 50,
  },
  commentTextContainer: {
    position: 'absolute',
    width: width,
    textAlign: 'center',
  },
  commentText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#FDFEFE',
  },
  modalCommentContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    width: width,
    height: width,
  },
  scrollViewContainer: {
    flex: 12,
  },
  inputTextContainer: {
    padding: 10,
    flex: 2,
  },
  inputText: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 30,
    // paddingTop: 20,
    // paddingBottom: 50,
    // width: width,
    // height: width/2,
    backgroundColor: '#FDFEFE',
  },
})

export default PostTemplate;