/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Provider } from 'react-redux';
import { create } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';

import Twitter from '../Screens/AuthScreen/Shared/Twitter';

const mockStore = configureStore();

describe('Shared Auth Components', () => {

  describe('Twitter', () => {
    const state = {
      authScreen: 'register',
      guestHome: 'home',
      theme: true,
      user: {
        username: 'bigglesworth'
      }
    };

    xdescribe('Snapshots', () => {
      const store = mockStore(state);

      it('should render Twitter', () => {
        const Twitter = create(
          <Provider store={store}>
            <Twitter />
          </Provider>
        );

        const tree = Twitter.toJSON();
        expect(tree).toMatchSnapshot();
      })
    })

    describe('Interactions', () => {
      const onEventMock = jest.fn();
      let store, twitter;

      beforeEach(() => {
        store = mockStore(state);
        twitter = <Provider store={store}>
          <Twitter _openAuthSessionAsync={onEventMock} />
        </Provider>
      })

      it('should attempt to open Twitter window', async () => {
        const { getByLabelText, toJSON } = render(twitter);
        await fireEvent.press(getByLabelText('twitter'))

        let c = 'children';
        let failureMessage = toJSON()[c][1][c][0];
        expect(failureMessage).toBe('Unable to connect to Twitter');
      })
    })
  })

})

