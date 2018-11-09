import React from 'react'
import RequestStage from './components/requeststage/RequestStage'
import axios from 'axios'
import './admin.scss'

let noData = {
        name: '',
        from: null,
        to: null,
        room: 0,
        adult: 0,
        child: 0,
        infant: 0
      }

export default class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.acceptBooking = this.acceptBooking.bind(this);
    this.onDecline = this.onDecline.bind(this)
    this.state = {
      new: [],
      accepted: []
    }
  }
  componentDidMount(){
    axios.get('http://localhost:4200/bookingrequest/')
    .then(response => {
        response.data.map((obj) =>
          obj.stage === 'new' ?
            this.setState(prevState => ({ new: [...prevState.new, obj] }))
          : this.setState(prevState => ({ accepted: [...prevState.accepted, obj] }))
        )
        if(this.state.new === []){
          this.setState({ new: [noData] })
        }
        if(this.state.acceptedRequests === []){
          this.setState({ accepted: [noData] })
        }
      })
      .catch(err => {
        if(!err.response){
          this.errorStatus = 'Error: Network Error'
        } else {
          this.errorStatus = err.response.data.message
        }
      })
  }

  onDecline(id) {
    this.setState(prevState => ({ new:
      prevState.new.filter(newRequest => newRequest._id !== id)
    }))
    axios.delete(`http://localhost:4200/bookingrequest/decline/?id=${id}`)
    .then(res => {
      this.setState(prevState => ({ modalVisible: !prevState.modalVisible }))
    })
    .catch(function (err) {
      console.log(`Error: ${err} Unable to decline booking request.`)
    })
  }

  acceptBooking (bookingObj) {
    axios.get(`http://localhost:4200/bookingrequest/accept/?id=${bookingObj._id}`)
    .then(res =>
      this.setState(prevState => ({
          accepted: [...prevState.accepted, res.data], //on initial update, this state update does not seem to be happening
          new: prevState.new.filter(newRequest => newRequest._id !== res.data._id) // but this one does
        }),this.forceUpdate())
    )
    .catch(function (err) {
      console.log(err)
    })
  }

  render () {
    return (
      <div className="admin">
        <RequestStage
          title={'Reservation Requests'}
          stage={'new'}
          requests={this.state.new}
          acceptBooking={this.acceptBooking}
          onDecline={this.onDecline}
        />
        <RequestStage
          title={'Accepted Requests'}
          stage={'accepted'}
          requests={this.state.accepted}
          acceptBooking={this.acceptBooking}
          onDecline={this.onDecline}
        />
      </div>
    );
  }
}
