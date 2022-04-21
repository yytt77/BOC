import { Text, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../../../constants';
import { FontAwesome5 } from "@expo/vector-icons";
import styles from './Styles'
import { guestAuth } from '../../../Redux/actions';

export default function NavBar() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);
  let current;

  if (theme) {
    current = lightTheme;
  } else {
    current = darkTheme;
  }

  return (
    <View style={[{ backgroundColor: current.navColor }, styles.loginBar]}>
      <View style={styles.icon}>
        <FontAwesome5
          name="door-open"
          size={50}
          color={current.tabIconInactive}
          onPress={() => dispatch(guestAuth())}
        />
        <Text
          style={[{ color: current.iconColor }, styles.loginText]}
          onPress={() => dispatch(guestAuth())}
        >
          Log In
        </Text>
      </View>
    </View>
  )
}
