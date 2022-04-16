import React, { useState, useEffect } from 'react';
import { Text, View, Modal, Dimensions, FlatList, ScrollView, StyleSheet, Image, TouchableOpacity, RefreshControl, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import PostTemplate from './PostTemplate';

//import from redux
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../Redux/actions/index';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var statusBarHeight = Constants.statusBarHeight;
var safeHeight = height - statusBarHeight - 160;

const FeedTemplate = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedPhoto, setDisplayedPhoto] = useState();
  const [toUser, settoUser] = useState();

  // redux setup
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { notificationToUser } = bindActionCreators(actions, dispatch);

  // add toUser to state and toUser, url to redux as well
  const displayModal = (show, url, toUser, caption) => {
    setIsVisible(show);
    setDisplayedPhoto(url);
    settoUser(toUser);
    notificationToUser(toUser, url, caption);
  }

  return (
    <View style={styles.mainContainer}>
      <Modal
        style={styles.imageModal}
        animationType = {'slide'}
        transparent={false}
        visible={isVisible}>
          <TouchableOpacity
            onPress={() => {
              displayModal(!isVisible)
          }}
          >
            <Image
            style={styles.modalPicture}
            resizeMode='contain'
            source={{
              uri: `${displayedPhoto}`,
            }}/>
          </TouchableOpacity>
      </Modal>
      <ScrollView
        style={styles.scrollcontainer}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              props.refreshData();
            }}
          />
        }
      >
        {props.userData.map((element, index) => {
          return <PostTemplate data={element}
          key={index} displayModal={displayModal} refreshData={props.refreshData}></PostTemplate>
        })}
      </ScrollView>
    </View>
    );
  };

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    width: width,
    height: safeHeight,
    flexDirection: 'column',
  },
  scrollcontainer: {
  },
  modalPicture: {
    width: width,
    height: height,
  },
  logoImage: {
    width: 75,
    height: 30,
  },
});

export default FeedTemplate;