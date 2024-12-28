import { ReactNode, createContext, useContext } from "react";

interface AppContextProps {}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export function AppProvider({ children }: Readonly<AppProviderProps>) {
  const states = {
    test: "",
  };

  const context = {
    ...states,
  };

  return <AppContext value={context}>{children}</AppContext>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  return context;
}
