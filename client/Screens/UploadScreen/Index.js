// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import DiscoverScreen from "../DiscoverScreen/index";
// import Upload from "./Upload";

// const SearchStack = createNativeStackNavigator();

// export default function UploadNavigator() {
//   return (
//     <SearchStack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <SearchStack.Screen name="Upload" component={Upload} />
//       <SearchStack.Screen name="Discover" component={DiscoverScreen} />
//     </SearchStack.Navigator>
//   );
// }

// import SearchBar from "../SearchScreen/SearchBar";
// import OtherUser from "../SearchScreen/OtherUser";
// import Chat from "../SearchScreen/Chat";
// import Uploadbutton from './Upload';
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from '@react-navigation/native';

// const SearchStack = createNativeStackNavigator();

// export default function SearchScreen() {
//   return (
//     <SearchStack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//             <SearchStack.Screen name="Upload" component={Uploadbutton} />
//       <SearchStack.Screen name="SearchBar" component={SearchBar} />
//       <SearchStack.Screen name="OtherUser" component={OtherUser} />
//       <SearchStack.Screen name="Chat" component={Chat} />
//     </SearchStack.Navigator>
//   );
// }


// function MyStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen  name="Upload" component={Uploadbutton} />
//       <Stack.Screen name="SearchBar" component={SearchBar}  />
//     </Stack.Navigator>
//   );
// }

// export default function SearchScreen() {
//   return (
//     <NavigationContainer>
//       <MyStack />
//     </NavigationContainer>
//   );
// }

// import SearchBar from "../SearchScreen/SearchBar";
// import OtherUser from "../SearchScreen/OtherUser";
// import Chat from "../SearchScreen/Chat";
// import Uploadbutton from './Upload';
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from '@react-navigation/native';

// const SearchStack = createNativeStackNavigator();

// export default function SearchScreen() {
//   return (
//     <SearchStack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//             <SearchStack.Screen name="Upload" component={Uploadbutton} />
//       <SearchStack.Screen name="SearchBar" component={SearchBar} />
//       <SearchStack.Screen name="OtherUser" component={OtherUser} />
//       <SearchStack.Screen name="Chat" component={Chat} />
//     </SearchStack.Navigator>
//   );
// }


// function MyStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen  name="Upload" component={Uploadbutton} />
//       <Stack.Screen name="SearchBar" component={SearchBar}  />
//     </Stack.Navigator>
//   );
// }

// export default function SearchScreen() {
//   return (
//     <NavigationContainer>
//       <MyStack />
//     </NavigationContainer>
//   );
// }

// import * as React from 'react';
// import { Button, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import DiscoverScreen from "../DiscoverScreen/index";


// function ProfileScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         title="Go to Notifications"
//         onPress={() => navigation.navigate('DiscoverScreen')}
//       />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// const Stack = createNativeStackNavigator();

// function MyStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="DiscoverScreen" component={DiscoverScreen} />
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//       <MyStack />
//   );
// }
