import { Text, TouchableOpacity, View } from "react-native";
import { OtherUser as styles } from "./Styles";
import UserScreen from "../UserScreen";

export default function OtherUser() {
  return (
    <View style={styles.container}>
      <TouchableOpacity><Text>Go Back</Text></TouchableOpacity>
      <UserScreen/>
    </View>
  );
}
