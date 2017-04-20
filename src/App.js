import React, { Component } from 'react';
import ChatContainer from './components/ChatContainer';

// root component, very little logic here usually
// This might handle hot loading for dev server if required
class App extends Component {
  render() {
    return (
      <ChatContainer />
    );
  }
}

export default App;
