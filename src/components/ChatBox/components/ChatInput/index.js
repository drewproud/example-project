import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const InputForm = styled.form`
  display: flex;
`;

const Input = styled.input`
  flex: 1;
`;


const SendButton = styled.button`
  width: 30px;
`;

class ChatInput extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      content: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const { userId, targetUserId } = this.state;

    this.props.onSubmit(userId, targetUserId, this.state.content)
      .then(() => this.setState({ content: '' }));
  }

  onChange(e) {
    this.setState({ content: e.target.value });
  }

  render() {
    const { content } = this.state;

    return (
      <InputForm onSubmit={ this.onSubmit }>
        <Input value={ content } onChange={ this.onChange } />
        <SendButton type="submit" />
      </InputForm>
    );
  }
}

export default ChatInput;
