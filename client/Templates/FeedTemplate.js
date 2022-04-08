import React, { useState, useEffect } from 'react';
import { Text, View, Modal, Dimensions, ScrollView, StyleSheet, Image, TouchableOpacity, RefreshControl, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import PostTemplate from './PostTemplate';
// import userData from './sampleData';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var statusBarHeight = Constants.statusBarHeight;
var safeHeight = height - statusBarHeight - 80;

const FeedTemplate = (props) => {
  console.log('props', props.refreshData);
  const [isVisible, setIsVisible] = useState(false);
  const [displayedPhoto, setDisplayedPhoto] = useState();

  const displayModal = (show, url) => {
    setIsVisible(show);
    setDisplayedPhoto(url);
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
      <View
        style={styles.headerContainer}
      >
        <Image
          style={styles.logoImage}
          source={require('../assets/petpixLogoSmall.png')}
        />
      </View>
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
        {props.userData.posts.map((element, index) => {
          return <PostTemplate userInfo={props.userData.userInfo.profPhoto} data={element}
          key={index} displayModal={displayModal}></PostTemplate>
        })}
      </ScrollView>
    </View>
    );
  };

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    width: width,
    height: safeHeight,
    flexDirection: 'column',
  },
  headerContainer: {
    // flex: 1,
    paddingBottom: 10,
    // backgroundColor: 'red',
  },
  scrollcontainer: {
    // flexGrow: 5,
    // paddingTop: 10,
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