import { ReactNode } from 'react';
import { ReactComponent } from '@digital-wolf/types';

export interface UtilsLayoutProps<T = any> {
  children?: ReactNode;
  Layout: ReactComponent<T>;
  layoutProps: T;
}

export function UtilsLayout<T = any>({ children, Layout, layoutProps }: UtilsLayoutProps<T>) {
  return <Layout {...layoutProps}>{children}</Layout>;
}
