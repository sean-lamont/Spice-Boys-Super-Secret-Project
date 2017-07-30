import React, { Component } from 'react';
import Message from './Message';
import query_transform from './Query_transform';

class Chatbot extends Component {
  constructor (props) {
    super(props);
    this.state = {
			message: []
		};
  }

  componentDidMount() {
    this.botResponse("Hi! My name is CBR Chatbot. I'm here to help you to discover Canberra data!");
  }

  render() {
    return (
      <div ref="chat" className="chatbot">
        <div className="messages">
          {this.state.message.length > 0 &&
            this.state.message.map(function(message, index) {
              return <Message
                key={index}
                text={message.text}
                bot={message.bot}
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
		if (e.key !== 'Enter') return; // proceed if 'Enter'
    const message = this.state.message;
    const current = {
      text: e.target.value.trim(),
      bot: false
    }
    if (!current.text) return; // return if empty
    message.push(current);
    e.target.value = ''; // clear textbox
    const chat = this.refs.chat;
    chat.scrollTop = chat.scrollHeight; // scroll to bottom of chatbot
    this.setState({ message }, function() {
	this.search();
    });
	}

  search() {
    const query = JSON.stringify(this.state.message[this.state.message.length - 1]);
    if (this.state.message[this.state.message.length - 1].text === "help")
	    return this.printHelp();

    const url = `https://api.wit.ai/message?q=${encodeURIComponent(query)}&access_token=VKEWD7DPCTT47EJZT32LOA6VSIIQQCJ2`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(this.state.message);
        console.log(json);
        query_transform(json, this.props.responded, this.botResponse.bind(this));
      }).catch(error => console.log(error));
  }

  botResponse(text) {
    const intro = {
      text,
      bot: true
    }
    const message = this.state.message;
    message.push(intro);
    this.setState({ message });

    // This is how the bot can talk to the map - currently is takes a dictionary {"SUBURB": int_value}
  }

  printHelp() {
  	const helptext = "Sorry, I don't quite know how to answer your question! Ask me to show stats, transport, jobs, education, recreation, crime, population or livability though!";
	this.botResponse(helptext);
  }

}

export default Chatbot;
