import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const Content = styled.div`
  color: #636363;
  padding-left: 0.5em;
`;

const Message = styled.div`
  margin: 1em 0;
`;

const MessageInfo = styled.div`
  padding: 0.5em 0;
  font-size: 14px;
`;

const UserName = styled.div`
  color: ${props => props.isOwnMessage ? '#7f8fce' : '#7fcece'};
  display: inline-flex;
`;

const Timestamp = styled.div`
  color: grey;
  display: inline-flex;
  padding-left: 0.5em;
`;

class ChatMessage extends Component {
  static propTypes = {
    message: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
    userId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    if (this.node.scrollIntoView) {
      this.node.scrollIntoView();
    }
  }

  setRef(node) {
    this.node = node;
  }

  render() {
    const { message, userId } = this.props;
    const isOwnMessage = message.userId === userId;

    return (
      <Message innerRef={ this.setRef }>
        <MessageInfo>
          <UserName isOwnMessage={ isOwnMessage }>
            { isOwnMessage ? 'you' : message.userId }
          </UserName>
          <Timestamp>
            { `at ${moment(message.timestamp).format('h:mm')}` }
          </Timestamp>
        </MessageInfo>
        <Content>
          { message.content }
        </Content>
      </Message>
    );
  }
}

export default ChatMessage;
