import React, { Component, PropTypes } from 'react';
import MessageType from './MessageType';
import styled from 'styled-components';
import ChatInput from './components/ChatInput';

const ChatBoxContainer = styled.div`
  width: 300px;
  border: 1px solid #eaeaea;
`;

const ChatBody = styled.div`
  height: 300px;
  background-color: #fbfbfb;
`;

class ChatBox extends Component {
  static propTypes = {
    messages: MessageType,
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
    const { messages, onMessageSend } = this.props;

    return (
      <ChatBoxContainer>
        { isOpen &&
          <div>
            <ChatBody>
              { messages.map(msg => <p key={ msg.timestamp }>{ msg.content }</p>) }
            </ChatBody>
            <ChatInput onSubmit={ onMessageSend } />
          </div>
        }
      </ChatBoxContainer>
    );
  }
}

export default ChatBox;
