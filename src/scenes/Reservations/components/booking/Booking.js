import React from 'react';
import Counter from '../counter/Counter.js'
import ReactSlideToggle from '../../../../components/slidetoggle/SlideToggle';
import './booking.scss';

export default class Booking extends React.Component {
  render () {
    return (
      <section>
        <ReactSlideToggle>
          <div className="age">
            <div className="age-group">Adults</div>
            <Counter defaultValue={1}/>
          </div>
          <div className="age">
            <div className="age-group">
              Children
              <div className="age-group-label">Ages 2-12</div>
            </div>
            <Counter defaultValue={0} />
          </div> 
          <div className="age">
            <div className="age-group">
              Infants
              <div className="age-group-label">Under 2</div>
            </div>
            <Counter defaultValue={0} />
          </div>
        </ReactSlideToggle>
      </section>
    )
  }
}