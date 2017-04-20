import React, { Component } from 'react';
import R from 'ramda';

const appendMessage = (userId, content, userName, messages) => R.append({
  userId,
  userName,
  content,
  timestamp: Date.now(),
}, messages);

function chatService(ComponentToWrap) {
  class ChatService extends Component {
    constructor(props) {
      super(props);
      this.sendMessage = this.sendMessage.bind(this);
      this.state = {
        messages: [],
      };
    }

    // this code is actually synchronous, but it
    // returns a promise to present a consistent API
    // and make swapping this out for redux later simpler
    sendMessage(userId, userName, targetUserId, content) {
      return new Promise((resolve) => {
        this.setState(oldState => ({
          messages: appendMessage(userId, content, userName, oldState.messages),
        }), () => {
          resolve();
        });
      });
    }

    render() {
      const { messages } = this.state;

      return (
        <ComponentToWrap
          { ...this.props }
          messages={ messages }
          sendMessage={ this.sendMessage }
        />
      );
    }
  }

  return ChatService;
}

export default chatService;
