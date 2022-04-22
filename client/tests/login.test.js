import React from 'react';
import { Provider } from 'react-redux';
import { create } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';

import LoginScreen from '../Screens/AuthScreen/LoginScreen/LoginScreen.js';
import AccountInput from '../Screens/AuthScreen/LoginScreen/AccountInput.js';

const mockStore = configureStore();

describe('Login', () => {

  const state = {
    authScreen: 'login',
    guestHome: 'home',
    theme: true,
    user: {
      username: 'bilbo_baggins'
    }
  };

  describe('Snapshots', () => {
    const store = mockStore(state)

    it('should render LoginScreen', () => {
      const Login = create(
        <Provider store={store}>
          <LoginScreen />
        </Provider>
      );

      const tree = Login.toJSON();
      expect(tree).toMatchSnapshot();
    })

  })

 

})