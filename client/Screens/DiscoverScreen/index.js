import { Text, View, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useStore } from "react-redux";
import { useState, useEffect, useRef } from 'react';
import axios from "axios";

import FeedTemplate from '../../Templates/FeedTemplate';
import HeaderTemplate from '../../Templates/HeaderTemplate';
import { randomData } from '../../Templates/sampleData';
import { palette } from '../../Utils/ColorScheme';
import { API_IP } from '../../constants';

export default function DiscoverScreen({ navigation }) {

  //State
  const [data, setData] = useState([]);
  const [offsetdata, setoffsetData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);


  //Redux
  const state = useSelector((state) => state);
  const userData = useSelector(state => state.user);

  //Pull to refresh
  const refreshRandomUserData = async () => {
    setoffsetData(0);
    getData(0, 'loadNewData');
  };

  //Refresh page when naviagte to Discover
  useEffect(() => {
    if (!navigation) { return }
    const refreshPage = navigation.addListener('focus', () => {
      getData(0, 'loadNewData');
    });
    return refreshPage;
  }, [navigation]);

  //Load more icon
  const loadMoreView = () => {
    return <View style={styles.loadMore}>
      { loading ? (
        <ActivityIndicator
            style={styles.indicator}
            size={"large"}
            color={"red"}
            animating={true}
        />
        ) : null}
           {loading ? (
       <Text>Loading</Text>) : null
      }
  </View>
  }

  //Get data, two type: loadMoreData or loadNewData
  //loadNewData is to fresh the page
  //loadMoreData is to scroll down to get more data
  const getData = async (offset, type) => {
    setIsListEnd(false);
    if (!loading && !isListEnd) {
      setLoading(true);
      const limit = 2;
      var config = {
        method: 'GET',
        url: `http://${API_IP}/post/discover?limit=${limit}&offset=${offset}`,
        headers: {
          'Content-Type': 'application/json'
        }
      };
      await axios(config)
      .then(function (response) {
        if (type === 'loadNewData') {
          setData(response.data);
          setoffsetData(limit);
          setLoading(false);
        }
        if (type === 'loadMoreData') {
          if (response.data.length > 0) {
            const newData = data.concat(response.data);
            setData(newData);
            setoffsetData(offset + limit);
            setLoading(false);
          } else {
            setLoading(false);
            setIsListEnd(true);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  useEffect(() => {
    getData(0, 'loadNewData');
  },[]);

  //Conditional render of user profile component depending on whether user is logged in or not
  const headerComponent = (userData.userInfo.username !== 'defaultUser') ?
  (<HeaderTemplate userData={userData} showUserDisplay={true}></HeaderTemplate>) :
  <HeaderTemplate userData={null} showUserDisplay={false}></HeaderTemplate>;

  return (
    <View style={[
      styles.discoverScreenContainer,
      {
        backgroundColor: palette(state.theme).pageColor
      }
     ]}>
      <View>
        {headerComponent}
      </View>
      <View>
        <FeedTemplate userData={data} refreshData={refreshRandomUserData} type={'discover'}
        renderLoadMoreView = {loadMoreView} loadMoreData = {() => {getData(offsetdata,'loadMoreData' )}}></FeedTemplate>
      </View>
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