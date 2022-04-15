import React from 'react';
import { View, FlatList, Text } from 'react-native';

export default function NotificationTile() {

  const data = [
    {
      "_id": 0,
      "fromuser": "glen",
      "to" : "joe",
      "url" : "https://mydesktopwalls.com/wp-content/uploads/2020/08/Desktop-Wallpaper-4k-1.jpg",
      "caption": "hello world",
      "createdAt" : "2022-04-14T21:07:14.225Z",
    },
    {
      "_id": 1,
      "fromuser": "troy",
      "to": "ash",
      "url": "https://mydesktopwalls.com/wp-content/uploads/2020/08/Desktop-Wallpaper-4k-2.jpg",
      "caption": "new pet",
      "createdAt": "2022-04-14T22:07:14.225Z",
    },
    {
      "_id": 2,
      "fromuser": "dominic",
      "to": "jenya",
      "url": "https://mydesktopwalls.com/wp-content/uploads/2020/08/Desktop-Wallpaper-4k-3.jpg",
      "caption": "d tempor incididunt ut labore et dolore magna al",
      "createdAt": "2022-04-14T23:07:14.225Z",
    },
    {
      "_id": 3,
      "fromuser" : "jenya",
      "to" : "dominic",
      "url" : "https://mydesktopwalls.com/wp-content/uploads/2020/08/Desktop-Wallpaper-4k-4.jpg",
      "caption": "bus pulvinar elementum integer ",
      "createdAt" : "2022-04-14T24:07:14.225Z",
    }
  ];

  const Item = ({ fromuser }) => (
    <View>
      <Text>{fromuser} took a screenshot of your picture!</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item fromuser={item.fromuser}/>
  );

  return(
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}