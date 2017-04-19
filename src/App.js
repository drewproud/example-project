import React, { Component } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class App extends Component {
  render() {
    return (
      <Div>
        <h1>Welcome to my chat app</h1>
      </Div>
    );
  }
}

export default App;
