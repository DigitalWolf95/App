import { ReactNode } from 'react';
import { Button, ButtonProps } from 'antd';

export interface AntButtonProps extends ButtonProps {
  children?: ReactNode;
}

export function AntButton({ children, ...rest }: AntButtonProps) {
  return <Button {...rest}>{children}</Button>;
}
