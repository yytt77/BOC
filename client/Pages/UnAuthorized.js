// React | React-Native
import { Button, View } from "react-native";
// import { NavigationContainer, StackRouter } from '@react-navigation/native';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { guestAuth } from '../Redux/actions';

// Components
import Header from '../Screens/AuthScreen/Shared/Header';
import * as Logo from '../Templates/HeaderTemplate';
import DiscoverScreen from '../Screens/DiscoverScreen/index';
import AuthScreen from '../Screens/AuthScreen/index';


// Styling
import styles from "./appStyles";
import { palette } from '../Utils/ColorScheme';
import { FontAwesome5, Entypo } from "@expo/vector-icons";


export default function UnAuthorized() {
  const state = useSelector(state => state);
  const guestHome = useSelector(state => state.guestHome);
  const dispatch = useDispatch();

  return (
    guestHome === 'home' ? (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <DiscoverScreen />
        <Button title={'Login Icon Here'} onPress={() => dispatch(guestAuth())}></Button>
      </View>
    ) : (
      <AuthScreen />
    )
  )
};
