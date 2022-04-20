import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

import { palette } from '../../Utils/ColorScheme';

export default function NotificationTile() {
  const state = useSelector((state) => state);

  const getNotificationData = () => {
    axios({
      method: 'get',
      baseURL: 'http://localhost:3000',
      url: '/user/notifications',
    }).then(result => {
      console.log('Success: ', result.status);
      return result;
    }).catch(err => {
      console.log(`Error getting notifications: ${err}`);
    })
  }

  const data = [
    {
      "_id": 0,
      "fromuser": "glen",
      "to" : "joe",
      "url" : "https://placeimg.com/100/100/animals",
      "caption": "hello world",
      "createdAt" : "2022-04-14T21:07:14.225Z",
    },
    {
      "_id": 1,
      "fromuser": "troy",
      "to": "ash",
      "url": "https://placeimg.com/100/100/animals",
      "caption": "new pet",
      "createdAt": "2022-04-14T22:07:14.225Z",
    },
    {
      "_id": 2,
      "fromuser": "dominic",
      "to": "jenya",
      "url": "https://placeimg.com/100/100/animals",
      "caption": "d tempor incididunt ut labore et dolore magna al",
      "createdAt": "2022-04-14T23:07:14.225Z",
    },
    {
      "_id": 3,
      "fromuser" : "jenya",
      "to" : "dominic",
      "url" : "https://placeimg.com/100/100/animals",
      "caption": "bus pulvinar elementum integer ",
      "createdAt" : "2022-04-14T24:07:14.225Z",
    }
  ];

  const Item = ({ fromuser, url, caption }) => (
    <View>
      <Text style={{ fontWeight: 'bold', marginTop: 20 }}>{fromuser} took a screenshot of your picture!</Text>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Image
          style={styles.profilePicture}
          source={{ uri: url }
        }/>
        <Text style={styles.captionText}>{caption}</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item fromuser={item.fromuser} url={item.url} caption={item.caption}/>
  );

  return(
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  profilePicture: {
    marginTop: 5,
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  captionText: {
    marginTop: 5,
    marginLeft: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});