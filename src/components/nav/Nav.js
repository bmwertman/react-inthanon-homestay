import React, { Component } from 'react';
import Home from '../../scenes/Home/Home';
import About from '../../scenes/About/About';
import Reservations from '../../scenes/Reservations/Reservations';
import Activities from '../../scenes/Activities/Activities';
import Contact from '../../scenes/Contact/Contact';
import { Route } from 'react-router-dom';
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
        <Route path="home" component={Home} />
        <Route path="about" component={About} />
        <Route path="reservations" component={Reservations} />
        <Route path="activities" component={Activities} />
        <Route path="contact" component={Contact} />
      </nav>
    );
  }
}

export default Nav;
