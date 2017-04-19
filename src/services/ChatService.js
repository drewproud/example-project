import React, { Component } from 'react';
import R from 'ramda';

const appendMessage = (userId, content, messages) => R.append({
  userId,
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

    sendMessage(userId, targetUserId, content) {
      return new Promise((resolve) => {
        this.setState(oldState => ({
          messages: appendMessage(userId, content, oldState.messages),
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
