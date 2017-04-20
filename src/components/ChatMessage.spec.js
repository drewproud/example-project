import React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';
import ChatMessage from './ChatMessage';

describe('<ChatMessage />', () => {
  it('displays "you" if own message', () => {
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

    expect(wrapper.text()).toEqual(expect.stringContaining('you'));
  });

  it('displays userId of other person', () => {
    const message = {
      content: 'Hello',
      userId: 'testUserId2',
      timestamp: Date.now(),
    };

    const wrapper = mount(
      <ChatMessage
        message={ message }
        userId="testUserId1"
      />,
    );

    expect(wrapper.text()).toEqual(expect.stringContaining('testUserId2'));
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

  it('displays the timestamp', () => {
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

    expect(wrapper.text()).toEqual(expect.stringContaining(moment(message.timestamp).format('h:mm')));
  });
});
