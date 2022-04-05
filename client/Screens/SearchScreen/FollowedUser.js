import { Text, TouchableOpacity, View } from "react-native";
import UserScreen from "../UserScreen";

export default function FollowedUser() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity><Text>Go Back</Text></TouchableOpacity>
      <UserScreen/>
    </View>
  );
}
