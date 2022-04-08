import React, { useState, useEffect } from 'react';
import { Text, View, Modal, Dimensions, ScrollView, StyleSheet, Image, TouchableOpacity, RefreshControl } from 'react-native';
import PostTemplate from './PostTemplate'
import userData from './sampleData';


const HeaderTemplate = (props) => {
  // console.log('props', props.userData.userInfo.profPhoto);
  return (
    <View
      style={styles.headerContainer}
    >
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
  headerContainer: {
    position: 'absolute',
    top: 0,
    right: 10,
    flexDirection: 'row',
    // backgroundColor: 'green',
  },
  textContainer: {
    flex: 6,
  },
  profileContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  profilePicture: {
    height: 50,
    width: 50,
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

export default HeaderTemplate;