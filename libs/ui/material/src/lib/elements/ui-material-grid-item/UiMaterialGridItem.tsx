import { Grid, GridProps } from '@mui/material';

interface CustomPops {
  centerText?: boolean;
  readonly paddingTop?: number | string;
  readonly paddingLeft?: number | string;
  readonly fullSize?: boolean;
}

export type UiMaterialGridItemProps = CustomPops & GridProps;

interface Optionals {
  readonly textAlign?: 'center';
}

export function UiMaterialGridItem({ children, centerText, paddingTop, paddingLeft, fullSize, ...rest }: UiMaterialGridItemProps) {
  const optionals: Optionals = {
    ...(centerText && { textAlign: 'center' }),
    ...(fullSize && { width: '100%', height: '100%' }),
  };

  const styleOptionals = {
    ...((paddingTop || paddingTop === 0) && { paddingTop }),
    ...((paddingLeft || paddingLeft === 0) && { paddingLeft }),
  };

  return (
    <Grid item xs={'auto'} {...rest} {...optionals} style={{ ...styleOptionals, ...rest.style }}>
      {children}
    </Grid>
  );
}
