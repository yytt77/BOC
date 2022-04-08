import { View } from "react-native";
import { Provider } from 'react-redux';

import { store } from './Redux/store';
import App from "./Pages/index";

export default function AppWrapper() {
  console.log('STORE ', store.getState());
  return(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
