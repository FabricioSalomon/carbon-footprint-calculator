"use client";

import "@ant-design/v5-patch-for-react-19";

import { Footer, Navbar } from "@/components/molecules";
import { AppProvider } from "@/context";
import { AppContainer } from "@/styles/app";
import { FooterContainer } from "@/styles/footer";
import GlobalStyle from "@/styles/globalStyle";
import { ThemeEnum } from "@/types";
import { Col } from "antd";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { CustomTheme, darkTheme, lightTheme } from "../theme";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  const [isLoadingTheme, setIsLoadingTheme] = useState<boolean>(true);
  const [theme, setTheme] = useState<CustomTheme>(lightTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeEnum;
    if (savedTheme === ThemeEnum.DARK) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
    setIsLoadingTheme(false);
  }, []);

  function toggleTheme() {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem(
      "theme",
      newTheme === darkTheme ? ThemeEnum.DARK : ThemeEnum.LIGHT
    );
  }

  return (
    <html lang="en">
      <body>
        {isLoadingTheme ? null : (
          <ThemeProvider theme={theme}>
            <AppProvider>
              <GlobalStyle theme={theme} />
              <AppContainer>
                <Col xs={24}>
                  <Navbar
                    toggleTheme={toggleTheme}
                    value={theme === darkTheme}
                  />
                  <main>{children}</main>
                </Col>
                <FooterContainer xs={24}>
                  <Footer />
                </FooterContainer>
              </AppContainer>
            </AppProvider>
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
