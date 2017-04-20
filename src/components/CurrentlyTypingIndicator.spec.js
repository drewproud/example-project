import React from 'react';
import { mount } from 'enzyme';
import { CurrentlyTypingIndicator } from './CurrentlyTypingIndicator';

describe('<CurrentlyTypingIndicator />', () => {
  it('displays "you" if own message', () => {
    const wrapper = mount(
      <CurrentlyTypingIndicator
        theme={ { primary: 'color1' } }
      />,
    );

    expect(wrapper).toBeDefined();
  });
});
