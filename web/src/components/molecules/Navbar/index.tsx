import { Nav, ThemeToggleButton } from "./styles";

interface NavbarProps {
  toggleTheme: () => void;
}

export function Navbar({ toggleTheme }: Readonly<NavbarProps>) {
  return (
    <Nav>
      <ThemeToggleButton onClick={toggleTheme}>Toggle Theme</ThemeToggleButton>
    </Nav>
  );
}
