/* eslint-disable proptypes */

import React, { Component } from 'react';
import { mount } from 'enzyme';
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
        this.props.sendMessage('testUserId', 'testOtherUserId', 'hello');
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
        this.props.sendMessage('testUserId', 'testOtherUserId', 'hello');
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
        this.props.sendMessage('testUserId', 'testOtherUserId', 'hello');
      },
      componentDidUpdate() {
        const { messages } = this.props;
        expect(messages[0].userId).toBe('testUserId');
        done();
      },
    });

    mount(<WrappedTestClass />);
  });
});
