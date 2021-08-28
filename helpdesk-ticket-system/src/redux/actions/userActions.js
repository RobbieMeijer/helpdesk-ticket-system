export const getUserAction = (currentUser) => {
  return {
    type: 'GET_USER',
    payload: currentUser,
  };
};
