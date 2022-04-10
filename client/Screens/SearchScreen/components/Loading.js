import { Text, View, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from 'react-redux';

import { lightTheme } from "../../../constants";
import { palette } from '../../../Utils/ColorScheme';
import { Loading as styles } from "../Styles";

export default ({ search }) => {

  const state = useSelector((state) => state);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Searching for User: {search}</Text>
      <ActivityIndicator size="small" color={palette(state.theme).buttonColor} />
    </View>
  );
};