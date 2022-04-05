import { View, TouchableOpacity, Image } from "react-native";
import styles from "../Styles/appStyles";

//Navigation/Screens
import { NavigationContainer, StackRouter } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiscoverScreen from "../Screens/DiscoverScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import UserScreen from "../Screens/UserScreen";
import SearchScreen from "../Screens/SearchScreen";
import Upload from "../Upload";
import { colorTheme1 } from "../constants";

//Icons
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import plus from "../assets/plus.png";

const Tab = createBottomTabNavigator();

export default function Authorized() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {"height": 50, "backgroundColor": colorTheme1.navColor},
          tabBarShowLabel: true,
          tabBarStyle: {...styles.tabBarStyle, backgroundColor: colorTheme1.navColor},
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
                  color={focused ? colorTheme1.pageColor : colorTheme1.buttonColor}
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
                  color={focused ? colorTheme1.pageColor : colorTheme1.buttonColor}
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
              <View style={[styles.uploadCircle, { backgroundColor: colorTheme1.buttonColor }]}>
                <Image source={plus} style={[styles.plus, { tintColor: colorTheme1.navColor }]}></Image>
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
                  color={focused ? colorTheme1.pageColor : colorTheme1.buttonColor}
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
                  color={focused ? colorTheme1.pageColor : colorTheme1.buttonColor}
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
