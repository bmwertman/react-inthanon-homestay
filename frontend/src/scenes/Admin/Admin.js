import React from 'react';
import Requests from './components/tablerow/TableRow';
import './admin.scss';

export default class Admin extends React.Component {
  render () {
    return (
      <div className="admin">
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
          <Requests />
        </table>
      </div>
    );
  }
}
