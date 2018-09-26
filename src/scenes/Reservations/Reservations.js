import React from 'react';
import Cal from './components/calendar/Calendar.js';
import Cards from './components/cards/Cards.js';
import './Reservations.scss';

const Reservations = () => {
  
    return (
      <aside className="reservation">
        <Cal/>
        <Cards/>
      </aside>
    );
}

export default Reservations;