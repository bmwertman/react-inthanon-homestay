import React from 'react';
import { connect } from "react-redux";
import './total.scss';

class Total extends React.Component {
  changeHandler () {
    console.log(this.props.total);
  }

  render () {
    return (
      <input
        min="1"
        step="any"
        className="total"
        value={`Total - $${this.props.total.toFixed(2)}`}
        onChange={this.changeHandler}
        />
    )
  }
}

function mapStateToProps(state) {
   return {
        total: state.total
   };
 }

 export default connect(mapStateToProps)(Total);
