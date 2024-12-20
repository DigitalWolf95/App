import { ReactNode } from 'react';
import { Container, ContainerProps } from '@mui/material';

export interface UiMaterialContainerProps extends ContainerProps {
  children: ReactNode;
}

export function UiMaterialContainer({ children, ...rest }: UiMaterialContainerProps) {
  return <Container {...rest}>{children}</Container>;
}
