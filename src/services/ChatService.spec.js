/* eslint-disable proptypes */

import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import chatService from './chatService';

function getTestClass({ componentDidMount, componentDidUpdate = () => {} }) {
  class TestClass extends Component {
    componentDidMount = componentDidMount;

    componentDidUpdate = componentDidUpdate;

    render() {
      return <div />;
    }
  }

  return chatService(TestClass);
}

describe('chatService', () => {
  it('passes an empty array to start out', (done) => {
    expect.assertions(1);

    const WrappedTestClass = getTestClass({
      componentDidMount() {
        const { messages } = this.props;
        expect(messages).toEqual([]);
        done();
      },
    });

    mount(<WrappedTestClass />);
  });

  it('passes sendMessage function', (done) => {
    expect.assertions(1);

    const WrappedTestClass = getTestClass({
      componentDidMount() {
        const { sendMessage } = this.props;
        expect(typeof sendMessage).toBe('function');
        done();
      },
    });

    mount(<WrappedTestClass />);
  });

  it('adds the correct number of messages when sendMessage is called', (done) => {
    expect.assertions(1);

    const WrappedTestClass = getTestClass({
      componentDidMount() {
        this.props.sendMessage('testUserId', 'Steve', 'testOtherUserId', 'hello');
      },
      componentDidUpdate() {
        const { messages } = this.props;
        expect(messages.length).toBe(1);
        done();
      },
    });

    mount(<WrappedTestClass />);
  });

  it('adds the correct message when sendMessage is called', (done) => {
    expect.assertions(1);

    const WrappedTestClass = getTestClass({
      componentDidMount() {
        this.props.sendMessage('testUserId', 'Steve', 'testOtherUserId', 'hello');
      },
      componentDidUpdate() {
        const { messages } = this.props;
        expect(messages[0].content).toBe('hello');
        done();
      },
    });

    mount(<WrappedTestClass />);
  });

  it('adds the correct userId when sendMessage is called', (done) => {
    expect.assertions(1);

    const WrappedTestClass = getTestClass({
      componentDidMount() {
        this.props.sendMessage('testUserId', 'Steve', 'testOtherUserId', 'hello');
      },
      componentDidUpdate() {
        const { messages } = this.props;
        expect(messages[0].userId).toBe('testUserId');
        done();
      },
    });

    mount(<WrappedTestClass />);
  });

  it('adds the correct userName when sendMessage is called', (done) => {
    expect.assertions(1);

    const WrappedTestClass = getTestClass({
      componentDidMount() {
        this.props.sendMessage('testUserId', 'Steve', 'testOtherUserId', 'hello');
      },
      componentDidUpdate() {
        const { messages } = this.props;
        expect(messages[0].userName).toBe('Steve');
        done();
      },
    });

    mount(<WrappedTestClass />);
  });

  describe('onBeginTyping', () => {
    it('sets user as typing immediately', (done) => {
      jest.useFakeTimers();

      const WrappedTestClass = getTestClass({});
      const wrapper = shallow(<WrappedTestClass />);
      wrapper.props().onBeginTyping('user1');

      setImmediate(() => {
        expect(wrapper.prop('usersCurrentlyTyping')).toEqual({ user1: true });
        done();
      });
    });

    it('resets user to not typing after 3 seconds', (done) => {
      jest.useFakeTimers();

      const WrappedTestClass = getTestClass({});
      const wrapper = shallow(<WrappedTestClass />);
      wrapper.props().onBeginTyping('user1');

      setTimeout(() => {
        expect(wrapper.prop('usersCurrentlyTyping')).toEqual({});
        done();
      }, 3000);

      jest.runAllTimers();
    });
  });
});
