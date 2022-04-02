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

const ItemView = ({ item }) => {
  const onUserPress = async (username) => {
    const history = await getLocally("searchHistory");
    let newHistory = history ? [...JSON.parse(history)] : [];
    if (newHistory.includes(username)) return;
    newHistory.push(username);
    storeLocally("searchHistory", JSON.stringify(newHistory));
  };

  if (item === "Recent Searches" || item === "No Recent Searches")
    return (
      <Text style={{ padding: 15, fontSize: 15, fontWeight: "100" }}>
        {item}
      </Text>
    );
  return (
    <TouchableOpacity onPress={() => onUserPress(item)}>
      <View>
        <Text style={{ padding: 15 }}>{item}</Text>
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

export default function SearchScreen() {
  //placeholder data for now
  const reduxData = [
    "Joe",
    "jackie",
    "Judith",
    "Harry",
    "Dominic",
    "Troy",
    "Jenya",
    "Glen",
    "Ash",
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
    // removeLocally("searchHistory")
  }, []);

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
          item.toLowerCase().startsWith(currentSearch.current.toLowerCase())
        ).length
      ) {
        setLoading(false);
        return;
      }
      const user = await axios.get(
        `http://${API_IP}/user/getUser/${currentSearch.current}`
      );
      if (user.data.userInfo) {
        setFilteredData([currentSearch.current]);
      } else {
        setFilteredData(["User not found"]);
      }
      setLoading(false);
    }),
    []
  );

  const searchFilter = (text) => {
    if (text) {
      const newData = reduxData.filter((item) =>
        item.toLowerCase().startsWith(text.toLowerCase())
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
          renderItem={ItemView}
        />
      ) : (
        <SearchRandomUser search={search} />
      )}
    </View>
  );
}
