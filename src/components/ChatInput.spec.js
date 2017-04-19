import React from 'react';
import { mount } from 'enzyme';
import ChatInput from './ChatInput';

describe('<ChatInput />', () => {
  it('has an input', () => {
    const messages = [{
      content: 'Hello',
      userId: 'testUserId1',
      timestamp: Date.now(),
    }];

    const wrapper = mount(
      <ChatInput
        messages={ messages }
        userId="testUserId1"
        targetUserId="testUserId2"
        onSubmit={ () => {} }
      />,
    );

    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('has a send button', () => {
    const messages = [{
      content: 'Hello',
      userId: 'testUserId1',
      timestamp: Date.now(),
    }];

    const wrapper = mount(
      <ChatInput
        messages={ messages }
        userId="testUserId1"
        targetUserId="testUserId2"
        onSubmit={ () => {} }
      />,
    );

    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });
});
