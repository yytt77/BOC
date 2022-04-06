import { Text, View, Pressable } from 'react-native';


export default function BackButton({onPress}) {
  return (
    <Pressable onPress={onPress} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>x</Text>
    </Pressable>
  );
}