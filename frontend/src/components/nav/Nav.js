import React, { Component } from 'react';
import Btn from './Btn';
import './nav.scss';

class Nav extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      navButtons: ['Home', 'About', 'Reservations', 'Activities', 'Contact']
    }
  }

  renderNavBtn (name) {
    let navBtns = this.state.navButtons.filter(function(name){
        return "/" + name.toLowerCase() !== window.location.pathname; 
    })
    return (
      navBtns.map(function(name, i){
        return <Btn value={name} key={i} />
      })
    );
  }

  render () {
    return (
      <nav className="nav-bar">
        <ul className="btn-wrapper cf" >
          {this.renderNavBtn()}
        </ul>
      </nav>
    );
  }
}

export default Nav;
