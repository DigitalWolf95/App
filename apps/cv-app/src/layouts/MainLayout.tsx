import { LayoutProps } from '../models/LayoutModels';

export function MainLayout({ children }: LayoutProps) {
  return (
    <div>
      <span>Main Layout</span>
      {children}
    </div>
  );
}
