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
    background-color: ${({ theme }) => theme.colors.tertiaryBackground};
    color: ${({ theme }) => theme.typography.colors.primary};
    font-family: 'Arial', sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  a {
    color: ${({ theme }) => theme.colors.link};
    text-decoration: none;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.linkHover};
  }

  button {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.tertiary};
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: ${({ theme }) => theme.colors.hoverPrimary};
  }

  button:focus {
    outline: 2px solid ${({ theme }) => theme.colors.focusPrimary};
  }

  .error {
    color: ${({ theme }) => theme.colors.error};
  }

  .success {
    color: ${({ theme }) => theme.colors.success};
  }
`;

export default GlobalStyle;
