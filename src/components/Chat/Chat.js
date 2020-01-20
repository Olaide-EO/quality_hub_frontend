import React, { Component } from 'react';
import UsernameForm from './UsernameForm';
import ChatScreen from './ChatScreen';

class Chat extends Component {
  state = {
    currentUsername: '',
    currentScreen: 'WhatIsYourUsernameScreen',
  };

  onUsernameSubmitted = username => {
    fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(response => {
        console.log(response, username);
        this.setState({
          currentUsername: username,
          currentScreen: 'ChatScreen',
        });
      })
      .catch(error => console.error('error', error));
  };

  render() {
    if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
      return <UsernameForm onSubmit={this.onUsernameSubmitted} />;
    }
    if (this.state.currentScreen === 'ChatScreen') {
      return (
        <ChatScreen currentUsername={this.state.currentUsername} />
      );
    }
  }
}

export default Chat;