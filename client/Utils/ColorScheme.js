import { lightTheme, darkTheme } from '../constants';

export const palette = (theme) => {
  if (theme) {
    return lightTheme;
  } else {
    return darkTheme;
  }
}