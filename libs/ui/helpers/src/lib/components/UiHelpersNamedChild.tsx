import { ReactNode } from 'react';
import { ReactNamedNode } from '@digital-wolf/types';

export interface UiHelpersNamedChildProps<T> {
  children?: ReactNode;
  name?: T;
}

const El = ({ children, RNamedChild = 'Default' }: { RNamedChild?: string; children: ReactNode }) => children;

export function UiHelpersNamedChild<T extends string = 'Default'>({ children, name }: UiHelpersNamedChildProps<T>): ReactNamedNode<T> {
  return (
    <El data-name={name} RNamedChild={name}>
      {children}
    </El>
  ) as ReactNamedNode<T>;
}
