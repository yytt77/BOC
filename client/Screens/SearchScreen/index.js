import SearchBar from "./SearchBar";
import OtherUser from "./OtherUser";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const SearchStack = createNativeStackNavigator();

export default function SearchScreen() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SearchStack.Screen name="SearchBar" component={SearchBar} />
      <SearchStack.Screen name="OtherUser" component={OtherUser} />
    </SearchStack.Navigator>
  );
}
