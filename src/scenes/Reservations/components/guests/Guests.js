import React from 'react';
import { connect } from "react-redux";
import './guests.scss';
  
class Guests extends React.Component {
  render () {
    return (
      <ul className="guest-list">
        {['adult', 'child', 'infant'].map((prop) => (
            this.props[prop].count > 1 && prop !== 'child' ?
              <li className="list-item" key={prop}>{`  ${this.props[prop].count}-${prop.charAt(0).toUpperCase()}${prop.slice(1)}s`}</li>
            : this.props[prop].count > 1 && prop === 'child' ?
              <li className="list-item" key="child">{`  ${this.props[prop].count}-Children`}</li>
            : this.props[prop].count > 0 ?
              <li className="list-item" key={prop}>{`  ${this.props[prop].count}-${prop.charAt(0).toUpperCase()}${prop.slice(1)}`}</li>
            :
              null
        ))}
      </ul>
    )
  }
}
function mapStateToProps(state) {
  return {
    adult: { count: state.adult.count },
    child: { count: state.child.count },
    infant: { count: state.infant.count }
  };
} 

export default connect(mapStateToProps)(Guests);
