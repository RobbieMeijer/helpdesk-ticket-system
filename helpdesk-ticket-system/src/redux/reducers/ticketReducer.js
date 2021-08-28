const initialState = {
  ticket: {},
};

// reducer: function handling the logic manipulating the state
const ticketReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_TICKET':
      // update old state with new object adding new property value
      return {
        ...state.ticket,
        payload,
      };
    default:
      return state;
  }
};
export default ticketReducer;
