import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import MessageType from './MessageType';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatBoxContainer = styled.div`
  width: 300px;
`;

const ChatBody = styled.div`
  height: 300px;
  background-color: #ecebeb;
  padding: 1em;
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
    messages: PropTypes.arrayOf(MessageType).isRequired,
    onMessageSend: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
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
    const { messages, onMessageSend, userId } = this.props;

    return (
      <ChatBoxContainer>
        <ChatHeader onClick={ this.toggleOpen }>{ userId }</ChatHeader>
        { isOpen &&
          <ChatOpen>
            <ChatBody>
              { messages.map(msg => <ChatMessage key={ msg.timestamp } message={ msg } />) }
            </ChatBody>
            <ChatInput onSubmit={ onMessageSend } />
          </ChatOpen>
        }
      </ChatBoxContainer>
    );
  }
}

export default ChatBox;
