'use client';

import { ReactNamedNode } from '@digital-wolf/types';
import { UiHelpersHideOnScroll, UiHelpersIf, useNamedChildren } from '@digital-wolf/ui-helpers';
import { AppBar, Toolbar, Typography } from '@mui/material';

export type UiMaterialAppBarChildren = 'Logo' | 'BottomNav' | 'Default';

export interface UiMaterialAppBarProps {
  children?: ReactNamedNode<UiMaterialAppBarChildren>;
  transparent?: boolean;
  onLogoClick?: () => void;
}

export function UiMaterialAppBar({ children, transparent, onLogoClick }: UiMaterialAppBarProps) {
  const { Logo, BottomNav, Default } = useNamedChildren(children);

  // TODO: Create and expose controls for HideOnScroll;
  return (
    <UiHelpersHideOnScroll>
      <AppBar
        position={'sticky'}
        elevation={2}
        sx={{
          mb: '24px',
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: (theme) => `${theme.palette.primary.main}${transparent ? '5e' : ''}`,
        }}
      >
        <Toolbar sx={{ flexWrap: 'wrap', borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Typography onClick={onLogoClick} variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }} style={{ cursor: 'pointer' }}>
            {Logo}
          </Typography>

          {Default}
        </Toolbar>

        <UiHelpersIf If={BottomNav}>
          <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'space-between', overflowX: 'auto' }}>
            {BottomNav}
          </Toolbar>
        </UiHelpersIf>
      </AppBar>
    </UiHelpersHideOnScroll>
  );
}
