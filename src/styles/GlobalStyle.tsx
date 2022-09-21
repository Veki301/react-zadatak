import { Global, css } from '@emotion/react';

const globalStyleCss = css`
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background-image: url(/stardots.jpeg);
    background-attachment: fixed;
    background-color: black;
    color: white;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

export const GlobalStyle = () => <Global styles={globalStyleCss} />;
