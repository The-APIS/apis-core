import React from 'react';
import { shallow } from 'enzyme';
import HomePage from './HomePage';

describe('<HomePage />', () => {
  it('should have Demo headers', () => {
    const wrapper = shallow(<HomePage />);
    const expected = 'Demo ';
    const nodes = wrapper.find('h3');
    nodes.forEach(node => {
      expect(node.text()).toContain(expected);
    });
  });
});
