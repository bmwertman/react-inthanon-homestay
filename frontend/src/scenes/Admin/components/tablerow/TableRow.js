import React, { Component } from 'react';
import { Button, Modal} from 'antd';
import axios from 'axios';
import moment from 'moment';
import './tablerow.scss';

export default class TableRow extends Component {
  constructor(props) {
    super(props)
    this.acceptBooking = this.acceptBooking.bind(this);
    this.declineBooking = this.declineBooking.bind(this);
    this.onDecline = this.onDecline.bind(this)
    this.handleExplanationChange = this.handleExplanationChange.bind(this)
    this.state = {
      modalVisible: false,
      explanation: '',
      bookingRequests: [{
        name: '',
        from: '',
        to: '',
        room: '',
        adult: '',
        child: '',
        infant: ''
      }]
    }
    axios.get('http://localhost:4200/bookingrequest/')
      .then(response => {
        this.setState({ bookingRequests: response.data })
      })
      .catch(function (err) {
        console.log(`Error: ${err} Unable to get requested bookings from the database.`)
      })
  }


  declineBooking(bookingObj) {
    this.setState({ modalVisible: true })
  }

  onDecline(id) {
    this.setState({ bookingRequests: this.state.bookingRequests.filter(bookingRequest => {
        return bookingRequest._id !== id
      })
    })
    axios.delete(`http://localhost:4200/bookingrequest/decline/?id=${id}`)
    .then(res => {
      this.setState({ modalVisible: false })
    })
    .catch(function (err) {
      console.log(`Error: ${err} Unable to get requested bookings from the database.`)
    })
  }

  acceptBooking (bookingObj) {

  }

  handleExplanationChange (e) {
    this.setState({ explanation: e.target.value })
  }

  render () {
    return (
      <tbody>
        {this.state.bookingRequests.map((obj, i) =>
          <tr key={i}>
            <td>{obj.name}</td>
            <td>{moment(obj.from).format("dddd, MMMM Do YYYY")}</td>
            <td>{moment(obj.to).format("dddd, MMMM Do YYYY")}</td>
            <td>{obj.room}</td>
            <td>{obj.adult}</td>
            <td>{obj.child}</td>
            <td>{obj.infant}</td>
            <td>
              <Button onClick={() => this.declineBooking(obj)} shape="circle" icon="close-circle" />
              <Button onClick={() => this.acceptBooking(obj)} shape="circle" icon="check-circle" />
              <Modal
                title={`Decline ${obj.name}`}
                centered
                visible={this.state.modalVisible}
                okText='Send'
                onOk={() => this.onDecline(obj._id)}
                onCancel={() => this.setState({ modalVisible: false })}
              >
                <textarea
                  placeholder={`Enter a reason why you can't accept the reservation. Offer a good solution or alternative when possible.`}
                  onChange={this.handleExplanationChange}
                  autoFocus
                />
              </Modal>
            </td>
          </tr>
        )}
      </tbody>
    )
  }
}
