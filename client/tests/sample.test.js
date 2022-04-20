/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Provider } from 'react-redux';
import { create } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';

import AppWrapper from '../App';
import RegisterScreen from '../Screens/AuthScreen/RegisterScreen/Register.js';
import AccountInput from '../Screens/AuthScreen/RegisterScreen/components/AccountInput';

const mockStore = configureStore();

describe('Samples', () => {

  describe('@testing-library/react-native', () => {
    const state = {
      authScreen: 'register',
      guestHome: 'home',
      theme: true,
      user: {
        username: 'bigglesworth'
      }
    };

    let store, acctInput;

    beforeEach(() => {
      store = mockStore(state);
      acctInput = <Provider store={store}>
        <AccountInput />
      </Provider>
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

  })

  describe('react-test-renderer', () => {

    // Unit Test - Replaced by React Testing Library .toJSON
    it('should render AppWrapper', () => {
      const tree = renderer.create(<AppWrapper />).toJSON();

      // AppWrapper renders UnAuthorized page by default
      expect(tree.children.length).toBe(2);
    })

    // Unit Test - Replaced by React Testing Library .toJSON
    it('should render guest discovery feed', () => {
      const tree = renderer.create(<AppWrapper />).toJSON();
      const feed = tree['children'][0]['children'][0];

      // placeholder text from UnAuthorized page
      expect(feed).toBe('Discovery Feed Here');
    })

    // Snapshot Test
    it('should render app wrapper', () => {
      const tree = create(<AppWrapper />).toJSON();
      expect(tree).toMatchSnapshot();
    })

  })

})