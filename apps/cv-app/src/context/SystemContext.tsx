'use client'

import { createContext, ReactNode, useContext, useMemo, useState, useEffect } from "react";

interface SystemContextValues {
  appLoaded: boolean;
}

const SystemContext = createContext<SystemContextValues>({
  appLoaded: false,
});

interface SystemContextProviderProps {
  children: ReactNode;
}

export function useSystemContext() {
  return useContext(SystemContext);
}

export function SystemContextProvider({ children }: SystemContextProviderProps) {
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    setAppLoaded(true);
  }, []);

  const values = useMemo<SystemContextValues>(() => {
    return {
      appLoaded,
    }
  }, [appLoaded]);

  return <SystemContext.Provider value={values}>{children}</SystemContext.Provider>
 }