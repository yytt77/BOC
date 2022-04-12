import { View, Text, Image } from "react-native";
import { Chat as styles, Item as itemStyes } from "../Styles";
import { palette } from "../../../Utils/ColorScheme";

export default ({ me, other, messages }) => {
  return messages.map((msg, i) => {
    if (msg.sender === me.username) {
      return (
        <View key={i}>
          <Text style={{ color: "red" }}>{msg.message}</Text>
          <Image
              style={itemStyes.profileImage}
              resizeMode="cover"
              source={{
                uri: `${me.profPhoto}`,
              }}
            />
        </View>
      );
    } else if (msg.sender === other.username) {
      return (
        <View key={i}>
          <Text style={{ color: "green" }}>{msg.message}</Text>
          <Image
              style={itemStyes.profileImage}
              resizeMode="cover"
              source={{
                uri: `${other.profPhoto}`,
              }}
            />
        </View>
      );
    }
  });
};
