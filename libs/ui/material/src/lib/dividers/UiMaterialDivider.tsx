import { DividerProps, Divider } from '@mui/material';

interface UiMaterialDividerProps extends DividerProps {
  color?: string;
}

export function UiMaterialDivider({ color = 'inherit', ...rest }: UiMaterialDividerProps) {
  // width: 'calc(100% - 24px)'
  return <Divider style={{ borderColor: color }} {...rest} />;
}
