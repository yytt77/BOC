import { Text, View, TouchableOpacity } from "react-native";
import { getLocally, storeLocally } from "../../../LocalStorage";
import { Item as styles } from "../Styles";

export default ({ item }, deleteHistory, goToUserPage) => {
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
        {item?.followedUser ? (
          <View style={styles.item}>
            <Text>{item.followedProfPic}</Text>
            <Text>{item.followedUser}</Text>
          </View>
        ) : (
          <View style={styles.historyItem}>
            <Text>{item}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
