import React from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

class Btn extends React.Component {
  render() {
    return (
      <li>
        <Link
          to={this.props.value.toLowerCase()}
          className="nav-btn">
          {this.props.value}
        </Link>
      </li>
    );
  }
}

export default Btn