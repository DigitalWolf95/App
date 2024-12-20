import { DividerProps, Divider } from '@mui/material';

interface UiMaterialDashedDividerProps extends DividerProps {
  color?: string;
}

export function UiMaterialDashedDivider({ color = 'inherit', ...rest }: UiMaterialDashedDividerProps) {
  // width: 'calc(100% - 24px)'
  return <Divider style={{ borderColor: color, borderStyle: 'dashed' }} {...rest} />;
}
