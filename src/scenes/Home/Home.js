import React, { Component } from 'react';
import logo from './img/logo.png';
import Nav from '../../components/nav/Nav';
import { BrowserRouter as Router } from 'react-router-dom';
import './Home.scss';

class Home extends Component {
  render() {
    return (
      <Router>
        <div className="home">
          <header className="home-header">
            <img src={logo} className="home-logo" alt="logo" />
            <Nav />
          </header>
        </div>
      </Router>
    );
  }
}

export default Home;
