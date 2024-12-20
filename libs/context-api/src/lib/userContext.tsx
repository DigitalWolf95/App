'use client';

import { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { signIn, signUserOut, watchForUserData } from '@digital-wolf/firebase/auth';
import { User } from 'firebase/auth';
import { firebaseApp } from '@digital-wolf/firebase';

interface UserProviderValues {
  user?: User | null | undefined;
  isLoggedIn?: boolean;
  isUserLoading?: boolean;
  isSubmitLoading?: boolean;
  hasError?: boolean;
  signIn: (email?: string, password?: string, rememberMe?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
}

export const UserContext = createContext<UserProviderValues>({ signIn: async () => {}, signOut: async () => {} });

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const a = firebaseApp;

  useEffect(() => {
    setIsUserLoading(true);
    watchForUserData((user) => {
      setUser?.(user as User);
      setIsUserLoading(false);
    });
  }, []);

  async function handleSingIn(email?: string, password?: string, rememberMe?: boolean) {
    if (!email || !password) {
      setHasError(true);
      return;
    }
    try {
      setIsSubmitLoading(true);
      setHasError(false);
      await signIn(email, password, rememberMe);
      setIsSubmitLoading(false);
    } catch (e) {
      setHasError(true);
      setIsSubmitLoading(false);
    }
  }

  async function handleSignOut() {
    await signUserOut();
  }

  const values = useMemo<UserProviderValues>(() => {
    return {
      user,
      hasError,
      isUserLoading,
      isSubmitLoading,
      isLoggedIn: Boolean(user),
      signIn: handleSingIn,
      signOut: handleSignOut,
    };
  }, [user, isUserLoading, isSubmitLoading]);

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}
