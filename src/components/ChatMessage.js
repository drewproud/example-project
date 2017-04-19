import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Content = styled.p`
  color: #636363;
  display: inline-flex;
`;

const UserName = styled.div`
  color: #7fcece;
  display: inline-flex;
  padding-right: 1em;
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
    const { message } = this.props;

    return (
      <div ref={ this.setRef }>
        <UserName>
          { message.userId }
        </UserName>
        <Content>
          { message.content }
        </Content>
      </div>
    );
  }
}

export default ChatMessage;
