import { Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { guestHome } from '../../../Redux/actions';
import { lightTheme, darkTheme } from '../../../constants';
import styles from './Styles';
import { useFonts } from "expo-font";

export default function BackButton() {
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();
  let current;

  if (theme) {
    current = lightTheme;
  } else {
    current = darkTheme;
  }

  const [fontsLoaded] = useFonts({
    comicSans: require('../../../assets/fonts/comic.ttf')
  });

  return (
    <View>
      <Text
        style={[{ color: current.tabIconInactive }, styles.x]}
        onPress={ () => dispatch(guestHome())}>
        X
      </Text>
    </View>
  )
}
