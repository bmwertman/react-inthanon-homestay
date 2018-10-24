import React from 'react'
import axios from 'axios'
import TableRow from './components/TableRow'
import './admin.scss'

export default class Admin extends React.Component {
  constructor () {
    super()
    this.state = {
      bookingRequests: []
    }
    this.bookings = this.bookings.bind(this)
  }

  componentDidMount () {
    axios.get('http://localhost:4200/bookingrequest/')
      .then(response => {
        this.setState({ bookingRequests: response.data })
        .catch(function (err) {
          console.log(`Error: ${err} Unable to get requested bookings from the database.`)
        })
      })
  }

  bookings () {
    return this.state.bookingRequests.map(function (obj, i) {
      return <TableRow obj={obj} key={i} />
    })
  }

  render () {
    return (
      <div className="admin">
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Name</td>
              <td>Number</td>
              <td>Expiry</td>
              <td>CVC</td>
            </tr>
          </thead>
          <tbody>
            {this.bookings()}
          </tbody>
        </table>
      </div>
    );
  }
}
