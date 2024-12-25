import { createGlobalStyle } from "styled-components";
import { Theme } from "../theme";

type GlobalStyleProps = {
  theme: Theme;
};

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Arial', sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  a {
    color: ${({ theme }) => theme.link};
    text-decoration: none;
  }

  a:hover {
    color: ${({ theme }) => theme.linkHover};
  }

  button {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.tertiary};
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: ${({ theme }) => theme.hoverPrimary};
  }

  button:focus {
    outline: 2px solid ${({ theme }) => theme.focusPrimary};
  }

  .error {
    color: ${({ theme }) => theme.error};
  }

  .success {
    color: ${({ theme }) => theme.success};
  }
`;

export default GlobalStyle;
