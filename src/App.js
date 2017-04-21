import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ChatBoxContainer from './components/ChatBoxContainer';
import { main } from './theme';

const ChatPosition = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: flex-end;
`;

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={ main }>
        <ChatPosition>
          <ChatBoxContainer
            user={ { id: 'user1', name: 'Laura' } }
            targetUser={ { id: 'user2', name: 'Rob' } }
          />
          <ChatBoxContainer
            user={ { id: 'user2', name: 'Rob' } }
            targetUser={ { id: 'user1', name: 'Laura' } }
          />
        </ChatPosition>
      </ThemeProvider>
    );
  }
}

export default App;
