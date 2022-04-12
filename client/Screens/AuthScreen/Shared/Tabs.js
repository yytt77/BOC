import { Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { authLog, authReg } from '../../../Redux/actions';

export default function Tabs() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const screen = useSelector(state => state.authScreen);

  return (
    <View>
      <Text onPress={() => dispatch(authLog())}>Log In</Text>
      <Text onPress={() => dispatch(authReg())}>Register</Text>
    </View>
  )
}
