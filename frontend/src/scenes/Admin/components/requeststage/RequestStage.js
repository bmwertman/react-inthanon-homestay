import React, { Component } from 'react'
import { Button, Modal} from 'antd'
import moment from 'moment'
import house from './img/house.svg'
import adult from './img/adult.svg'
import child from './img/child.svg'
import infant from './img/infant.svg'
import './requests.scss'

export default class RequestStage extends Component {
  constructor(props) {
    super(props)
    this.declineBooking = this.declineBooking.bind(this);
    this.handleExplanationChange = this.handleExplanationChange.bind(this)
    this.state = {
      modalVisible: false,
      explanation: ''
    }
  }

  declineBooking(bookingObj) {
    this.setState(prevState => ({ modalVisible: !prevState.modalVisible }))
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
            { this.props.requests.map((obj, i) =>
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
                      { this.props.stage === 'new' &&
                        <div>
                          <Button onClick={() => this.declineBooking(obj)} shape="circle" icon="close-circle" />
                          <Button onClick={() => this.props.acceptBooking(obj)} shape="circle" icon="check-circle" />
                          <Modal
                            title={`Decline ${obj.name}`}
                            centered
                            visible={this.state.modalVisible}
                            okText='Send'
                            onOk={() => this.props.onDecline(obj._id)}
                            onCancel={() => this.setState(prevState => ({ modalVisible: !prevState.modalVisible }))}
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
