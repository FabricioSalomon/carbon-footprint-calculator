"use client";

import "@ant-design/v5-patch-for-react-19";

import { Footer, Navbar } from "@/components/molecules";
import { AppProvider } from "@/context";
import { AppContainer, BodyContainer } from "@/styles/app";
import { FooterContainer } from "@/styles/footer";
import GlobalStyle from "@/styles/globalStyle";
import { PathToPageMap, ThemeEnum } from "@/types";
import { ConfigProvider } from "antd";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { CustomTheme, darkTheme, lightTheme } from "../theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  const path = usePathname();
  const [theme, setTheme] = useState<CustomTheme>(lightTheme);
  const [isLoadingTheme, setIsLoadingTheme] = useState<boolean>(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeEnum;
    if (savedTheme === ThemeEnum.DARK) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
    setIsLoadingTheme(false);
  }, []);

  function toggleTheme(): void {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem(
      "theme",
      newTheme === darkTheme ? ThemeEnum.DARK : ThemeEnum.LIGHT
    );
  }

  const pathToPageMap: PathToPageMap = {
    "/": 1,
    "/form": 2,
    "/profile": 3,
  };

  return (
    <html lang="en">
      <head>
        <title>Carbon Footprint</title>
        <meta property="og:title" content="Carbon Footprint" key="title" />
      </head>
      <body>
        {isLoadingTheme ? null : (
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <AppProvider page={pathToPageMap[path]}>
                <GlobalStyle theme={theme} />
                <ConfigProvider
                  theme={{
                    components: {
                      Steps: {
                        colorPrimary: theme.colors.primary,
                      },
                      Select: {
                        colorText: theme.typography.colors.black,
                      },
                      Input: {
                        colorText: theme.typography.colors.black,
                      },
                      InputNumber: {
                        colorText: theme.typography.colors.black,
                      },
                    },
                    token: {
                      fontSize: 16,
                      borderRadius: 5,
                      colorLink: theme.colors.primary,
                      colorPrimary: theme.colors.primary,
                      colorText: theme.typography.colors.primary,
                    },
                  }}
                >
                  <AppContainer>
                    <BodyContainer xs={24}>
                      <Navbar
                        toggleTheme={toggleTheme}
                        value={theme === darkTheme}
                      />
                      <main>{children}</main>
                    </BodyContainer>
                    <FooterContainer xs={24}>
                      <Footer />
                    </FooterContainer>
                  </AppContainer>
                </ConfigProvider>
              </AppProvider>
            </QueryClientProvider>
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
