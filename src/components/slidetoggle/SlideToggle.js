import React from 'react';
import { SlideToggle } from 'react-slide-toggle';
import { Icon } from 'antd';
import Guests from '../../scenes/Reservations/components/guests/Guests.js';
import './slidetoggle.scss';


export default class ReactSlideToggle extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          open: false
      }
      this.toggleType = this.toggleType.bind(this)
  }
  toggleType() {
      let currentState = this.state.open;
      this.setState({ open: !currentState });
  };
  render () { 
    return (
      <SlideToggle
        duration={800}
        collapsed
        render={({
          onToggle,
          setCollapsibleElement,
          toggleState,
          range
        }) => (
          <div className={"slide-toggle slide-toggle--special " + (toggleState || "").toLowerCase()}>
            <div className="wrapper slide-toggle__header">
              <Guests />
              <button className='slide-toggle__toggle' onClick={() => {onToggle(); this.toggleType();}}>
                <Icon type={this.state.open ? 'up' : 'down'} theme="outlined" />
              </button>
            </div>
            <div className="slide-toggle__box" ref={setCollapsibleElement}>
              <div className="slide-toggle__box-inner"
                   style= {{opacity: Math.max(0.5, range)}}
              >
                {this.props.children}  
              </div>
            </div>
          </div>
        )}
      />
    )
  }
}
