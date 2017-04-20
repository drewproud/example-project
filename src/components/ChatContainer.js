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
      userName: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })).isRequired,
    sendMessage: PropTypes.func.isRequired,
  };

  render() {
    const { messages, sendMessage } = this.props;

    return (
      <ChatPosition>
        <ChatBox
          user={ { id: 'user1', name: 'Laura' } }
          targetUser={ { id: 'user2', name: 'Rob' } }
          onMessageSend={ sendMessage }
          messages={ messages }
        />
        <ChatBox
          user={ { id: 'user2', name: 'Rob' } }
          targetUser={ { id: 'user1', name: 'Laura' } }
          onMessageSend={ sendMessage }
          messages={ messages }
        />
      </ChatPosition>
    );
  }
}

export default chatService(ChatContainer);
