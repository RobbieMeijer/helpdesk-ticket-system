const NavigationLink = ({ href, children }) => {
  const onClick = (event) => {
    event.preventDefault();
    window.history.pushState({}, '', href);

    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <a
      className="text-left text-sm font-medium uppercase text-gray-800"
      onClick={onClick}
      href={href}
    >
      {children}
    </a>
  );
};

export default NavigationLink;
