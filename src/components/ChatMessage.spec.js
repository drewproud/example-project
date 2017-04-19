import React from 'react';
import { mount } from 'enzyme';
import ChatMessage from './ChatMessage';

describe('<ChatMessage />', () => {
  it('displays the user identifier', () => {
    const message = {
      content: 'Hello',
      userId: 'testUserId1',
      timestamp: Date.now(),
    };

    const wrapper = mount(
      <ChatMessage
        message={ message }
        userId="testUserId1"
      />,
    );

    expect(wrapper.text()).toEqual(expect.stringContaining('testUserId1'));
  });

  it('displays the message', () => {
    const message = {
      content: 'Hello',
      userId: 'testUserId1',
      timestamp: Date.now(),
    };

    const wrapper = mount(
      <ChatMessage
        message={ message }
        userId="testUserId1"
      />,
    );

    expect(wrapper.text()).toEqual(expect.stringContaining('Hello'));
  });
});
