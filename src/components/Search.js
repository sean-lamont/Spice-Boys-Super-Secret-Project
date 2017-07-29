import React, { Component } from 'react';
import Message from './Message';

class Search extends Component {
  constructor (props) {
    super(props);
    this.state = {
			query: []
		};
  }

  render() {
    return (
      <div className="container">
        {this.state.query.length > 0 &&
          this.state.query.map(function(text, index) {
            return <Message
              key={index}
              text={text}
              bot={false}
            />
          }.bind(this))
        }
        <div className="search">
          <input type="text" onKeyDown={this.handleKeyPress.bind(this)} />
        </div>
      </div>
    );
  }

	handleKeyPress(e) {
		if (e.key !== 'Enter') return;
    const query = this.state.query;
    query.unshift(e.target.value.trim());
    e.target.value = '';
    this.setState({ query }, function() {
      this.search();
    });
	}

  search() {
    const query = this.state.query[0];
    const url = `https://api.wit.ai/message?q=${encodeURIComponent(query)}&access_token=VKEWD7DPCTT47EJZT32LOA6VSIIQQCJ2`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(this.state.query);
        console.log(json);
      }).catch(error => console.log(error));
  }
}

export default Search;
