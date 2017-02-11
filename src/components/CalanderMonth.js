import React from 'react';
import ReactDOM from 'react-dom';

import DateBox from "./DateBox.js";

class CalanderMonth extends React.Component {
  constructor() {
    super();
    this.date = new Date();
    this.days = [];
    this.month = this.date.getMonth();
    this.fullYear = this.date.getFullYear();
    
    this.months= ['January','February','March','April','May','June','July',
          'August','September','October','November','December'];

    var ld = new Date(this.fullYear, this.month + 1, 0);
    var fd = new Date(this.fullYear, this.month, 1);
    this.prependedDays = fd.getDay();
    this.apendedDays = ld.getDay();


    this.numDays = ld.getDate();
    var daysList = [];
    for(var i = 0; i < this.numDays; i++) {
      var tmp = new Date(this.fullYear, this.month, i+1);
    console.log(tmp);
      var obj  = {date: tmp.getDate(), month: tmp.getMonth(), year: tmp.getFullYear(), currentMonth: true};
      daysList[i] = obj;
    }

    for(var i = 0; i < fd.getDay(); i++) {
      var tmp = new Date(this.fullYear, this.month, fd.getDate() - i - 1);
      var obj  = {date: tmp.getDate(), month: tmp.getMonth(), year: tmp.getFullYear()};

      daysList.unshift(obj);
    }
    for(var i = 1; ((daysList.length <= 42)); i++) {
        console.log(i);
      var tmp = new Date(this.fullYear, this.month + 1, 0);
      tmp.setDate(ld.getDate() + i);

      var obj  = {date: tmp.getDate(), month: tmp.getMonth(), year: tmp.getFullYear()};
      console.log(obj)
      daysList.push(obj);
    }
    this.state = {
      days: daysList
    }
  }
  handleClick(fullDate) {
    //console.log(fullDate);
    var newDate = new Date(fullDate.year, fullDate.month, fullDate.date);
    //this.date = newDate;

    this.props.handleUpdate(newDate);
  }
  renderDateBox(item, i) {
    return (<DateBox label={item.date} key={i}  fullDate={item} date={item.date} year={item.year} month={item.month} handleClick={this.handleClick.bind(this)}/>);
  }
  renderWeekDays(item, i) {
    return (<DateBox label={item} key={i} date= {i+1} month={item.month} year={this.year}/>);
  }
  
  getRows() {
      var current = this;
      var dayBoxes = this.state.days.map(function(item, i) {
        return current.renderDateBox(item, i);
      });
      var rows = [];
      for(var i = 0; i < 6; i++) {// need to decide for 4 and 5
        var currentDays = dayBoxes.slice(7 * i, (7 * i + 7));
        rows.push(
          <div className="week-row" key={i}>
            {currentDays}
          </div>);
    }
    return rows;
  }
  changeMonth(change) {
    var next = change;
    if((this.month + next) < 0 || (this.month + next) > 11) {
        this.fulllYear += (1 * change);
    }
    var date = new Date(this.fullYear, this.month + next, next);
    this.days = [];
    this.month = date.getMonth();
    this.fullYear = date.getFullYear();

    var ld = new Date(this.fullYear, this.month + 1, 0);
    var fd = new Date(this.fullYear, this.month, 1);
    this.prependedDays = fd.getDay();
    this.apendedDays = ld.getDay();


    this.numDays = ld.getDate();
    var daysList = [];
    for(var i = 0; i < this.numDays; i++) {
      //daysList[i] = i + 1;
      var tmp = new Date(this.fullYear, this.month, i+1);
      var obj  = {date: tmp.getDate(), month: tmp.getMonth(), year: tmp.getFullYear(), currentMonth: true};
      daysList[i] = obj;
    }
    console.log(daysList.length+"change", fd, ld, this.numDays);
    for(var i = 0; i < fd.getDay(); i++) {
      var tmp = new Date(this.fullYear, this.month, fd.getDate() - i - 1);
      daysList.unshift({date: tmp.getDate(), month: tmp.getMonth(), year: tmp.getFullYear()});
    }
    for(var i = 1; ((daysList.length <= 42)); i++) {
      var tmp = new Date(this.fullYear, this.month + 1, 0);
      tmp.setDate(ld.getDate() + i);
      daysList.push({date: tmp.getDate(), month: tmp.getMonth(), year: tmp.getFullYear()});
    }
    
    this.setState({
      days: daysList
    });

  }
  render() {
    var visibilityClass = this.props.calanderVisible ? "show" : "hide";
    visibilityClass += " calander "
    var current = this;
    
    var allWeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    var weekDays = allWeekDays.map(function(item, i) {
      return current.renderWeekDays(item, i);
    });

    var currentMonth = this.months[this.month];
    return (
      <div className= {visibilityClass}>
        <div className="navbar"><button className="btn btn-primary navbar-left btn-sm" onClick={this.changeMonth.bind(this, 0)}>Prev</button>
          <span>{currentMonth}</span>
          <button className="btn btn-primary navbar-right btn-sm" onClick={this.changeMonth.bind(this, 1)}>Next</button></div>
        <div className="board-row">
          {weekDays}
        </div>
        <div className="board-row">
          {this.getRows()}
        </div>
      </div>
    );
  }
}
module.exports = CalanderMonth;