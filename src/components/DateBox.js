import React from 'react';
import ReactDOM from 'react-dom';

class DateBox extends React.Component {

  setDate() {
  	this.props.handleClick(this.props.fullDate);
  }
  render() {
  	if(this.props.fullDate) {
  		var className = this.props.fullDate.currentMonth ? "square btn btn-primary" : "square btn btn-primary other-month";
  	} else {
		var className = "square btn btn-primary";
  	}
  	
    return (
      <button className={className} onClick={this.setDate.bind(this)}>
        {this.props.fullDate ? this.props.fullDate.date : this.props.label}
      </button>
    );
  }
}

module.exports = DateBox;