import { Text, View } from 'react-native';
import AccountInput from './AccountInput.js';

export default function SignInScreen() {


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sign in here</Text>
      <AccountInput />
    </View>
  );
}