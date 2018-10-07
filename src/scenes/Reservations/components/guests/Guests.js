import React from 'react';
import './guests.scss';
  
export default class Guests extends React.Component {
  render () {
    return (
      <ul className="guest-list">
        <li className="list-item">
          Adults: 
        </li>
        <li className="list-item">
          Children:
        </li>
        <li className="list-item">
          Infants:
        </li>
      </ul>
    )
  }
}
