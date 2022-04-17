import { View, Text, Image } from "react-native";
import { Message as styles, Item as itemStyles } from "../Styles";
import { palette } from "../../../Utils/ColorScheme";

export default ({ me, other, messages }) => {
  return messages.map((msg, i) => {
    if (msg.sender === me.username) {
      return (
        <View key={i}>
          <View style={[styles.chat, {alignSelf: "flex-end"}]}>
            <Text style={styles.chatText}>{msg.message}</Text>
            <View style={[styles.rTail, styles.tail]}></View>
          </View>
          <Image
            style={[styles.rProfileImage, styles.profileImage]}
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
          <View style={styles.chat}>
            <Text style={styles.chatText}>{msg.message}</Text>
            <View style={[styles.lTail, styles.tail]}></View>
          </View>
          <Image
            style={[styles.lProfileImage, styles.profileImage]}
            resizeMode="cover"
            source={{
              uri: `${me.profPhoto}`,
            }}
          />
        </View>
      );
    }
  });
};
