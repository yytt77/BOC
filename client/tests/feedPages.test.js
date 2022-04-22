import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';

import PostTemplate from '../Templates/PostTemplate';
import FeedTemplate from '../Templates/FeedTemplate';
import HeaderTemplate from '../Templates/HeaderTemplate';
import UserInfo from '../Screens/UserScreen/UserInfo';
import { userData } from '../Templates/sampleData';

const mockStore = configureStore();

const fakeProps = {
  "__v": 0,
  "_id": "62620038e9d1c67b39e89b58",
  "caption": "Test test tests",
  "comments": [
    {
      "_id": "62620041e9d1c67b39e89b5d",
      "comment": "Test comment",
      "createdAt": "2022-04-22T01:09:21.472Z",
      "profPhoto": "undefined",
      "username": "bigglesworth",
    },
  ],
  "createdAt": "2022-04-22T01:09:12.931Z",
  "location": null,
  "profPhoto": null,
  "url": null,
  "username": "bigglesworth",
};

describe('Testing PostTemplates', () => {
  const state = {
    theme: true,
    user: {
      userInfo: {
        username: 'ash',
        profPhoto: 'https://placeimg.com/100/100/animals'
      }
    }
  };
  const store = mockStore(state)

  it('renders the component correctly', () => {
    render(
      <Provider store={store}>
        <PostTemplate data={fakeProps}/>
      </Provider>
    )
  });
});

describe('Testing FeedTemplates', () => {
  const state = {
    theme: true,
    user: {
      userInfo: {
        username: 'ash',
        profPhoto: 'https://placeimg.com/100/100/animals'
      }
    }
  };
  const store = mockStore(state)

  it('renders the component correctly', () => {
    render(
      <Provider store={store}>
        <FeedTemplate data={userData}/>
      </Provider>
    )
  });
});

describe('Testing Header Templates', () => {
  const state = {
    theme: true,
    user: {
      userInfo: {
        username: 'ash',
        profPhoto: 'https://placeimg.com/100/100/animals'
      }
    }
  };
  const store = mockStore(state)

  it('renders the component correctly', () => {
    render(
      <Provider store={store}>
        <HeaderTemplate data={fakeProps}/>
      </Provider>
    )
  });
});

describe('Testing UserInfo Component', () => {
  const state = {
    theme: true,
    user: {
      userInfo: {
        username: 'ash',
        profPhoto: 'https://placeimg.com/100/100/animals'
      }
    }
  };
  const store = mockStore(state)

  it('renders the component correctly', () => {
    render(
      <Provider store={store}>
        <UserInfo data={fakeProps}/>
      </Provider>
    )
  });
});