import React, { useState, useEffect } from 'react';
import { Text, View, Modal, Dimensions, ScrollView, StyleSheet, Image, TouchableOpacity, RefreshControl, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import PostTemplate from './PostTemplate';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var statusBarHeight = Constants.statusBarHeight;
var safeHeight = height - statusBarHeight - 80;

const FeedTemplate = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedPhoto, setDisplayedPhoto] = useState();
  const [toUser, settoUser] = useState();

  // add toUser(person clicked the image);
  const displayModal = (show, url, toUser) => {
    setIsVisible(show);
    setDisplayedPhoto(url);
    settoUser(toUser);
  }

  return (
    <View style={styles.mainContainer}>
      <Modal
        stlye={styles.imageModal}
        animationType = {'slide'}
        transparent={false}
        visible={isVisible}
        onRequestClose={() => {
          Alert.alert('Modal has now been closed.');
        }}>
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
          key={index} displayModal={displayModal}></PostTemplate>
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
  imageModal: {
    width: width,
    height: width,
    backgroundColor: 'white',
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