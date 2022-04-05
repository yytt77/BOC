import { Text, View, Pressable } from 'react-native';


export default function SignInButton({onPress}) {
  return (
    <Pressable onPress={onPress} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>SignIn Button</Text>
    </Pressable>
  );
}