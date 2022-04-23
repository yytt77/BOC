import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

import { palette } from '../../Utils/ColorScheme';

export default function NotificationTile(props) {
  const state = useSelector((state) => state);

  const Item = ({ fromuser, url, caption, _id }) => (
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
      data={props.data}
      renderItem={renderItem}
      keyExtractor={item => item._id}
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