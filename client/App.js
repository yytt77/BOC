import App from "./Pages/Authorized";
import UnAuthorized from "./Pages/UnAuthorized";

import { Provider } from 'react-redux';
import { store } from './Redux/store';

export default function AppWrapper() {
  return(
    <Provider store={store}>
      <App/>
    </Provider>
  );
}

