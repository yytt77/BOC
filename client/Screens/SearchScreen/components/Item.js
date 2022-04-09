import { Text, View, TouchableOpacity, Image } from "react-native";
import { getLocally, storeLocally } from "../../../LocalStorage";
import { Item as styles } from "../Styles";
import { API_IP } from "../../../constants";
import axios from "axios";
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
  recentSearches,
  setRecentSearches
) => {
  const onUserPress = async (username) => {
    try {
      const user = await axios.get(`${userEndpoint}${item.followedUser}`);
      const userMeta = {
        followedUser: user.data.userInfo.username,
        followedProfPic: user.data.userInfo.profPhoto,
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

  if (item === recentHistory)
    return (
      <View style={styles.historyLabel}>
        <Text style={styles.comicText}>{item}</Text>
        <TouchableOpacity onPress={deleteHistory}>
          <Text style={styles.clear}>Clear All</Text>
        </TouchableOpacity>
      </View>
    );
  if (item === emptyHistory || item === emptyQuery || item === failedConnection)
    return <Text style={styles.historyLabel}>{item}</Text>;
  return (
    <TouchableOpacity onPress={() => onUserPress(item.followedUser)}>
      <View>
        <View style={styles.item}>
          <Image
            style={styles.profileImage}
            resizeMode="cover"
            source={{
              uri: `${item.followedProfPic}`,
            }}
          />
          <Text style={styles.comicText}>{item.followedUser}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
