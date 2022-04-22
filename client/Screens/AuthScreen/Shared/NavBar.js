import { useState } from 'react';
import { Text, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../../../constants';
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "expo-font";

import styles from './Styles'
import { guestAuth } from '../../../Redux/actions';

export default function NavBar() {
  const theme = useSelector(state => state.theme);
  const guestHome = useSelector(state => state.guestHome);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(() => {
    if (theme) {
      return lightTheme;
    } else {
      return darkTheme;
    }
  });

  const [fontsLoaded] = useFonts({
    comicSans: require('../../../assets/fonts/comic.ttf')
  });

  return (
    <View style={[{ backgroundColor: current.navColor }, styles.loginBar]}>
      <View style={styles.icon}>
        <FontAwesome5
          name='door-open'
          size={50}
          color={current.tabIconInactive}
          onPress={() => dispatch(guestAuth())}
        />
        <Text
          style={[{ color: current.iconColor }, styles.loginText]}
          onPress={() => dispatch(guestAuth())}>
          Log In
        </Text>
      </View>
    </View>
  )
}
