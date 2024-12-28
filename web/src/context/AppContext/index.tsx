import { darkTheme } from "@/theme";
import { ThemeEnum } from "@/types";
import { ReactNode, createContext, useContext } from "react";
import { useTheme } from "styled-components";
import { Context, States } from "./types";

interface AppContextProps extends Context {}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export function AppProvider({ children }: Readonly<AppProviderProps>) {
  const theme = useTheme();

  const states: States = {
    theme: theme === darkTheme ? ThemeEnum.DARK : ThemeEnum.LIGHT,
  };

  const context: Context = {
    ...states,
  };

  return <AppContext value={context}>{children}</AppContext>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  return context;
}
