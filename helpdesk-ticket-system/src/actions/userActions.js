// action creator: returns the action
const theUser = (user) => {
  // action: object describing the type of change to the state
  return {
    type: 'USER',
    payload: theUser,
  };
};
export default theUser;
