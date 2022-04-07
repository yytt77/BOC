import {
  Text,
  View,
  ActivityIndicator,
} from "react-native";

import { colorTheme1 } from "../../../constants";
import { Loading as styles } from "../Styles";

export default ({ search }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Searching for User: {search}</Text>
      <ActivityIndicator size="small" color={colorTheme1.buttonColor} />
    </View>
  );
};