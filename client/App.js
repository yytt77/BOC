import { View } from "react-native";
import { Provider } from 'react-redux';

import { store } from './Redux/store';
import App from "./Pages/index";

export default function AppWrapper() {
  return(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
