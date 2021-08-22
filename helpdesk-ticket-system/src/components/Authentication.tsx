import React, { useState } from 'react';
import { useEasybase } from 'easybase-react';
import { useDispatch, useSelector } from 'react-redux';

// if signed in, show child components
const Authentication = ({ children }) => {
  // useSelector: extract data from the Redux store state
  const theUser = useSelector((state) => state.user);
  // dispath: sending data to the redux store state
  const dispatch = useDispatch();

  // easybase hooks
  const { isUserSignedIn, signIn, signOut, signUp } = useEasybase();

  // state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fullnameValue, setFullnameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [logInFields, setLogInFields] = useState(true);
  const [signUpFields, setSignUpFields] = useState(false);

  const onAuthButtonClick = () => {
    if (isUserSignedIn()) {
      signOut();
    } else {
      // change log in state to active and sign up state to inactive
      // so only depending input fields are rendered
      setLogInFields(true);
      setSignUpFields(false);

      // open dialog form
      setDialogOpen(true);
    }
  };

  const onSignUpButtonClick = () => {
    // change sign up state to active and log in state to inactive
    // so only depending input fields are rendered
    setLogInFields(false);
    setSignUpFields(true);

    // open dialog form
    setDialogOpen(true);
  };

  const onLogInClick = async () => {
    // get sign in data back
    const res = await signIn(emailValue, passwordValue);

    // if promise response is ok (stored in db), close dialoge form
    // and empty the mail and password state from input fields
    if (res.success) {
      setDialogOpen(false);
      setEmailValue('');
      setPasswordValue('');
    }
  };

  const onSignUpClick = async () => {
    // create userID
    const userIDValue = `uid${new Date().getTime()}`;
    // create userRole
    const userRole = 'customer';

    // fullname must not be empty
    if (fullnameValue !== '') {
      // send sign up data to db
      const res = await signUp(
        emailValue,
        passwordValue, // required by eb
        {
          // optional
          userID: userIDValue,
          fullName: fullnameValue,
          email: emailValue,
          userRole,
        }
      );

      // if promise response is ok (stored in db), sign in
      if (res.success) {
        await signIn(emailValue, passwordValue);
        setDialogOpen('');
        setEmailValue('');
        setPasswordValue('');
      }
    }
  };

  // id user signed in show log out button
  if (isUserSignedIn()) {
    return (
      <>
        <div className="fixed top-0 left-0 px-5 py-3 bg-green-300 z-10 w-full md:w-52">
          <button className="mb-0" onClick={onAuthButtonClick}>
            Log Out
          </button>
        </div>
        {children}
      </>
    );
  } // if user is nog signed in, show log in, log out buttons and
  // render the log in and sign up form
  else
    return (
      <>
        <button onClick={onAuthButtonClick}>Log In</button>
        <button onClick={onSignUpButtonClick}>Sign Up</button>
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-70 transition-opacity duration-500 flex justify-center items-top"
          style={
            dialogOpen
              ? { opacity: 1, visibility: 'visible' }
              : { opacity: 0, visibility: 'hidden' }
          }
        >
          <div className="w-80 max-h-64 p-7 bg-white flex flex-col rounded mt-12">
            {!logInFields && signUpFields ? (
              <input
                type="text"
                placeholder="Full name"
                value={fullnameValue}
                onChange={(e) => setFullnameValue(e.target.value)}
                required
              />
            ) : null}
            <input
              type="email"
              placeholder="email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              required
            />
            <div>
              {logInFields && !signUpFields ? (
                <button onClick={onLogInClick}>Log In</button>
              ) : (
                <button onClick={onSignUpClick}>Sign Up</button>
              )}
            </div>
          </div>
        </div>
      </>
    );
};

export default Authentication;
