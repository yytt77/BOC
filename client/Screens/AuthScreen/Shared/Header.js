import { View } from "react-native";
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../../../constants';

export default function Header() {
  const theme = useSelector(state => state.theme);
  let current;

  if (theme) {
    current = lightTheme;
  } else {
    current = darkTheme;
  }

  return (
    <View style={{ backgroundColor: current.navColor, height: 50 }} />
  )
}
