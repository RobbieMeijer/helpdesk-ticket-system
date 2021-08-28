const initialState = {
  user: {},
};

// reducer: function handling the logic manipulating the state
const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_USER':
      // update old state with new object adding new property value
      return {
        ...state.user,
        payload,
      };
    default:
      return state;
  }
};
export default userReducer;
