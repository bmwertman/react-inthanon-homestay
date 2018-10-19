import React from 'react';
import { connect } from "react-redux";
import './total.scss';

class Total extends React.Component {
  render () {
    if(this.props.total > 0){
      return (
        <input
        min="1"
        step="any"
        className="total"
        value={`Total - $${this.props.total.toFixed(2)}`}
        readOnly
        />
      )
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

 export default connect(mapStateToProps)(Total);
