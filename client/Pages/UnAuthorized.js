// React | React-Native
import { Button, View } from "react-native";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { guestAuth } from '../Redux/actions';

// Components
import Header from '../Screens/AuthScreen/Shared/Header';
import NavBar from '../Screens/AuthScreen/Shared/NavBar';
import HeaderTemplate from '../Templates/HeaderTemplate'; // Logo
import DiscoverScreen from '../Screens/DiscoverScreen/index';
import AuthScreen from '../Screens/AuthScreen/index';

// Styling
import styles from "./appStyles";
import { palette } from '../Utils/ColorScheme';
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { lightTheme, darkTheme } from '../constants';


export default function UnAuthorized() {
  const state = useSelector(state => state);
  const guestHome = useSelector(state => state.guestHome);
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();
  let current;

  if (theme) {
    current = lightTheme;
  } else {
    current = darkTheme;
  }

  return (
    guestHome === 'home' ? (
      <View style={[{ backgroundColor: current.pageColor }, styles.unAuthorizedView]}>
        <Header />
        <DiscoverScreen />
        <NavBar />
      </View>
    ) : (
      <AuthScreen />
    )
  )
};
