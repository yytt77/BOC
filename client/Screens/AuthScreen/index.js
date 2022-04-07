import { Text, View } from 'react-native';
import Authenticate from './AuthScreen';

export default function AuthScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Random Feed Here</Text>
      <Authenticate />
    </View>
  );
}
