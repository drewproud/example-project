import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import ChatBox from './ChatBox';
import chatService from '../services/chatService';

const ChatPosition = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: flex-end;
`;

class ChatContainer extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      userId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })).isRequired,
    sendMessage: PropTypes.func.isRequired,
  };

  render() {
    const { messages, sendMessage } = this.props;

    return (
      <ChatPosition>
        <ChatBox
          userId="user1"
          targetUserId="user2"
          onMessageSend={ sendMessage }
          messages={ messages }
        />
        <ChatBox
          userId="user2"
          targetUserId="user1"
          onMessageSend={ sendMessage }
          messages={ messages }
        />
      </ChatPosition>
    );
  }
}

export default chatService(ChatContainer);
