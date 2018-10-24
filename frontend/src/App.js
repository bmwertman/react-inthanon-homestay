import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Header from './components/header/Header'
import Home from './scenes/Home/Home'
import About from './scenes/About/About'
import Reservations from './scenes/Reservations/Reservations'
import Activities from './scenes/Activities/Activities'
import Contact from './scenes/Contact/Contact'
import Admin from './scenes/Admin/Admin'

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Header />
              <Switch>
                <Route exact={true} path="/"  component={Home} />
                <Route path="/about" component={About} />
                <Route path="/reservations" component={Reservations} />
                <Route path="/activities" component={Activities} />
                <Route path="/contact" component={Contact} />
                <Route path="/admin" component={Admin} />
              </Switch>
          </div >
        </Router>
    );
  }
}
export default App;
