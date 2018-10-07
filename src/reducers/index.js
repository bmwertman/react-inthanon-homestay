const initialState = {
    adult: { count: 1 },
    child: { count: 0 },
    infant: { count: 0 },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {...state, [action.payload]: { count: state[action.payload].count + 1 }};
    case 'DECREMENT':
      return {...state, [action.payload]: { count: state[action.payload].count - 1 }};
    default:
      return state;
  }
}

export default rootReducer;