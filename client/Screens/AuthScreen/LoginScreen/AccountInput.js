import { Text, View, TextInput } from 'react-native';


export default function AccountInput() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Account name</Text>
      <TextInput placeholder = 'your account name'></TextInput>
    </View>
  );
}