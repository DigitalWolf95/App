import { ReactNode } from 'react';
import { Button, ButtonProps } from 'antd';

export interface AntIconButtonProps extends ButtonProps {
  children?: ReactNode;
  icon: ReactNode;
}

export function AntIconButton({ children, icon, ...rest }: AntIconButtonProps) {
  return (
    <Button
      type="text"
      icon={icon}
      style={{
        fontSize: '16px',
        width: 64,
        height: 64,
      }}
      {...rest}
    />
  );
}
