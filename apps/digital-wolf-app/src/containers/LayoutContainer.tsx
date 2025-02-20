import { ReactNode } from 'react';
import { ReactComponent } from '@digital-wolf/types';
import { MainLayout } from '../layouts/MainLayout';
import { LayoutProps } from '../models/LayoutModels';
import { AuthContainer } from './AuthContainer';

export interface LayoutContainerProps {
  isPrivate?: boolean;
  children: ReactNode;
  Layout?: ReactComponent<LayoutProps>;
}

export function LayoutContainer({ isPrivate, children, Layout = MainLayout }: LayoutContainerProps) {
  if (isPrivate) return <AuthContainer />;

  return <Layout>{children}</Layout>;
}
