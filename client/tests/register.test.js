/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Provider } from 'react-redux';
import { create } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';

import RegisterScreen from '../Screens/AuthScreen/RegisterScreen/Register.js';
import AccountInput from '../Screens/AuthScreen/RegisterScreen/components/AccountInput';

const mockStore = configureStore();

describe('Register', () => {

  const state = {
    authScreen: 'register',
    guestHome: 'home',
    theme: true,
    user: {
      username: 'bigglesworth'
    }
  };

  describe('Snapshots', () => {
    const store = mockStore(state)

    it('should render RegisterScreen', () => {
      const Register = create(
        <Provider store={store}>
          <RegisterScreen />
        </Provider>
      );

      const tree = Register.toJSON();
      expect(tree).toMatchSnapshot();
    })

  })

  describe('Account Input', () => {
    let store, acctInput;

    beforeEach(() => {
      store = mockStore(state);
      acctInput = <Provider store={store}>
        <AccountInput />
      </Provider>
    })

    it('should render error messages on click w/o input data', () => {
      const { getByText, toJSON } = render(acctInput);
      fireEvent.press(getByText('Sign Up'));

      const children = toJSON().children;

      const username = children[9]['children'][0];
      const userInvalid = username === 'Username must be between 2 and 16 characters long.';

      const email = children[10]['children'][0];
      const emailInvalid = email === 'Invalid email format.';

      const pw1 = children[11]['children'][0];
      const pw1Invalid = pw1 === 'Password must contain at least 8 characters.';

      const pw2 = children[12]['children'][0];
      const pw2Invalid = pw2 === 'Password must contain at least 1 capital letter.';

      const pw3 = children[13]['children'][0];
      const pw3Invalid = pw3 === 'Password must contain at least 1 number.';

      const pw4 = children[14]['children'][0];
      const pw4Invalid = pw4 === 'Password must contain at least 1 special character.';

      const allInvalid = userInvalid && emailInvalid && pw1Invalid && pw2Invalid && pw3Invalid && pw4Invalid;
      expect(allInvalid).toBe(true);
    })

    it('should render and validate username field', () => {
      const { getByLabelText, getByText, toJSON } = render(acctInput);
      const children = toJSON().children;
      const username = children[0]['children'][0];
      expect(username).toBe('Username');

      fireEvent.changeText(getByLabelText('reg-username'), 'bigglesworth');
      fireEvent.press(getByText('Sign Up'));
      expect(toJSON()['children'][9]['children'][0]).toBe('Invalid email format.');
    })

    it('should redirect user when valid data is sumbitted', async () => {
      const { getByLabelText, getByText, toJSON } = render(acctInput);
      const children = toJSON().children;

      fireEvent.changeText(getByLabelText('reg-username'), 'bigglesworth');
      fireEvent.changeText(getByLabelText('reg-email'), 'bworth@gmail.com');
      fireEvent.changeText(getByLabelText('reg-pw1'), 'Test@32$');
      fireEvent.changeText(getByLabelText('reg-pw2'), 'Test@32$');
      fireEvent.press(getByText('Sign Up'));

      let c = 'children';
      let signUp = toJSON()[c][8][c][0][c][0][c][0];
      expect(signUp).toBe('Sign Up');
    })

  })

})
