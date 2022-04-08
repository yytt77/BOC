import { Text, View, TouchableOpacity, Image } from "react-native";
import { getLocally, storeLocally } from "../../../LocalStorage";
import { Item as styles } from "../Styles";
import { API_IP } from "../../../constants";
import axios from "axios";
const userEndpoint = `http://${API_IP}/user/getUser/`;

export default ({ item }, deleteHistory, openOtherUser) => {
  const onUserPress = async (username) => {
    try {
      const user = await axios.get(`${userEndpoint}${item.followedUser}`);
      const userMeta = {
        followedUser: user.data.userInfo.username,
        followedProfPic: user.data.userInfo.profPhoto,
      };
      const history = await getLocally("searchHistory");
      let newHistory = history ? [...JSON.parse(history)] : [];
      if (!newHistory.includes(userMeta)) {
        newHistory.push(userMeta);
        storeLocally("searchHistory", JSON.stringify(newHistory));
      }
      openOtherUser(user.data);
    } catch (err) {
      console.error(err);
      alert("Not Able to Retrieve User");
    }
  };

  if (item === "Recent Searches")
    return (
      <View style={styles.historyLabel}>
        <Text>{item}</Text>
        <TouchableOpacity onPress={deleteHistory}>
          <Text style={styles.clear}>Clear All</Text>
        </TouchableOpacity>
      </View>
    );
  if (item === "No Recent Searches")
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
          <Text>{item.followedUser}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
