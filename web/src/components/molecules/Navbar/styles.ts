import { styled } from "styled-components";

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
`;

export const ThemeToggleButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.tertiary};
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.hoverPrimary};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.focusPrimary};
  }
`;
