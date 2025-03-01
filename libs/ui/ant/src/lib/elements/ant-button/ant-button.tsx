import styles from './ant-button.module.scss';
import { Button, ButtonProps } from 'antd';
import { ReactNode } from 'react';

export interface AntButtonProps extends ButtonProps {
  children?: ReactNode;
  outlined?: boolean;
  text?: string;
}

export function AntButton({ text, children, className, outlined, ...rest }: AntButtonProps) {
  function getVariant(): ButtonProps['variant'] {
    switch (true) {
      case outlined:
        return 'outlined';
    }
  }

  return (
    <Button
      className={`${styles.AntButton} ${className}`}
      color="primary"
      variant={getVariant()}
      shape="round"
      size={'large'}
      {...rest}>
      {text ?? null}
      {children ?? null}
    </Button>
  );
}

export default AntButton;
