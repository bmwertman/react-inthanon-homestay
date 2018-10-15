import React from 'react';
import { connect } from "react-redux";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './calendar.scss';
import moment from 'moment';
import {formatDate, parseDate} from 'react-day-picker/moment';
class Cal extends React.Component {
  constructor() {
    super();
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: null,
      to: null
    };
  }
  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
    if(this.state.to && moment(this.state.from).isBefore(from)){
      this.props.dispatch({
        type: 'TOTAL',
        nights: moment(this.state.to).diff(from, 'days')
      });
    }
  }
  handleToChange(to) {
    this.setState({ to });
    if(this.state.from && moment(this.state.from).isBefore(to)){
      this.props.dispatch({
        type: 'TOTAL',
        nights: moment(to).diff(this.state.from, 'days')
      });
    }
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="InputFromTo">
        <label htmlFor="wrapper">Dates</label>
        <div className="wrapper">
          <DayPickerInput
            value={from}
            placeholder="Check in"
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: {before: new Date() },
              toMonth: to,
              modifiers,
              numberOfMonths: 1,
              onDayClick: () => this.to.getInput().focus(),
            }}
            onDayChange={this.handleFromChange}
          />{' '}
          —{' '}
          <span className="InputFromTo-to">
            <DayPickerInput
              ref={el => (this.to = el)}
              value={to}
              placeholder="Check out"
              format="LL"
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: [from, { from, to }],
                disabledDays: [{before: new Date() },{ before: from }],
                modifiers,
                month: from,
                fromMonth: from,
                numberOfMonths: 1,
              }}
              onDayChange={this.handleToChange}
            />
          </span>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    nights: state.nights,
    from: state.from,
    to: state.to
  };
}

export default connect(mapStateToProps)(Cal);
