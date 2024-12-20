import { Typography, TypographyProps } from '@mui/material';
import { ReactNode } from 'react';

/* eslint-disable-next-line */
export interface UiMaterialTypographyProps extends TypographyProps {
  readonly children?: ReactNode;
}

export function UiMaterialTypography({ children, ...rest }: UiMaterialTypographyProps) {
  return <Typography {...rest}>{children}</Typography>;
}
