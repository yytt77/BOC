import { Text, View, TouchableOpacity, Image } from "react-native";
import { getLocally, storeLocally } from "../../../LocalStorage";
import { Item as styles } from "../Styles";
import { API_IP } from "../../../constants";
import axios from "axios";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
const emptyHistory = "No Recent Searches";
const recentHistory = "Recent Searches";
const emptyQuery = "User not found";
const failedConnection = "Could not connect";
const userEndpoint = `http://${API_IP}/user/getUser/`;

const arrayIncludesObj = (targetObj, arr) => {
  const target = JSON.stringify(targetObj);
  for (let obj of arr) {
    if (JSON.stringify(obj) === target) return true;
  }
  return false;
};

export default (
  { item },
  deleteHistory,
  openOtherUser,
  openChat,
  recentSearches,
  setRecentSearches,
  textColor,
  searchIconColor
) => {
  const onUserPress = async (username) => {
    try {
      const user = await axios.get(`${userEndpoint}${item.username}`);
      const userMeta = {
        _id: user.data.userInfo._id,
        username: user.data.userInfo.username,
        profPhoto: user.data.userInfo?.profPhoto || null,
      };
      const history = await getLocally("searchHistory");
      let newHistory = history ? [...JSON.parse(history)] : [];
      if (!arrayIncludesObj(userMeta, newHistory)) {
        newHistory.push(userMeta);
        storeLocally("searchHistory", JSON.stringify(newHistory));
        let recentSearch =
          recentSearches.length && recentSearches[0] === emptyHistory
            ? [recentHistory, userMeta]
            : [...recentSearches, userMeta];
        setRecentSearches(recentSearch);
      }
      openOtherUser(user.data);
    } catch (err) {
      console.error(err);
      alert("Not Able to Retrieve User");
    }
  };

  const chatUser = async (username) => {
    try {
      const user = await axios.get(`${userEndpoint}${item.username}`);
      openChat(user.data)
    } catch (err) {
      console.error(err);
      alert("Not Able to Chat User");
    }
  };

  if (item === recentHistory)
    return (
      <View style={styles.historyLabel}>
        <Text style={[styles.comicText, { color: textColor }]}>{item}</Text>
        <TouchableOpacity onPress={deleteHistory}>
          <Text style={styles.clear}>Clear All</Text>
        </TouchableOpacity>
      </View>
    );
  if (item === emptyHistory || item === emptyQuery || item === failedConnection)
    return (
      <Text style={[styles.historyLabel, { color: textColor }]}>{item}</Text>
    );
  return (
    <TouchableOpacity onPress={() => onUserPress(item.username)}>
      <View>
        <View style={styles.item}>
          {item.profPhoto ? (
            <Image
              style={styles.profileImage}
              resizeMode="cover"
              source={{
                uri: `${item.profPhoto}`,
              }}
            />
          ) : (
            <View
              style={[styles.noProfileImage, { backgroundColor: searchIconColor }]}
            >
              <FontAwesome5
                name="user-alt"
                size={20}
                color="grey"
              ></FontAwesome5>
            </View>
          )}
          <View style={styles.right}>
            <TouchableOpacity onPress={() => chatUser(item.username)}>
              <View style={[styles.noProfileImage, { backgroundColor: searchIconColor }]}>
                <FontAwesome name="send-o" size={24} color={textColor} />
              </View>
            </TouchableOpacity>
            <Text
              style={[styles.comicText, styles.username, { color: textColor }]}
            >
              {item.username}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
