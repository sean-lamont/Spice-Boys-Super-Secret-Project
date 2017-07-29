import React, { Component } from 'react';
import Chatbot from './Chatbot';
import Map from './Map';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Chatbot />
        <Map />
      </div>
    );
  }
}

export default App;
