import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import styles from "../../Styles/searchStyles";
import { colorTheme1, API_IP } from "../../constants";
import { useState, useEffect, useCallback, useRef } from "react";
import { getLocally, storeLocally, removeLocally } from "../../LocalStorage";

import axios from "axios";

const ItemSeparatorView = () => (
  <View style={{ height: 1, width: 500, backgroundColor: "white" }}></View>
);

const ItemView = ({ item }, deleteHistory, goToUserPage) => {
  const onUserPress = async (username) => {
    const history = await getLocally("searchHistory");
    let newHistory = history ? [...JSON.parse(history)] : [];
    if (!newHistory.includes(username)) {
      newHistory.push(username);
      storeLocally("searchHistory", JSON.stringify(newHistory));
    }
    goToUserPage();
  };

  if (item === "Recent Searches")
    return (
      <View
        style={{
          padding: 15,
          fontSize: 15,
          fontWeight: "100",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>{item}</Text>
        <TouchableOpacity onPress={deleteHistory}>
          <Text style={{ color: "red" }}>Clear All</Text>
        </TouchableOpacity>
      </View>
    );
  if (item === "No Recent Searches")
    return (
      <Text style={{ padding: 15, fontSize: 15, fontWeight: "100" }}>
        {item}
      </Text>
    );
  return (
    <TouchableOpacity onPress={() => onUserPress(item.followedUser)}>
      <View>
        {item?.followedUser ? (
          <View
            style={{
              padding: 15,
              fontSize: 15,
              fontWeight: "100",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>{item.followedProfPic}</Text>
            <Text>{item.followedUser}</Text>
          </View>
        ) : (
          <Text style={{ padding: 15 }}>{item}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const SearchRandomUser = ({ search }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Text style={{ padding: 15 }}>Searching for User: {search}</Text>
      <ActivityIndicator size="small" color={colorTheme1.buttonColor} />
    </View>
  );
};

export default function MainScreen({ navigation }) {
  //placeholder data for now
  const reduxData = [
    {
      followedUser: "joe",
      followedProfPic: "Joe's profile photo",
    },
  ];
  const [recentSearches, setRecentSearches] = useState();
  const [filteredData, setFilteredData] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLocally("searchHistory")
      .then((history) => {
        if (history) {
          let recents = JSON.parse(history);
          setFilteredData(["Recent Searches", ...recents]);
          setRecentSearches(["Recent Searches", ...recents]);
        } else {
          setFilteredData(["No Recent Searches"]);
          setRecentSearches(["No Recent Searches"]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const deleteHistory = async () => {
    await removeLocally("searchHistory");
    setFilteredData(["No Recent Searches"]);
    setRecentSearches(["No Recent Searches"]);
  };

  const goToUserPage = () => {
    navigation.navigate('FollowedUser')
  }

  const currentSearch = useRef();
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };

  currentSearch.current = search;

  const optimizedSearch = useCallback(
    debounce(async () => {
      if (
        reduxData.filter((item) =>
          item.followedUser
            .toLowerCase()
            .startsWith(currentSearch.current.toLowerCase())
        ).length
      ) {
        setLoading(false);
        return;
      }
      try {
        const user = await axios.get(
          `http://${API_IP}/user/getUserMeta/${currentSearch.current}`
        );
        if (user.data.username) {
          setFilteredData([
            {
              followedUser: user.data.username,
              followedProfPic: user.data.profPhoto,
            },
          ]);
        } else {
          setFilteredData(["User not found"]);
        }
      } catch (err) {
        setFilteredData(["Could not connect"]);
      }
      setLoading(false);
    }),
    []
  );

  const searchFilter = (text) => {
    if (text) {
      const newData = reduxData.filter((item) =>
        item.followedUser.toLowerCase().startsWith(text.toLowerCase())
      );
      if (!newData.length) {
        setLoading(true);
        optimizedSearch();
        setSearch(text);
        return;
      }
      setLoading(false);
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(recentSearches);
      setSearch(text);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colorTheme1.pageColor }]}
    >
      <TextInput
        style={{
          height: 50,
          borderWidth: 1,
          paddingLeft: 20,
          margin: 5,
          borderColor: colorTheme1.navColor,
          backgroundColor: "white",
        }}
        value={search}
        placeholder="Search people you follow"
        underlineColorAndroid="transparent"
        onChangeText={(text) => searchFilter(text)}
        autoCapitalize="none"
      />
      {!loading ? (
        <FlatList
          keyExtractor={(item) => item}
          ItemSeparatorComponent={ItemSeparatorView}
          data={filteredData}
          renderItem={(item) => ItemView(item, deleteHistory, goToUserPage)}
        />
      ) : (
        <SearchRandomUser search={search} />
      )}
    </View>
  );
}



// import { useState, useEffect } from 'react';
// import { StyleSheet, Button, Image, Text, View, Platform, TouchableOpacity, TextInput } from 'react-native';
// // import Checkbox from 'expo-checkbox';
// // import * as ImagePicker from 'expo-image-picker';
// // import * as Permissions from 'expo-permissions';
// // import { FontAwesome } from '@expo/vector-icons';
// // import * as Location from 'expo-location';


// export default function Upload() {
//   const [image, setImage] = useState(null);
//   const [text, setText] = useState('');
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [isSelected, setSelection] = useState(false);

//   const pickImage = async () => {

//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (permissionResult.granted === false) {
//       alert("You've refused to allow this appp to access your photos!");
//       return;
//     }

//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//       exif: true,
//     });

//     // let result2 = await ImagePickergetPendingResultAsync({
//     // });

//     console.log('result', result);
//     // console.log('result2', ImagePicker);

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };

//   const openCamera = async () => {
//     // Ask the user for the permission to access the camera
//     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert("You've refused to allow this appp to access your camera!");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//       exif: true,
//     });

//     // Explore the result
//     console.log(result);

//     if (!result.cancelled) {
//       setImage(result.uri);
//       console.log(result.uri);
//     }
//     locationPicker();
//   }

//   const locationPicker = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       setErrorMsg('Permission to access location was denied');
//       return;
//     }

//     let location = await Location.getCurrentPositionAsync({});
//     let gps = await Location.reverseGeocodeAsync({
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude
//     })
//     // let address = await Location.geocodeAsync({
//     // })
//     setLocation(location);
//     console.log('thisis', location);
//     // console.log('address', address);
//     console.log('we have city', gps[0].city, '    ', gps[0].region);
//   }

//   return (
//     <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#84C0FB' }}>
//       <Text style={styles.header}> Post Your Pets</Text>
//       <TouchableOpacity style={styles.button} onPress={pickImage}>
//         {image === null ? <FontAwesome name="image" style={styles.icon} size={100} /> : <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />}
//       </TouchableOpacity>
//       <View style={styles.section}>
//         <Text style={styles.caption}>Caption </Text>

//         <TextInput
//           style={styles.input}
//           // style={{ height: 150, width: 300, backgroundColor: 'azure', fontSize: 15 }}
//           placeholder="Say something about your pet!"
//           onChangeText={(text) => setText({ text })}
//         />
//       </View>
//       <View style={styles.section}>
//         <Checkbox
//           value={isSelected}
//           onValueChange={setSelection}
//           style={styles.checkbox}
//           color={isSelected ? '#4630EB' : undefined}
//         />
//         <Text style={styles.caption}>Share Location</Text>
//       </View>
//       <TouchableOpacity
//         style={styles.postButton}
//         // onPress={() => navigate('HomeScreen')}
//         underlayColor='#fff'>
//         <Text style={styles.post}>Post</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: '#57D785',
//     // borderRadius: 20,
//     // padding: 10,
//     // marginBottom: 20,
//     shadowColor: '#303838',
//     shadowOffset: { width: 0, height: 5 },
//     shadowRadius: 10,
//     shadowOpacity: 0.35,
//     width: 300,
//     height: 200,
//     borderRadius: 10,
//     borderColor: '#6E96BD'

//   },
//   icon: {
//     color: '#D6F7D6',
//   },
//   header: {
//     color: '#FFFFFF',
//     fontSize: 25
//   },
//   caption: {
//     color: '#FFFFFF',
//     fontSize: 15,
//     padding: 10,
//   },
//   checkbox: {
//     margin: 8,
//     backgroundColor: '#D6F7D6',
//     borderWidth: 1,
//   },
//   section: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   captionSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   input: {
//     height: 150,
//     width: 300,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//     backgroundColor: 'azure',
//     fontSize: 15,
//     borderRadius: 10,
//     borderColor: '#6E96BD'
//   },
//   post: {
//     color: '#D6F7D6',
//     textAlign: 'center',
//     marginTop: 5,
//     paddingLeft: 10,
//     paddingRight: 10,
//     fontSize: 20
//   },
//   postButton: {
//     height: 60,
//     width: 120,
//     marginRight: 40,
//     marginLeft: 40,
//     marginTop: 10,
//     paddingTop: 10,
//     paddingBottom: 10,
//     backgroundColor: '#57D785',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#6E96BD'
//   }
// });