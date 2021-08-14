/** @jsx jsx */ /** @jsxRuntime classic */ import {
  jsx,
  css,
} from '@emotion/react';

// css variables
const linkBorderProps = css`
  transition: all 0.25s ease-in-out;
  position: absolute;
  content: '';
  background-color: hotpink;
  width: 0%;
  height: 1px;
  bottom: 0;
  left: 1.5rem;
`;
const iconProps = css`
  transition: all 0.25s ease-in-out;
`;

const NavigationLink = ({ href, children }) => {
  const onClick = (event) => {
    event.preventDefault();
    window.history.pushState({}, '', href);

    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <a
      onClick={onClick}
      href={href}
      css={css`
        text-decoration: none;
        position: relative;
        transition: all 0.25s ease-in-out;

        &::after {
          ${linkBorderProps}
          width: 0%;
        }

        &:hover {
          &::after {
            ${linkBorderProps}
            width: calc(100% - 1.5rem);
            left: 1.5rem;
          }
        }

        .fa {
          ${iconProps}
          transform: skew(0);
        }

        &:hover {
          .fa {
            ${iconProps}
            transform: skew(.300rad);
          }
        }
      `}
    >
      {children}
    </a>
  );
};

export default NavigationLink;
