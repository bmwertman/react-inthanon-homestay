import React from 'react';
import Cards from 'react-credit-cards';
import Payment from 'payment';
import { connect } from "react-redux";
import { Button } from 'antd';
import Total from '../total/Total.js';
import axios from 'axios';
import 'react-credit-cards/lib/styles.scss';
import './cards.scss';

class ReactCreditCard extends React.Component {

  constructor() {
      super();
      this.state = {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        focused: ''
      };
      this.onSubmit = this.onSubmit.bind(this)
      this.handleInputFocus = this.handleInputFocus.bind(this)
      this.handleInputChange = this.handleInputChange.bind(this)
  };

  componentDidMount() {
    if(document.querySelector('[name="number"]')){
      Payment.formatCardNumber(document.querySelector('[name="number"]'));
      Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
      Payment.formatCardCVC(document.querySelector('[name="cvc"]'));
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      this.setState({
        [target.name]: parseInt(target.value.replace(/ /g, ''), 16),
      });
    }
    else if (target.name === 'expiry') {
      this.setState({
        [target.name]: parseInt(target.value.replace(/ |\//g, ''), 16),
      });
    }
    else {
      this.setState({
        [target.name]: target.value,
      });
    }
  };

  onSubmit(e){
    e.preventDefault();
    const bookingRequest = {
      name: this.state.name,
      number: this.state.number,
      expiry: this.state.expiry,
      cvc: this.state.cvc
    }
    axios('http://localhost:4200/bookingrequest/add', {
     method: 'post',
     data: bookingRequest,
     withCredentials: false
    })
    .then(res => console.log(res.data))
    .catch(err => {
      if(err.response){
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err.message);
      }
      console.log(err.config);
    })

    this.setState({
      name: '',
      number: '',
      expiry: '',
      cvc: ''
    })
  }

  render() {
    const { name, number, expiry, cvc, focused } = this.state;
    if(this.props.total > 0){
        return (
          <div className="payment">
            <form>
              <section className="cc">
                <Total />
                <div>
                  <input
                    type="tel"
                    name="number"
                    placeholder="Card Number"
                    onKeyUp={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onKeyUp={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="expiry"
                    placeholder="Expires"
                    onKeyUp={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                  <input
                    type="tel"
                    name="cvc"
                    placeholder="CVC"
                    onKeyUp={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
              </section>
              <Button type="primary" onClick={this.onSubmit}>Request to Book</Button>
            </form>
            <Cards
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={this.handleCallback}
            />
          </div>
        );
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    total: state.total
  };
}

export default connect(mapStateToProps)(ReactCreditCard);
