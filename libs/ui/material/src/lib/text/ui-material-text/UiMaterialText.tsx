import { Typography, TypographyProps } from '@mui/material';
import { ReactNode } from 'react';

export interface UiMaterialTextProps extends TypographyProps {
  children?: ReactNode;
}

export function UiMaterialText({ children, ...rest }: UiMaterialTextProps) {
  return <Typography {...rest}>{children}</Typography>;
}

export default UiMaterialText;
