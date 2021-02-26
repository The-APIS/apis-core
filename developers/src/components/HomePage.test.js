import React from 'react';
import { render } from '@testing-library/react';
import HomePage from './HomePage';

describe('<HomePage />', () => {
  it.skip('should have Demo headers', () => {
    const wrapper = render(<HomePage />);
    const expected = 'Demo ';
    const nodes = wrapper.find('h3');
    nodes.forEach(node => {
      expect(node.text()).toContain(expected);
    });
  });
});
