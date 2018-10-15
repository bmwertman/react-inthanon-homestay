import React from 'react';
import Counter from '../counter/Counter.js';
import ReactSlideToggle from '../../../../components/slidetoggle/SlideToggle';
import './booking.scss';

export default class Booking extends React.Component {
  render () {
    return (
      <section>
        <ReactSlideToggle>
          <div className="age">
            <div className="age-group">Rooms</div>
            <Counter id="room" />
          </div>
          <div className="age">
            <div className="age-group">Adults</div>
            <Counter id="adult" />
          </div>
          <div className="age">
            <div className="age-group">
              Children
              <div className="age-group-label">Ages 2-12</div>
            </div>
            <Counter id="child" />
          </div>
          <div className="age">
            <div className="age-group">
              Infants
              <div className="age-group-label">Under 2</div>
            </div>
            <Counter id="infant" />
          </div>
        </ReactSlideToggle>
      </section>
    )
  }
}
