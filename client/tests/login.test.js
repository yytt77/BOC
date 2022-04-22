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
      expect(tree.children.length).toBe(6);
      expect(tree.props.style.length).toBe(2);
      expect(tree.props.style[1]).toEqual( {"flex": 1, "justifyContent": "center"});
      expect(tree.props.style[0].backgroundColor).toEqual('#84C0FB');
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

    it('should render Account Input', () => {
      const Account = create(
        <Provider store={store}>
          <AccountInput />
        </Provider>
      );

      const tree = Account.toJSON();
      expect(tree.children.length).toBe(8);
      expect(tree.props.style).toEqual({width: '70%'});
      expect(tree.children[0].children).toEqual(["Account name"]);
      expect(tree.children[2].children).toEqual(["Password"]);

  })

  xit('should correctly change login and password', () => {
    const Account = create(
      <Provider store={store}>
        <AccountInput />
      </Provider>
    );

    const { getByText, toJSON } = render(acctInput);
    fireEvent.press(getByText('SignUp'));
    const tree = Account.toJSON();
    //console.log(tree);


})


})

})