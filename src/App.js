import React, { Component } from 'react';
import R from 'ramda';
import ChatBox from './components/ChatBox';
import styled from 'styled-components';

const Div = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatBoxPosition = styled.div`
  position: absolute;
  bottom: 0;
  ${props => props.left ? 'left: 0' : 'right: 0'};
`;

const appendMessage = (userId, content, messages) => R.append({
  userId,
  content,
  timestamp: Date.now(),
}, messages);

class App extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      messages: [],
    };
  }

  sendMessage(userId, targetUserId, content) {
    return new Promise(resolve => {
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
      <Div>
        <ChatBoxPosition left >
          <ChatBox
            userId="user1"
            targetUserId="user2"
            onMessageSend={ this.sendMessage }
            messages={ messages }
          />
        </ChatBoxPosition>
        <ChatBoxPosition>
          <ChatBox
            userId="user2"
            targetUserId="user1"
            onMessageSend={ this.sendMessage }
            messages={ messages }
          />
        </ChatBoxPosition>
      </Div>
    );
  }
}

export default App;
