import { ReactNode } from 'react';
import { Box, BoxProps } from '@mui/material';

/* eslint-disable-next-line */
export interface UiMaterialBoxProps extends BoxProps {
  children: ReactNode;
}

export function UiMaterialBox({ children, ...rest }: UiMaterialBoxProps) {
  return <Box {...rest}>{children}</Box>;
}
