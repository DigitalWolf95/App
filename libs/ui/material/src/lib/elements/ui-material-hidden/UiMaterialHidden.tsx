import { Hidden, HiddenProps } from '@mui/material';

export interface UiMaterialHiddenProps extends HiddenProps {}

export function UiMaterialHidden({ children, ...rest }: UiMaterialHiddenProps) {
  return <Hidden {...rest}>{children}</Hidden>;
}

export default UiMaterialHidden;
