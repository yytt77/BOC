import { Text, View } from 'react-native';
import AccountInput from './AccountInput.js';
import PasswordInput from './PasswordInput.js';
import ForgotPassword from './ForgotPassword.js';
import ContinueButton from './ContinueButton.js';

export default function SignInScreen() {

   const onPressSignInButton = () => {
     //
   }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sign in here</Text>
      <AccountInput />
      <PasswordInput />
     <Text>Forgot password?</Text>
      <ContinueButton onPress = {onPressSignInButton} />
    </View>
  );
}