import { View, TouchableOpacity, Image } from "react-native";
import styles from "./appStyles";
import { useEffect } from "react";
// import { useFonts } from "expo-font";

//Navigation/Screens
import { NavigationContainer, StackRouter } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiscoverScreen from "../Screens/DiscoverScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import UserScreen from "../Screens/UserScreen";
import SearchScreen from "../Screens/SearchScreen";
import Upload from "../Screens/UploadScreen/Upload";
import { API_IP } from "../constants";

//Colors
import { palette } from '../Utils/ColorScheme';

import axios from "axios";
const userEndpoint = `http://${API_IP}/user/getUser/`;
import defaultUser from "./defaultUser.json";

//Icons
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import plus from "../assets/plus.png";

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from "../Redux/actions";

const Tab = createBottomTabNavigator();

export default function Authorized() {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const currUser = useSelector(state => state.user.username);
  const getUser = async () => {
    //for now hardcoded, but later get current logged in user from redux store (Dominic puts in there from login screen)
    try {
      const user = await axios.get(`${userEndpoint}${currUser}`);
      if (user.data.userInfo) {
        dispatch(updateUser(user.data))
      } else {
        dispatch(updateUser(defaultUser))
      }
    } catch (err) {
      console.error(err);
      dispatch(updateUser(defaultUser));
      alert("No Connection");
    }
  };

  useEffect(() => {
    getUser()
  }, []);

  // const [fontsLoaded] = useFonts({
  //   comicSans: require('../assets/fonts/comic.ttf')
  // });

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { height: 50, backgroundColor: palette(state.theme).navColor },
          tabBarShowLabel: true,
          tabBarStyle: {
            ...styles.tabBarStyle,
            backgroundColor: palette(state.theme).navColor,
          },
          tabBarActiveTintColor: palette(state.theme).tabIconActive,
          tabBarInactiveTintColor: palette(state.theme).tabIconInactive,
        })}
      >
        <Tab.Screen
          name="Home"
          component={DiscoverScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <FontAwesome5
                  name="home"
                  size={20}
                  color={
                    focused ? palette(state.theme).tabIconActive : palette(state.theme).tabIconInactive
                  }
                ></FontAwesome5>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <FontAwesome5
                  name="search"
                  size={20}
                  color={
                    focused ? palette(state.theme).tabIconActive : palette(state.theme).tabIconInactive
                  }
                ></FontAwesome5>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Upload"
          component={Upload}
          options={{
            tabBarIcon: () => (
              <View
                style={[
                  styles.uploadCircle,
                  { backgroundColor: palette(state.theme).tabIconInactive },
                ]}
              >
                <Image
                  source={plus}
                  style={[styles.plus, { tintColor: palette(state.theme).navColor }]}
                ></Image>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <Entypo
                  name="dots-three-horizontal"
                  size={24}
                  color={
                    focused ? palette(state.theme).tabIconActive : palette(state.theme).tabIconInactive
                  }
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={UserScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <FontAwesome5
                  name="user-alt"
                  size={20}
                  color={
                    focused ? palette(state.theme).tabIconActive : palette(state.theme).tabIconInactive
                  }
                ></FontAwesome5>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const EmptyScreen = () => <View></View>;
