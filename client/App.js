import App from "./Pages/Authorized";
import UnAuthorized from "./Pages/UnAuthorized";

import { Provider } from 'react-redux';
import { store } from './Redux/store';

export default function AppWrapper() {
  console.log('STORE ', store.getState().authorizedUser);
  let authorizedUser;

  // if (store.getState().authorizedUser) {
  //   authorizedUser =
  // }

  return(
    <Provider store={store}>
      {store.getState().authorizedUser ? (
        <App />
      ) : (
        <UnAuthorized />
      )}
    </Provider>
  );
}
