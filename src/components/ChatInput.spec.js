import React from 'react';
import { mount } from 'enzyme';
import ChatInput from './ChatInput';

describe('<ChatInput />', () => {
  it('has an input', () => {
    const wrapper = mount(
      <ChatInput
        onSubmit={ () => {} }
        onBeginTyping={ () => {} }
      />,
    );

    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('has a send button', () => {
    const wrapper = mount(
      <ChatInput
        onSubmit={ () => {} }
        onBeginTyping={ () => {} }
      />,
    );

    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('updates the input after typing', () => {
    const wrapper = mount(
      <ChatInput
        onSubmit={ () => {} }
        onBeginTyping={ () => {} }
      />,
    );

    wrapper.find('input').simulate('change', { target: { value: 'this is a message' } });
    expect(wrapper.find('input').node.value).toBe('this is a message');
  });

  it('submits the correct value', () => {
    const onSubmit = (content) => {
      expect(content).toBe('test message');
      return Promise.resolve();
    };

    const wrapper = mount(
      <ChatInput
        onSubmit={ onSubmit }
        onBeginTyping={ () => {} }
      />,
    );

    wrapper.find('input').simulate('change', { target: { value: 'test message' } });
    wrapper.find('form').simulate('submit');
  });

  it('resets state after successful submit', (done) => {
    const onSubmit = () => Promise.resolve();

    const wrapper = mount(
      <ChatInput
        onSubmit={ onSubmit }
        onBeginTyping={ () => {} }
      />,
    );

    wrapper.find('input').simulate('change', { target: { value: 'test message' } });
    wrapper.find('form').simulate('submit');

    setImmediate(() => {
      expect(wrapper.find('input').node.value).toBe('');
      done();
    });
  });
});
