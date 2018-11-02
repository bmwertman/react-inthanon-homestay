import React from 'react';
import Cal from './components/calendar/Calendar.js';
import { Button } from 'antd';
import axios from 'axios';
import Counter from './components/counter/Counter.js';
import ReactSlideToggle from '../../components/slidetoggle/SlideToggle';
import './Reservations.scss';

export default class Reservations extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      from: undefined,
      to: undefined,
      room: 1,
      adult: 1,
      child: 0,
      infant: 0,
      state: 'newRequest'
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.handleCountChange = this.handleCountChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
  }

  onSubmit (e) {
    e.preventDefault()
    axios('http://localhost:4200/bookingrequest/add', {
     method: 'post',
     data: this.state,
     withCredentials: false
    })
    .then(res => { console.log(res.data) })
    .catch(err => {
      if(err.response){
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err.message);
      }
      console.log(err.config);
    })
  }

  handleCountChange = (countUpdate) => {
    this.setState(countUpdate)
  }

  handleDateChange = (changedDate) => {
    if(changedDate.hasOwnProperty('from')){
      this.setState({from: changedDate.from})
    } else {
      this.setState({to: changedDate.to})
    }
  }

  handleNameChange = (name) => {
    this.setState({ name: name.target.value })
  }

  handleEmailChange = (email) => {
    this.setState({ email: email.target.value })
  }

  render () {
    return (
      <aside className="reservation">
        <form>
          <Cal onDateChange={this.handleDateChange}/>
          <ReactSlideToggle>
            <div className="age">
              <div className="age-group">Rooms</div>
              <Counter onCountChange={this.handleCountChange} id="room" />
            </div>
            <div className="age">
              <div className="age-group">Adults</div>
              <Counter onCountChange={this.handleCountChange}  id="adult" />
            </div>
            <div className="age">
              <div className="age-group">
                Children
                <div className="age-group-label">Ages 2-12</div>
              </div>
              <Counter onCountChange={this.handleCountChange} id="child" />
            </div>
            <div className="age">
              <div className="age-group">
                Infants
                <div className="age-group-label">Under 2</div>
              </div>
              <Counter onCountChange={this.handleCountChange} id="infant" />
            </div>
          </ReactSlideToggle>
          <label className="requester-label">
            Full name
            <input className="wrapper requester-details" type="text" onChange={this.handleNameChange} />
          </label>
          <label className="requester-label">
            Email
            <input className="wrapper requester-details" type="email" onChange={this.handleEmailChange} />
          </label>
          <Button type="primary" onClick={this.onSubmit}>Request to Book</Button>
        </form>
      </aside>
    )
  }
}
