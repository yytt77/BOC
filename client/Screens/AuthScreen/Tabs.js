import { Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { authLog, authReg } from '../../Redux/actions';

export default function Tabs() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const screen = useSelector(state => state.authScreen);

  console.log('ST ', state);
  console.log('ASDF ', screen);

  const login = () => {
    dispatch(authLog());
    console.log('STATE ', state);
  }

  const register = () => {
    dispatch(authReg());
    console.log('STATE REG ', state);
  }

  return (
    <View>
      <Text onPress={() => {login()}}>Log In</Text>
      <Text onPress={() => {register()}}>Register</Text>
    </View>
  )
}
