import React from 'react';
import Cards from 'react-credit-cards';
import Payment from 'payment';
import 'react-credit-cards/lib/styles.scss';
import './cards.scss';

export default class ReactCreditCard extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        focused: '',
      };
  };

  componentDidMount() {
    Payment.formatCardNumber(document.querySelector('[name="number"]'));
    Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
    Payment.formatCardCVC(document.querySelector('[name="cvc"]'));
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      this.setState({
        [target.name]: target.value.replace(/ /g, ''),
      });
    }
    else if (target.name === 'expiry') {
      this.setState({
        [target.name]: target.value.replace(/ |\//g, ''),
      });
    }
    else {
      this.setState({
        [target.name]: target.value,
      });
    }
  };

  render() {
    const { name, number, expiry, cvc, focused } = this.state;
    return (
      <div>
        <form>
          <section className="cc">
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
  }
}