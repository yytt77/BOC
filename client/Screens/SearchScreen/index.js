import { Text, View } from "react-native";
import Main from "./Main";
import FollowedUser from "./FollowedUser";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const SearchStack = createNativeStackNavigator();

export default function SearchScreen() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SearchStack.Screen name="Main" component={Main} />
      <SearchStack.Screen name="FollowedUser" component={FollowedUser} />
    </SearchStack.Navigator>
  );
}
