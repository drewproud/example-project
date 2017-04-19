import React, { Component } from 'react';
import styled from 'styled-components';
import MessageType from './MessageType';

const MessageContainer = styled.p`
  color: #636363;
`;

class ChatMessage extends Component {
  static propTypes = {
    message: MessageType.isRequired,
  };

  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    this.node.scrollIntoView();
  }

  setRef(node) {
    this.node = node;
  }

  render() {
    const { message } = this.props;

    return (
      <MessageContainer innerRef={ this.setRef }>
        { message.content }
      </MessageContainer>
    );
  }
}

export default ChatMessage;
