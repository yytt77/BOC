import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import UserInfo from '../Screens/UserScreen/UserInfo';
import PetPixLogo from './PetPixLogo'


const HeaderTemplate = (props) => {
  // console.log('header props', props);
  return (
    <View
    style={styles.headerContainer}>
        <PetPixLogo></PetPixLogo>
        {props.showUserDisplay && props.userData && <UserInfo userData={props.userData}></UserInfo>}
    </View>
  )
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    // backgroundColor: 'red',
  },
  logoContainer: {
    // justifyContent: 'flex-end'
  },
});

export default HeaderTemplate;