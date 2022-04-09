import { View, TouchableOpacity, Image } from "react-native";
import styles from "./appStyles";
import { useEffect } from "react";
import { useFonts } from "expo-font";

//Navigation/Screens
import { NavigationContainer, StackRouter } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiscoverScreen from "../Screens/DiscoverScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import UserScreen from "../Screens/UserScreen";
import SearchScreen from "../Screens/SearchScreen";
import Upload from "../../client/Screens/UploadScreen/Upload";
import { colorTheme1, API_IP } from "../constants";

import axios from "axios";
const userEndpoint = `http://${API_IP}/user/getUser/`;
import defaultUser from "./defaultUser.json";

//Icons
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import plus from "../assets/plus.png";

//Redux
import { useDispatch } from 'react-redux';
import { updateUser } from "../Redux/actions";

const Tab = createBottomTabNavigator();

export default function Authorized() {
  const dispatch = useDispatch();
  const getUser = async () => {
    //for now hardcoded, but later get current logged in user from redux store (Dominic puts in there from login screen)
    const currentUser = "joe"
    try {
      const user = await axios.get(`${userEndpoint}${currentUser}`);
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

  const [fontsLoaded] = useFonts({
    comicSans: require('../assets/fonts/comic.ttf')
  });

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { height: 50, backgroundColor: colorTheme1.navColor },
          tabBarShowLabel: true,
          tabBarStyle: {
            ...styles.tabBarStyle,
            backgroundColor: colorTheme1.navColor,
          },
          tabBarActiveTintColor: colorTheme1.pageColor,
          tabBarInactiveTintColor: colorTheme1.buttonColor,
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
                    focused ? colorTheme1.pageColor : colorTheme1.buttonColor
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
                    focused ? colorTheme1.pageColor : colorTheme1.buttonColor
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
                  { backgroundColor: colorTheme1.buttonColor },
                ]}
              >
                <Image
                  source={plus}
                  style={[styles.plus, { tintColor: colorTheme1.navColor }]}
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
                    focused ? colorTheme1.pageColor : colorTheme1.buttonColor
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
                    focused ? colorTheme1.pageColor : colorTheme1.buttonColor
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
