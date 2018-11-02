import React from 'react'
import RequestStage from './components/requeststage/RequestStage'
import './admin.scss'

export default class Admin extends React.Component {
  render () {
    return (
      <div className="admin">
        <RequestStage
          title={'Reservation Requests'}
          stage={'bookingRequests'}
        />
        <RequestStage
          title={'Accepted Requests'}
          stage={'acceptedRequests'}
        />
      </div>
    );
  }
}
