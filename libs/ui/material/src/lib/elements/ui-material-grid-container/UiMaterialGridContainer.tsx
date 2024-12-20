import { ReactNode } from 'react';
import Grid from '@mui/material/Grid';
import { GridProps } from '@mui/material';

interface CustomGridContainerProps {
  readonly children: ReactNode;
  readonly centerX?: boolean;
  readonly centerY?: boolean;
  readonly column?: boolean;
}

export type UiMaterialGridContainerProps = CustomGridContainerProps & GridProps;

interface Optionals {
  justifyContent?: string;
  alignItems?: string;
  direction?: 'column';
}

export function UiMaterialGridContainer({ children, centerY, column, centerX = true, spacing = 3, mt = 0, mb = 3, ...rest }: UiMaterialGridContainerProps) {
  const optionals: Optionals = {
    ...(centerX && { justifyContent: 'center', margin: 'auto' }),
    ...(centerY && { alignItems: 'center' }),
    ...(column && { direction: 'column' }),
  };

  return (
    <Grid container spacing={spacing} mt={mt} mb={mb} {...rest} {...optionals}>
      {children}
    </Grid>
  );
}
