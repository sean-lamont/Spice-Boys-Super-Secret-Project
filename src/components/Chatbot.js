import React, { Component } from 'react';
import Message from './Message';

class Chatbot extends Component {
  constructor (props) {
    super(props);
    this.state = {
			query: []
		};
  }

  render() {
    return (
      <div className="chatbot">
        <div className="messages">
          <Message
            text="Hi! My name's ____. I'm here to help you with blah blah blah!"
            bot={true}
          />
          {this.state.query.length > 0 &&
            this.state.query.map(function(text, index) {
              return <Message
                key={index}
                text={text}
                bot={false}
              />
            })
          }
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Enter a message..."
            onKeyDown={this.handleKeyPress.bind(this)}
          />
        </div>
      </div>
    );
  }

	handleKeyPress(e) {
		if (e.key !== 'Enter') return;
    const query = this.state.query;
    query.push(e.target.value.trim());
    e.target.value = '';
    this.setState({ query }, function() {
      this.search();
    });
	}

  search() {
    const query = this.state.query[this.state.query.length - 1];
    const url = `https://api.wit.ai/message?q=${encodeURIComponent(query)}&access_token=VKEWD7DPCTT47EJZT32LOA6VSIIQQCJ2`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(this.state.query);
        console.log(json);
      }).catch(error => console.log(error));
  }
}

export default Chatbot;
