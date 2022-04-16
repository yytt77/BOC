import { Text, View, Image } from 'react-native';
import AccountInput from './AccountInput.js';
import PasswordInput from './PasswordInput.js';
import ForgotPassword from './ForgotPassword.js';
import ContinueButton from './ContinueButton.js';
import Logo from '../../../assets/logo_small.png';
import BackButton from './BackButton.js';

export default function SignInScreen() {

   const onPressSignInButton = () => {
     //send login and password to backend
     //receive answer from backend
   }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
      source = {Logo} />
      <BackButton />
      <Text>Sign in here</Text>
      <AccountInput />
      <PasswordInput />
     <Text>Forgot password?</Text>
      <ContinueButton onPress = {onPressSignInButton} />
    </View>
  );
}//
