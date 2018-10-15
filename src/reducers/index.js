const initialState = {
    adult: { count: 1 },
    child: { count: 0 },
    infant: { count: 0 },
    room: { count: 1 },
    total: 0,
    nightlyRate: 30.99
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {...state, [action.payload]: { count: state[action.payload].count + 1 }};
    case 'DECREMENT':
      return {...state, [action.payload]: { count: state[action.payload].count - 1 }};
    case 'TOTAL':
      return {...state, total: [action.nights] * state.nightlyRate};
    default:
      return state;
  }
}

export default rootReducer;
