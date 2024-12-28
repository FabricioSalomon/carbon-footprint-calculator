"use client";

import { Navbar } from "@/components/molecules";
import GlobalStyle from "@/styles/globalStyle";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, Theme } from "../theme";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  const [isLoadingTheme, setIsLoadingTheme] = useState<boolean>(true);
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme === "dark") {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
    setIsLoadingTheme(false);
  }, []);

  function toggleTheme() {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme === darkTheme ? "dark" : "light");
  }

  return (
    <html lang="en">
      <body>
        {isLoadingTheme ? null : (
          <ThemeProvider theme={theme}>
            <GlobalStyle theme={theme} />
            <>
              <Navbar toggleTheme={toggleTheme} value={theme === darkTheme} />
              <main>{children}</main>
            </>
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
