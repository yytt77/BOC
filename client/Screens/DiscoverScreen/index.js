import { Text, View, Modal, StyleSheet } from 'react-native';
import { useSelector, useStore } from "react-redux";
import { useState, useEffect, useRef } from 'react';
import axios from "axios";

import FeedTemplate from '../../Templates/FeedTemplate';
import HeaderTemplate from '../../Templates/HeaderTemplate';
import { randomData } from '../../Templates/sampleData';
import { palette } from '../../Utils/ColorScheme';

export default function DiscoverScreen() {

  //state
  const [data, setData] = useState([]);

  //redux
  const state = useSelector((state) => state);
  const userData = useSelector(state => state.user);

  const refreshRandomUserData = () => {
    console.log('this should run a get request for new random user data')
    getData();
  };


  const getData = () => {
    const limit = 4;
    const offset = 0;
    var config = {
      method: 'GET',
      url: `http://44.201.208.58:3000/post/discover?limit=${limit}&offset=${offset}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    axios(config)
    .then(function (response) {
      setData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  useEffect(() => {
    getData();
  },[]);

  return (
    <View style={[
      styles.discoverScreenContainer,
      {
        backgroundColor: palette(state.theme).pageColor
      }
     ]}>
      {
      //  <View>
      // <HeaderTemplate userData={null} showUserDisplay={false}></HeaderTemplate>
      // </View>
        <View>
          <FeedTemplate userData={ data } refreshData={refreshRandomUserData}></FeedTemplate>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  discoverScreenContainer: {
    flex: 1,
  },
  baseText: {
    fontFamily: "Cochin"
  }
});