'use client';

import { ReactNode, useEffect } from 'react';
import { UiMaterialTheme } from '@digital-wolf/ui-material';
import { transparentDarkTheme, lightTheme } from '../theme/sevenArchTheme';
import { useLocalRouter } from '../hooks/useLocalRouter';

export interface EntryPointLayoutViewProps {
  children: ReactNode;
}

export function EntryPointLayoutView({ children }: EntryPointLayoutViewProps) {
  const { isHomePage } = useLocalRouter();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then((registration) => {
        console.log('scope is: ', registration.scope);
        registration.active?.postMessage({
          cacheVersion: process.env.NEXT_PUBLIC_SW_CACHE_VERSION,
        });
      });
    }
  }, []);

  return <UiMaterialTheme themeOptions={isHomePage ? transparentDarkTheme : lightTheme}>{children}</UiMaterialTheme>;
}
