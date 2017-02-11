import React from 'react';
import ReactDOM from 'react-dom';

import CalanderMonth from "./src/components/CalanderMonth.js";

class Picker extends React.Component {
  constructor() {
    super();

    var seperator = "-";
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    day = day < 10 ? "0"+day : day;
    month = month < 10 ? "0"+month : month;
    var fullDate = day + seperator + month + seperator + year;

    this.state = {
      currentValue: fullDate,
      showCalander: false
    };
  }

  updateDate(date) {
    var seperator = "-";
    //var date = new Date(data.getFullYear(), data.getMonth(), data.getDate());
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    day = day < 10 ? "0"+day : day;
    month = month < 10 ? "0"+month : month;
    var fullDate = day + seperator + month + seperator + year;
    this.setState({
      currentValue: fullDate
    });

    if(this.props.onSelect) {
      return this.props.onSelect(date);
    }
  }
  toggleCalander() {
    this.setState ({showCalander: !this.state.showCalander});
  }
  render() {
    return (
      <div className="picker">
        <input type="text" value={this.state.currentValue} onFocus={this.toggleCalander.bind(this)} onBlur={this.toggleCalander.bind(this)}/>
        <CalanderMonth calanderVisible={this.state.showCalander} handleUpdate={this.updateDate.bind(this)}/>
      </div>
    );
  }
}

ReactDOM.render(
  <Picker/>,
  document.getElementById('root')
);