// action creator: returns the action
export const theUser = (isLoggedIn, email, fullName, userID, userRole) => {
  // action: object describing the type of change to the state
  return {
    type: 'USER',
    payload: {
      isLoggedIn,
      email,
      fullName,
      userID,
      userRole,
    },
  };
};
