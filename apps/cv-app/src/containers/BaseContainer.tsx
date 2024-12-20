import { ReactNode } from 'react';

export interface BaseContainerProps {
  children?: ReactNode;
}

export function BaseContainer({ children }: BaseContainerProps) {
  return children;
}
