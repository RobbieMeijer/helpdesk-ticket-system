import React, { useState } from 'react';
import { useEasybase } from 'easybase-react';
import './Authentication.css';

const Authentication = ({ children }) => {
  // easybase hooks
  const { isUserSignedIn, signIn, signOut, signUp } = useEasybase();

  // state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fullnameValue, setFullnameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [signInFields, setSignInFields] = useState(true);
  const [signUpFields, setSignUpFields] = useState(false);

  const onAuthButtonClick = () => {
    if (isUserSignedIn()) {
      signOut();
    } else {
      setSignInFields(true);
      setSignUpFields(false);
      setDialogOpen(true);
    }
  };

  const onSignUpButtonClick = () => {
    setSignInFields(false);
    setSignUpFields(true);
    setDialogOpen(true);
  };

  const onSignInClick = async () => {
    const res = await signIn(emailValue, passwordValue);
    if (res.success) {
      setDialogOpen(false);
      setEmailValue('');
      setPasswordValue('');
    }
  };

  const onSignUpClick = async () => {
    const userIDValue = `uid${new Date().getTime()}`;

    const res = await signUp(emailValue, passwordValue, {
      userID: userIDValue,
      fullName: fullnameValue,
      email: emailValue,
    });

    if (res.success) {
      await signIn(emailValue, passwordValue);
      setDialogOpen('');
      setEmailValue('');
      setPasswordValue('');
    }
  };

  if (isUserSignedIn()) {
    return (
      <>
        <button onClick={onAuthButtonClick} className="authButton">
          Sign Out
        </button>
        {children}
      </>
    );
  } else
    return (
      <>
        <button onClick={onAuthButtonClick} className="authButton">
          Sign In
        </button>
        <button
          onClick={onSignUpButtonClick}
          className="authButton"
          style={{ marginTop: '4rem' }}
        >
          Sign Up
        </button>
        <div
          className="authDialog"
          style={dialogOpen ? { opacity: 1, visibility: 'visible' } : {}}
        >
          <div>
            {!signInFields && signUpFields ? (
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
              {signInFields && !signUpFields ? (
                <button onClick={onSignInClick}>Sign In</button>
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
