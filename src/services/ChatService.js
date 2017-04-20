import React, { Component } from 'react';
import R from 'ramda';

const IS_TYPING_DELAY_IN_MS = 2000;

const appendMessage = (userId, content, userName, messages) => R.append({
  userId,
  userName,
  content,
  timestamp: Date.now(),
}, messages);

const getUsersCurrentlyTyping = typing => R.compose(
  R.map(Boolean),
  R.filter(Boolean),
)(typing);

function chatService(ComponentToWrap) {
  class ChatService extends Component {
    constructor(props) {
      super(props);
      this.sendMessage = this.sendMessage.bind(this);
      this.onBeginTyping = this.onBeginTyping.bind(this);
      this.state = {
        messages: [],
        typing: {},
      };
    }

    onBeginTyping(userId) {
      const timeoutId = setTimeout(() => {
        this.setState((oldState) => {
          clearTimeout(oldState.typing[userId]);
          return {
            typing: {
              ...oldState.isTyping,
              userId: null,
            },
          };
        });
      }, IS_TYPING_DELAY_IN_MS);

      this.setState(oldState => ({
        typing: {
          ...oldState.isTyping,
          [userId]: timeoutId,
        },
      }));
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
      const { messages, typing } = this.state;

      return (
        <ComponentToWrap
          { ...this.props }
          messages={ messages }
          sendMessage={ this.sendMessage }
          onBeginTyping={ this.onBeginTyping }
          usersCurrentlyTyping={ getUsersCurrentlyTyping(typing) }
        />
      );
    }
  }

  return ChatService;
}

export default chatService;
