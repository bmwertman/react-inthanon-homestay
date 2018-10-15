import React from 'react';
import Booking from './components/booking/Booking';
import Cal from './components/calendar/Calendar.js';
import Total from './components/total/Total.js';
import Cards from './components/cards/Cards.js';
import './Reservations.scss';

const Reservations = () => {
  
    return (
      <aside className="reservation">
        <Cal/>
        <Booking />
        <Total />
        <Cards/>
      </aside>
    );
}

export default Reservations;