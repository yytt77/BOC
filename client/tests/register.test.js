import React from 'react';
import renderer from 'react-test-renderer';

import AppWrapper from '../App';

describe('App', () => {

  const tree = renderer.create(<AppWrapper />).toJSON();
  const c = 'children';

  it('should render AppWrapper', () => {

    // AppWrapper renders UnAuthorized page by default
    expect(tree.children.length).toBe(2);
  })

  it('should render guest discovery feed background', () => {
    // create additional tests/change this one to be more meaningful once
    // guest discovery feed is complete
    const feedBGC = tree[c][0]['props']['style'][1]['backgroundColor'];
    expect(feedBGC).toBe('#84C0FB');
  })

  // Snapshot Test
  it('should render app wrapper', () => {
    expect(tree).toMatchSnapshot();
  })

})
