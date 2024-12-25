"use client";

import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { lightTheme, darkTheme, Theme } from "../theme";
import GlobalStyle from "@/styles/globalStyle";
import { Navbar } from "@/components/molecules";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme === "dark") {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  }, []);

  function toggleTheme() {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme === darkTheme ? "dark" : "light");
  }

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <GlobalStyle theme={theme} />
          <Navbar toggleTheme={toggleTheme} />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
