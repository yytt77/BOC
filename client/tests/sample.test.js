import React from 'react';
import renderer from 'react-test-renderer';

import AppWrapper from '../App';

describe('App', () => {

  // Unit Test
  it('should render AppWrapper', () => {
    const tree = renderer.create(<AppWrapper />).toJSON();

    // AppWrapper renders UnAuthorized page by default
    expect(tree.children.length).toBe(2);
  })

  // Unit Test
  it('should render guest discovery feed', () => {
    const tree = renderer.create(<AppWrapper />).toJSON();
    const feed = tree['children'][0]['children'][0];

    // placeholder text from UnAuthorized page
    expect(feed).toBe('Discovery Feed Here');
  })

  // Snapshot Test
  it('should render app wrapper', () => {
    const tree = renderer.create(<AppWrapper />).toJSON();
    expect(tree).toMatchSnapshot();
  })

})