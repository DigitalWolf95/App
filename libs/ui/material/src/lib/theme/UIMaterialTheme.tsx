'use client'
import { ReactNode, useMemo } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';

export function UiMaterialTheme({themeOptions, children}:{children?: ReactNode, themeOptions?: ThemeOptions}) {

  const theme = useMemo(() => {
    return createTheme(themeOptions)
  }, [themeOptions])

  return <AppRouterCacheProvider>
    <ThemeProvider theme={theme}>
     <CssBaseline/>
     {children}
    </ThemeProvider>
  </AppRouterCacheProvider>
}
