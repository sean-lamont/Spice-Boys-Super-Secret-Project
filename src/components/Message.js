import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
			<div className="item">
      	{this.props.text}
			</div>
    );
  }
}

export default Message;
