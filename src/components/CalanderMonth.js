import React from 'react';
import ReactDOM from 'react-dom';

import DateBox from "./DateBox.js";
import DayName from "./DayName.js";

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
      var obj  = {date: tmp.getDate(), month: tmp.getMonth(), year: tmp.getFullYear(), currentMonth: true};
      daysList[i] = obj;
    }

    for(var i = 0; i < fd.getDay(); i++) {
      var tmp = new Date(this.fullYear, this.month, fd.getDate() - i - 1);
      var obj  = {date: tmp.getDate(), month: tmp.getMonth(), year: tmp.getFullYear()};

      daysList.unshift(obj);
    }
    for(var i = 1; ((daysList.length <= 42)); i++) {
      var tmp = new Date(this.fullYear, this.month + 1, 0);
      tmp.setDate(ld.getDate() + i);

      var obj  = {date: tmp.getDate(), month: tmp.getMonth(), year: tmp.getFullYear()};
      daysList.push(obj);
    }
    this.state = {
      days: daysList
    }
  }
  handleClick(fullDate) {
    var newDate = new Date(fullDate.year, fullDate.month, fullDate.date);
    if(fullDate.month > this.month) {
        if(fullDate.year === this.fullYear) {
            this.changeMonth(1);
        } else {
            this.changeMonth(-1);
        }
    } else if(fullDate.month < this.month) {
        if((fullDate.year === this.fullYear)) {
            this.changeMonth(-1);
        } else {
            this.changeMonth(1);
        }
        
    }
    this.props.handleUpdate(newDate);
  }
  renderDateBox(item, i) {
    return (<DateBox label={item.date} key={i}  fullDate={item} date={item.date} year={item.year} month={item.month} handleClick={this.handleClick.bind(this)}/>);
  }
  renderWeekDays(item, i) {
    return (<DayName label={item} key={i}/>);
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
    this.month += next;
    if((this.month) < 0) {
        this.month = 11;
        this.fullYear -= 1;
    } else if((this.month) > 11) {
        this.month = 0;
        this.fullYear += 1;
    }
    var date = new Date(this.fullYear, this.month, next);
    this.days = [];
    //this.month = date.getMonth();
    //this.fullYear = date.getFullYear();

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
    var monthYear = currentMonth + " " + this.fullYear;
    return (
      <div className= {visibilityClass}>
        <div className="navbar">
          <button className="btn btn-primary navbar-left btn-sm" onClick={this.changeMonth.bind(this, -1)}>Prev</button>
          <button className="btn btn-default btn-sm">{monthYear}</button>
          <button className="btn btn-primary navbar-right btn-sm" onClick={this.changeMonth.bind(this, 1)}>Next</button></div>
        <div className="day-name-row">
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