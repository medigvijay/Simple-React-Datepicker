import React from 'react';
import ReactDOM from 'react-dom';

class DayName extends React.Component {
    render() {
	    var className = "btn btn-default day-name";
        return (
            <span className={className}>
                {this.props.label}
            </span>
        );
    }
}
module.exports = DayName;