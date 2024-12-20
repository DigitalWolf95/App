import { LayoutContainer } from '../../containers/LayoutContainer';
import { ReactNode } from 'react';

interface PublicProps {
  children: ReactNode;
}

export default async function Public({ children }: PublicProps) {
  return <LayoutContainer isPrivate>{children}</LayoutContainer>;
}
