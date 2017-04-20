import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const InputForm = styled.form`
  display: flex;
  height: 30px;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5em 1em;
  &:focus {
    outline: none;
  }
`;

const SendButton = styled.button`
  width: 3em;
  -webkit-appearance: none;
  background-color: ${props => props.theme.secondary};
  color: white;
  border: none;
  cursor: pointer;
`;

class ChatInput extends Component {
  static propTypes = {
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
    this.props.onSubmit(this.state.content)
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
        <SendButton type="submit">{ '>' }</SendButton>
      </InputForm>
    );
  }
}

export default ChatInput;
