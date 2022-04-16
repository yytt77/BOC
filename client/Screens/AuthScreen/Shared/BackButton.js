import { Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { guestHome } from '../../../Redux/actions';

export default function BackButton() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const screen = useSelector(state => state.guestHome);

  return (
    <View>
      <Text onPress={ () => dispatch(guestHome())}>X</Text>
    </View>
  )
}
