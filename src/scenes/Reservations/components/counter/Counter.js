import React from 'react';
import { connect } from "react-redux";
import { Button } from 'antd';
import './counter.scss'

class Counter extends React.Component {
  constructor () {
    super();
    this.decrement = this.decrement.bind(this)
  }
  increment = () => {
    this.props.dispatch({ type: 'INCREMENT', payload: this.props.id });
  }

  decrement = () => {
    if(this.props.id === 'adult' && this.props.adult.count > 1){
      this.props.dispatch({ type: 'DECREMENT',  payload: this.props.id });
    } else if (this.props.id === 'child' && this.props.child.count > 0 || this.props.id === 'infant' && this.props.infant.count > 0 ) {
      this.props.dispatch({ type: 'DECREMENT',  payload: this.props.id });
    }
  }

  myOnChangeFcn () {
    return this.props[this.props.id].count
  }

  render () {
    return (
      <div className="counter">
        <Button name="decrement" shape="circle" icon="minus" className="btn" onClick={this.decrement} />
        <input className="count" value={this.props[this.props.id].count} onChange={this.myOnChangeFcn()} />
        <Button name="increment" shape="circle" icon="plus" className="btn" onClick={this.increment} />
      </div>
    ); 
  }
}

function mapStateToProps(state) {
  return {
    adult: { count: state.adult.count },
    child: { count: state.child.count },
    infant: { count: state.infant.count }
  };
} 

export default connect(mapStateToProps)(Counter);
