const initialState = {
  isLoggedIn: false,
  email: '',
  fullName: '',
  userID: '',
  userRole: '',
};

// reducer: function handling the logic manipulating the state
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER':
      // update old state with new object adding new property value
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn,
        email: action.payload.email,
        fullName: action.payload.fullName,
        userID: action.payload.userID,
        userRole: action.payload.userRole,
      };
    default:
      return state;
  }
};
export default userReducer;

/*
  if (action.type === 'TICKET') {
    return [...state, action.payload];
  }

  return state;
};


the rootReducer will look like this:

const store = {
  user: {
    isLoggedIn: false,
    email: '',
    fullName: '',
    userID: '',
    userRole: ''
  },
  ticket: {
    assignee: '',
    date: '',
    description: '',
    issuetype: '',
    priority: '',
    reporter: '',
    status: '',
    summary: '',
    ticketid: '',
    time: '',
    userid: ''
  }
};
*/
