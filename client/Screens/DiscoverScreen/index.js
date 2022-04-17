import { Text, View, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useStore } from "react-redux";
import { useState, useEffect, useRef } from 'react';
import axios from "axios";

import FeedTemplate from '../../Templates/FeedTemplate';
import HeaderTemplate from '../../Templates/HeaderTemplate';
import { randomData } from '../../Templates/sampleData';
import { palette } from '../../Utils/ColorScheme';
import { API_IP } from '../../constants';

export default function DiscoverScreen() {

  //state
  const [data, setData] = useState([]);
  const [offsetdata, setoffsetData] = useState(0);

  //redux
  const state = useSelector((state) => state);
  const userData = useSelector(state => state.user);

  //pull to refresh
  const refreshRandomUserData = () => {
    console.log('this should run a get request for new random user data')
    setoffsetData(0);
    getData();
  };

  //load more icon
  const loadMoreView = () => {
    return <View style={styles.loadMore}>
    <ActivityIndicator
        style={styles.indicator}
        size={"large"}
        color={"red"}
        animating={true}
    />
    <Text>Loading</Text>
  </View>
  }

  //load more post
  const loadMoreData = () => {
    const limit = 2;
    var config = {
      method: 'GET',
      url: `http://${API_IP}/post/discover?limit=${limit}&offset=${offsetdata}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    axios(config)
    .then(function (response) {
      const newData = data.concat(response.data);
      setData(newData);
      setoffsetData(offsetdata + limit);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //
  const getData = () => {
    const limit = 2;
    const offset = 0;
    var config = {
      method: 'GET',
      url: `http://${API_IP}/post/discover?limit=${limit}&offset=${offset}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    axios(config)
    .then(function (response) {
      setData(response.data);
      setoffsetData(limit);
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
          <FeedTemplate userData={data} refreshData={refreshRandomUserData}
          renderLoadMoreView = {loadMoreView} loadMoreData = {loadMoreData}></FeedTemplate>
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
  },
  loadMore: {
    alignItems: "center"
  },
  indicator: {
    color: "red",
    margin: 10
  }
});