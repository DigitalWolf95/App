import { Fade, FadeProps } from '@mui/material';

export interface UiMaterialFadeProps extends FadeProps {}

export function UiMaterialFade({ children, ...rest }: UiMaterialFadeProps) {
  return <Fade {...rest}>{children}</Fade>;
}

export default UiMaterialFade;
