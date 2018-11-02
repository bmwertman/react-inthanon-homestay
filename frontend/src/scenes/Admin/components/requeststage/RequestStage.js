import React, { Component } from 'react'
import { Button, Modal} from 'antd'
import axios from 'axios'
import moment from 'moment'
import house from './img/house.svg'
import adult from './img/adult.svg'
import child from './img/child.svg'
import infant from './img/infant.svg'
import './requests.scss'

let noData = {
        data: false,
        name: '',
        from: null,
        to: null,
        room: 0,
        adult: 0,
        child: 0,
        infant: 0
      }

export default class RequestStage extends Component {
  constructor(props) {
    super(props)
    this.acceptBooking = this.acceptBooking.bind(this);
    this.declineBooking = this.declineBooking.bind(this);
    this.onDecline = this.onDecline.bind(this)
    this.handleExplanationChange = this.handleExplanationChange.bind(this)
    this.state = {
      modalVisible: false,
      explanation: '',
      bookingRequests: [],
      acceptedRequests: []
    }
    axios.get('http://localhost:4200/bookingrequest/')
    .then(response => {
        response.data.map((obj) =>
          obj.state === 'newRequest' ?
            this.setState({ bookingRequests: [...this.state.bookingRequests, obj] })
          : this.setState({ acceptedRequests: [...this.state.acceptedRequests, obj] })
        )
        if(this.state.bookingRequests === []){
          this.setState({ bookingRequests: [noData] })
        }
        if(this.state.acceptedRequests === []){
          this.setState({ acceptedRequests: [noData] })
        }
        console.log(`bookingRequests and acceptedRequests updated`)
      })
      .catch(err => {
        if(!err.response){
          this.errorStatus = 'Error: Network Error'
        } else {
          this.errorStatus = err.response.data.message
        }
      })
  }

  declineBooking(bookingObj) {
    this.setState({ modalVisible: true })
  }

  onDecline(id) {
    this.setState({ bookingRequests:
      this.state.bookingRequests.filter(bookingRequest => bookingRequest._id !== id)
    })
    axios.delete(`http://localhost:4200/bookingrequest/decline/?id=${id}`)
    .then(res => {
      this.setState({ modalVisible: false })
    })
    .catch(function (err) {
      console.log(`Error: ${err} Unable to decline booking request.`)
    })
  }

  acceptBooking (bookingObj) {
    axios.get(`http://localhost:4200/bookingrequest/accept/?id=${bookingObj._id}`)
    .then((res) =>
      this.setState({
        acceptedRequests: [...this.state.acceptedRequests, res.data], //on initial update, this state update does not seem to be happening
        bookingRequests: this.state.bookingRequests.filter(bookingRequest => bookingRequest._id !== res.data._id) // but this one does
      })
    )
    .catch(function (err) {
      console.log(err)
    })
  }

  handleExplanationChange (e) {
    this.setState({ explanation: e.target.value })
  }

  render () {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Contact</td>
              <td>Checkin</td>
              <td>Checkout</td>
              <td>Rooms</td>
              <td>Adults</td>
              <td>Children</td>
              <td>Infants</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {  this.state[this.props.stage].map((obj, i) =>
                obj.from ?
                  <tr key={i}>
                    <td>{obj.name}</td>
                    <td>{obj.from ? moment(obj.from).format("dddd, MMMM Do YYYY"): ''}</td>
                    <td>{obj.to ? moment(obj.to).format("dddd, MMMM Do YYYY"): ''}</td>
                    <td>{[...Array(obj.room)].map((e, i) => {return <img className="count" key={i} alt='house' src={house} />})}</td>
                    <td>{[...Array(obj.adult)].map((e, i) => {return <img className="count" key={i} alt='adult' src={adult} />})}</td>
                    <td>{[...Array(obj.child)].map((e, i) => {return <img className="count" key={i} alt='child' src={child} />})}</td>
                    <td>{[...Array(obj.infant)].map((e, i) => {return <img className="count" key={i} alt='infant' src={infant} />})}</td>
                    <td>
                      { this.props.stage === 'bookingRequests' &&
                        <div>
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
                        </div>
                      }
                    </td>
                  </tr>
                :
                  <tr key={i}>
                    <td key={i}>
                      <div className="preventCollapse">
                        <h3 className="noData">{`No ${this.props.title.toLowerCase()} to display.`}</h3>
                      </div>
                    </td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                  </tr>
                )
              }
          </tbody>
        </table>
      </div>
    )
  }
}
