import { Text, View } from 'react-native';
import AccountInput from './AccountInput.js';
import PasswordInput from './PasswordInput.js';

export default function SignInScreen() {

   const onPressSignInButton = () => {
     //
   }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sign in here</Text>
      <AccountInput />
      <PasswordInput />
      <SignInButton onPress = {onPressSignInButton} />
    </View>
  );
}