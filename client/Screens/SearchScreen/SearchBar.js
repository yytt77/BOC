//External Libraries
import { View, TouchableOpacity, FlatList, TextInput } from "react-native";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

//Internal Dependencies
import { SearchBar as styles } from "./Styles";
import { palette } from '../../Utils/ColorScheme';
import { API_IP } from "../../constants";
import { getLocally, removeLocally } from "../../LocalStorage";

//Components
import ItemSeparator from "./components/ItemSeparator";
import Item from "./components/Item";
import Loading from "./components/Loading";

//Constants
const emptyHistory = "No Recent Searches";
const recentHistory = "Recent Searches";
const emptyQuery = "User not found";
const failedConnection = "Could not connect";
const userExistsEndpoint = `http://${API_IP}/user/getUserMeta/`;

export default function SearchBar({ navigation }) {
  //STATE MANAGEMENT
  const state = useSelector(state => state);
  const user = useSelector(state => state.user);
  //User's following list, which will be suggested users without querying database
  const reduxData = user.userInfo.following;
  const [recentSearches, setRecentSearches] = useState();
  const [filteredData, setFilteredData] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  //used in debounce function to search the current search string
  const currentSearch = useRef();
  currentSearch.current = search;

  //INITIAL VIEW
  useEffect(() => {
    const initialPopulate = async () => {
      try {
        const history = await getLocally("searchHistory");
        const initialItems = history
          ? [recentHistory, ...JSON.parse(history)]
          : [emptyHistory];
        setFilteredData(initialItems);
        setRecentSearches(initialItems);
      } catch (err) {
        alert("Trouble retrieving recent searches");
      }
    };
    initialPopulate();
  }, []);

  //HELPER FUNCTIONS
  const deleteHistory = async () => {
    await removeLocally("searchHistory");
    const initialItems = [emptyHistory];
    setFilteredData(initialItems);
    setRecentSearches(initialItems);
  };

  const openOtherUser = (userData) => {
    navigation.navigate("OtherUser", userData);
  };

  const openChat = (userData) => {
    navigation.navigate("Chat", userData);
  };

  const matchFollowing = (searchParam) => {
    const res = reduxData.filter((item) =>
      item.username.toLowerCase().startsWith(searchParam.toLowerCase())
    );
    return res.length ? res : false;
  };

  const debouncedQuery = async () => {
    if (currentSearch.current && !matchFollowing(currentSearch.current)) {
      try {
        const user = await axios.get(
          `${userExistsEndpoint}${currentSearch.current}`
        );
        let queriedItem;
        if (user.data.username) {
          queriedItem = [
            {
              _id: user.data._id,
              username: user.data.username,
              profPhoto: user.data.profPhoto,
            },
          ];
        } else {
          queriedItem = [emptyQuery];
        }
        setFilteredData(queriedItem);
      } catch (err) {
        console.error(err);
        setFilteredData([failedConnection]);
      }
    }
    setLoading(false);
  };

  const debounce = (func) => {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(this, args);
      }, 1000);
    };
  };

  const optimizedSearch = useCallback(debounce(debouncedQuery), []);

  const searchFilter = (text) => {
    if (text) {
      const newData = matchFollowing(text);
      if (!newData.length) {
        setLoading(true);
        optimizedSearch();
        setSearch(text);
        return;
      }
      setLoading(false);
      setFilteredData(newData);
    } else {
      setFilteredData(recentSearches);
    }
    setSearch(text);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: palette(state.theme).pageColor }]}
    >
      <TextInput
        style={[styles.bar, {backgroundColor: palette(state.theme).searchBarColor}]}
        value={search}
        placeholder="Search people you follow"
        placeholderTextColor={palette(state.theme).searchText}
        underlineColorAndroid="transparent"
        onChangeText={(text) => searchFilter(text)}
        autoCapitalize="none"
      />
      {!loading ? (
        <FlatList
          keyExtractor={(item) => JSON.stringify(item)}
          ItemSeparatorComponent={ItemSeparator}
          data={filteredData}
          renderItem={(item) => Item(item, deleteHistory, openOtherUser, openChat, recentSearches, setRecentSearches, palette(state.theme).searchText, palette(state.theme).searchBarColor)}
        />
      ) : (
        <Loading search={search} textColor={palette(state.theme).searchText}/>
      )}
    </View>
  );
}
