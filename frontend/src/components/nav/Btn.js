import React from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

class Btn extends React.Component {
  render() {
    if(this.props.value !== "Home"){
        return (
          <li>
            <Link
              to={this.props.value.toLowerCase()}
              className="nav-btn">
              {this.props.value}
            </Link>
          </li>
        );
      } else {
        return(
          <li>
            <Link
              to="/"
              className="nav-btn">
              {this.props.value}
            </Link>
          </li>
        );
    }
  } 
}

export default Btn