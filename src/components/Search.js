import React, { Component } from 'react';

class Search extends Component {
  constructor (props) {
    super(props);
    this.state = {
			query: ''
		};
  }

  render() {
    return (
      <input type="text" onKeyDown={this.handleKeyPress.bind(this)} />
    );
  }

	handleKeyPress(e) {
		if (e.key !== 'Enter') return;
    const query = e.target.value.trim();
    this.setState({ query }, function() {
      this.search();
    });
	}

  search() {
    const query = this.state.query;
    const url = `https://api.wit.ai/message?q=${encodeURIComponent(query)}&access_token=VKEWD7DPCTT47EJZT32LOA6VSIIQQCJ2`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      }).catch(error => console.log(error));
  }
}

export default Search;
