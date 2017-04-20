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
  background-color: ${props => props.theme.background};
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
  background-color: ${props => props.theme.primary};
  color: white;
  border-radius: 4px 4px 0 0;
`;

class ChatBox extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      userId: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })).isRequired,
    onMessageSend: PropTypes.func.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    targetUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onMessageSend = this.onMessageSend.bind(this);
    this.state = {
      isOpen: true,
    };
  }

  onMessageSend(content) {
    const { id, name } = this.props.user;
    return this.props.onMessageSend(id, name, this.props.targetUser.id, content);
  }

  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;
    const { messages, user, targetUser } = this.props;

    return (
      <ChatBoxContainer>
        <ChatHeader onClick={ this.toggleOpen }>{ `Chat with ${targetUser.name}` }</ChatHeader>
        { isOpen &&
          <ChatOpen>
            <ChatBody>
              { messages.map(msg =>
                <ChatMessage
                  userId={ user.id }
                  key={ msg.timestamp }
                  message={ msg }
                />,
              ) }
            </ChatBody>
            <ChatInput onSubmit={ this.onMessageSend } />
          </ChatOpen>
        }
      </ChatBoxContainer>
    );
  }
}

export default ChatBox;
