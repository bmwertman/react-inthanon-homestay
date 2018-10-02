import React from 'react';
import { Button } from 'antd';
import './counter.scss'
export default class Counter extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        count: this.props.defaultValue
      }
    this.incrementCount = this.incrementCount.bind(this)
    this.decrementCount = this.decrementCount.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (event) {
    if(event.currentTarget.name === "decrement" && this.state.count > this.props.defaultValue){
      this.setState({count: this.state.count - 1})
    } else if(event.currentTarget.name === "increment") {
      this.setState({count: this.state.count + 1})
    }

    if(this.state.count === 2){
      debugger;
    }
  }

  incrementCount (e) {
    this.handleChange(e)
  }
  decrementCount (e) {
    this.handleChange(e)
  }
  render () {
    return (
      <div className="counter">
        <Button name="decrement" shape="circle" icon="minus" className="btn" onClick={this.decrementCount} />
        <input className="count" value={this.state.count} onChange={this.handleChange} />
        <Button name="increment" shape="circle" icon="plus" className="btn" onClick={this.incrementCount} />
      </div>
    );
  }  
}

