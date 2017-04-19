import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatBoxContainer = styled.div`
  width: 300px;
  margin-left: 1em;
  font-size: 14px;
`;

const ChatBody = styled.div`
  height: 300px;
  background-color: #ecebeb;
  padding: 0 1em;
  overflow-y: scroll;
`;

const ChatOpen = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 30px;
  background-color: #584f8c;
  color: white;
  border-radius: 4px 4px 0 0;
`;

class ChatBox extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      userId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })).isRequired,
    onMessageSend: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    targetUserId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.state = {
      isOpen: true,
    };
  }

  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;
    const { messages, onMessageSend, userId, targetUserId } = this.props;

    return (
      <ChatBoxContainer>
        <ChatHeader onClick={ this.toggleOpen }>{ targetUserId }</ChatHeader>
        { isOpen &&
          <ChatOpen>
            <ChatBody>
              { messages.map(msg =>
                <ChatMessage
                  userId={ userId }
                  key={ msg.timestamp }
                  message={ msg }
                />,
              ) }
            </ChatBody>
            <ChatInput targetUserId={ targetUserId } userId={ userId } onSubmit={ onMessageSend } />
          </ChatOpen>
        }
      </ChatBoxContainer>
    );
  }
}

export default ChatBox;
