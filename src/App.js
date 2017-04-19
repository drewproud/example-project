import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import ChatBox from './components/ChatBox';
import MessageType from './components/MessageType';
import chatService from './services/chatService';

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

class App extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(MessageType).isRequired,
    sendMessage: PropTypes.func.isRequired,
  };

  render() {
    const { messages, sendMessage } = this.props;

    return (
      <Div>
        <ChatBoxPosition left >
          <ChatBox
            userId="user1"
            targetUserId="user2"
            onMessageSend={ sendMessage }
            messages={ messages }
          />
        </ChatBoxPosition>
        <ChatBoxPosition>
          <ChatBox
            userId="user2"
            targetUserId="user1"
            onMessageSend={ sendMessage }
            messages={ messages }
          />
        </ChatBoxPosition>
      </Div>
    );
  }
}

export default chatService(App);
