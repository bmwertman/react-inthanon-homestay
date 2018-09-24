import React, { Component } from 'react';
import logo from './img/logo2.png';
import Nav from '../nav/Nav'
import './header.scss';


class Header extends Component {
  render() {
    return (
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <Nav />
      </header>
    );
  }
}

export default Header;
