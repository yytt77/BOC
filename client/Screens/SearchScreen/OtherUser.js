import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { OtherUser as styles } from "./Styles";
import FeedTemplate from '../../Templates/FeedTemplate'
import HeaderTemplate from '../../Templates/HeaderTemplate'
import { colorTheme1, API_IP } from "../../constants";
import axios from "axios";
const userEndpoint = `http://${API_IP}/user/getUser/`;

export default function OtherUser({ route, navigation }) {
  const [userData, setUserData] = useState(route.params);

  const refreshCallback = async () => {
    try {
      const user = await axios.get(
        `${userEndpoint}${userData.userInfo.username}`
      );
      setUserData(user.data);
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <View style={[{backgroundColor: `${colorTheme1.pageColor}`}, styles.container]}>
      <TouchableOpacity onPress={() => navigation.navigate("SearchBar")}>
        <Text>Go Back</Text>
      </TouchableOpacity>
      <View
        styles={styles.headerContainer}>
        <HeaderTemplate userData={userData}></HeaderTemplate>
      </View>
      <View
        styles={styles.feedContainer}>
        <FeedTemplate userData={userData.posts} refreshData={refreshCallback}></FeedTemplate>
      </View>
    </View>
  );
}
