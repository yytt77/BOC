
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import  DiscoverScreen  from "../DiscoverScreen/index";
import { Upload } from "./Upload";
import SearchBar from "../SearchScreen/SearchBar";

const Stack = createNativeStackNavigator();

export default function SearchScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="DiscoverScreen" component={DiscoverScreen} />
        <Stack.Screen name="Upload" component={Upload} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
