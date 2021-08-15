/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

import React, { useState } from 'react';
import { useEasybase } from 'easybase-react';

// css variables
const authButton = css`
  position: absolute;
  top: 10px;
  right: 50px;
`;

const authInput = css`
  margin-bottom: 0.75rem;
`;

// if signed in, show child components
const Authentication = ({ children }) => {
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
        <button
          onClick={onAuthButtonClick}
          css={css`
            ${authButton}
          `}
        >
          Log Out
        </button>
        {children}
      </>
    );
  } // if user is nog signed in, show log in, log out buttons and
  // render the log in and sign up form
  else
    return (
      <>
        <button
          onClick={onAuthButtonClick}
          css={css`
            ${authButton}
          `}
        >
          Log In
        </button>
        <button
          onClick={onSignUpButtonClick}
          css={css`
            ${authButton}
            margin-top: 3.25rem;
          `}
          style={{}}
        >
          Sign Up
        </button>
        <div
          css={css`
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.7);
            transition: opacity 500ms;
            visibility: hidden;
            opacity: 0;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
          style={dialogOpen ? { opacity: 1, visibility: 'visible' } : {}}
        >
          <div
            css={css`
              padding: 1.75rem;
              background-color: white;
              display: flex;
              flex-direction: column;
              border-radius: 4px;
            `}
          >
            {!logInFields && signUpFields ? (
              <input
                type="text"
                placeholder="Full name"
                value={fullnameValue}
                onChange={(e) => setFullnameValue(e.target.value)}
                css={css`
                  ${authInput}
                `}
                required
              />
            ) : null}
            <input
              type="email"
              placeholder="email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              css={css`
                ${authInput}
              `}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              css={css`
                ${authInput}
              `}
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
