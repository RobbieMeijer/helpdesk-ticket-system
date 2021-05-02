import React from 'react';

const NavigationLink = ({ href, children }) => {
  const onClick = (event) => {
    event.preventDefault();
    window.history.pushState({}, '', href);

    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <a onClick={onClick} href={href}>
      {children}
    </a>
  );
};

export default NavigationLink;
