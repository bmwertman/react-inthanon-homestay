const initialState = {
    adult: { count: 1 },
    child: { count: 0 },
    infant: { count: 0 },
    room: { count: 1 },
    total: 0,
    nightlyRate: 30.99,
    nights: 0
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {...state, [action.payload]: { count: state[action.payload].count + 1 }};
    case 'DECREMENT':
      return {...state, [action.payload]: { count: state[action.payload].count - 1 }};
    case 'TOTAL':
      if(action.nights) {
        return {...state,
          nights: action.nights,
          total: action.nights * state.nightlyRate * state.room.count
        };
      } else {
        return {...state,
          rooms: {
            count: action.rooms
          },
          total: state.nights * state.nightlyRate * action.payload
        };
      }
    default:
      return state;
  }
}

export default rootReducer;
