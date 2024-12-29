import { darkTheme } from "@/theme";
import { ThemeEnum } from "@/types";
import { ReactNode, createContext, useContext, useState } from "react";
import { useTheme } from "styled-components";
import { Context, Methods, States } from "./types";

interface AppContextProps extends Context {}

interface AppProviderProps {
  page: number;
  children: ReactNode;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export function AppProvider({ children, page }: Readonly<AppProviderProps>) {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(page);

  function handleSelectPage(page: number) {
    setCurrentPage(page);
  }

  const states: States = {
    currentPage,
    theme: theme === darkTheme ? ThemeEnum.DARK : ThemeEnum.LIGHT,
  };

  const methods: Methods = {
    handleSelectPage,
  };

  const context: Context = {
    ...states,
    ...methods,
  };

  return <AppContext value={context}>{children}</AppContext>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  return context;
}
