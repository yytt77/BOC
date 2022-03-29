import { View, TouchableOpacity, Image } from "react-native";
import styles from "./Styles/appStyles";

//Navigation/Screens
import { NavigationContainer, StackRouter } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiscoverScreen from "./Screens/DiscoverScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import UserScreen from "./Screens/UserScreen";
import SearchScreen from "./Screens/SearchScreen";
import Upload from "./Upload";

//Icons
import { FontAwesome5, Feather } from "@expo/vector-icons";
import plus from './assets/plus.png'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
        })}
      >
        <Tab.Screen
          name="discover"
          component={DiscoverScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  top: "50%",
                }}
              >
                <FontAwesome5
                  name="home"
                  size={20}
                  color={focused ? "red" : "gray"}
                ></FontAwesome5>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  top: "50%",
                }}
              >
                <FontAwesome5
                  name="search"
                  size={20}
                  color={focused ? "red" : "gray"}
                ></FontAwesome5>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="upload"
          component={EmptyScreen}
          options={{
            tabBarIcon: () => (
              <TouchableOpacity onPress={Upload}>
                <View style={styles.uploadCircle}>
                  <Image source={plus} style={styles.plus}></Image>
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  top: "50%",
                }}
              >
                <Feather
                  name="settings"
                  size={24}
                  color={focused ? "red" : "gray"}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="user"
          component={UserScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  top: "50%",
                }}
              >
                <FontAwesome5
                  name="user-alt"
                  size={20}
                  color={focused ? "red" : "gray"}
                ></FontAwesome5>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const EmptyScreen = () => <View></View>
