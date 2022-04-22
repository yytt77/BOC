import { useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { authLog, authReg } from '../../../Redux/actions';
import { lightTheme, darkTheme } from '../../../constants';
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import styles from './Styles';

export default function Tabs() {
  const theme = useSelector(state => state.theme);
  const authScreen = useSelector(state => state.authScreen);
  const [current, setCurrent] = useState(() => {
    if (theme) {
      return lightTheme;
    } else {
      return darkTheme;
    }
  });

  const [lines, setLines] = useState(() => {
    if (authScreen === 'login') {
      return {
        log: <View style={styles.tabLines}></View>,
        reg: <View></View>
      }
    } else {
      return {
        log: <View></View>,
        reg: <View style={styles.tabLines}></View>
      }
    }
  });

  const [fontsLoaded] = useFonts({
    comicSans: require('../../../assets/fonts/comic.ttf')
  });

  const dispatch = useDispatch();
  const switchView = (view) => {
    if (view === 'login') {
      setLines({
        log: <View style={styles.tabLines}></View>,
        reg: <View></View>
      });
      dispatch(authLog());
    } else {
      setLines({
        log: <View></View>,
        reg: <View style={styles.tabLines}></View>
      });
      dispatch(authReg());
    }
  }

  return (
    <View style={styles.tabs}>
      <View>
        <Text
          style={styles.tabText}
          onPress={() => switchView('login')}>
          Log In
        </Text>
        {lines.log}
      </View>
      <View>
        <Text
          style={styles.tabText}
          onPress={() => switchView('register')}>
          Register
        </Text>
        {lines.reg}
      </View>
    </View>
  )
}
