import React from 'react';
import renderer from 'react-test-renderer';

import AppWrapper from '../App';
import Register from '../Screens/AuthScreen/RegisterScreen/Register';

describe('Register', () => {

  const c = 'children';

  xdescribe('UnAuthorized', () => {

    const tree = renderer.create(<AppWrapper />).toJSON();

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

  describe('Registration', () => {

    const tree = renderer.create(<Register />).toJSON();

    it('should render user, email, and two password fields', () => {
      console.log('TREE ', tree)
      expect(tree.children.length).toBe(2);
    })

  })



})
