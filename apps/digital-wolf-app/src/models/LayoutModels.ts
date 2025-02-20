import { ReactNode } from 'react';

export interface LayoutProps {
  children?: ReactNode;
  onClose?: () => void;
}
