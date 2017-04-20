import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import ChatContainer from './components/ChatContainer';
import { main } from './theme';

// root component, very little logic here usually
// This might handle hot loading for dev server if required
class App extends Component {
  render() {
    return (
      <ThemeProvider theme={ main }>
        <ChatContainer />
      </ThemeProvider>
    );
  }
}

export default App;
