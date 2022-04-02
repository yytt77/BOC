import { Text, View, TextInput } from 'react-native';


export default function PasswordInput() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Password</Text>
      <TextInput placeholder = 'your password here'></TextInput>
    </View>
  );
}