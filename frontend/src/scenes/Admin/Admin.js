import React from 'react'
import Requests from './components/requests/Requests'
import './admin.scss'

export default class Admin extends React.Component {
  render () {
    return (
      <div className="admin">
        <h2>Reservation Requests</h2>
        <Requests />
      </div>
    );
  }
}
