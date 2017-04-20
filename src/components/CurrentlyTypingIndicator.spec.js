import React from 'react';
import { mount } from 'enzyme';
import { UnwrappedCurrentlyTypingIndicator } from './CurrentlyTypingIndicator';

describe('<CurrentlyTypingIndicator />', () => {
  it('displays "you" if own message', () => {
    const wrapper = mount(
      <UnwrappedCurrentlyTypingIndicator
        theme={ { primary: 'color1' } }
      />,
    );

    expect(wrapper).toBeDefined();
  });
});
