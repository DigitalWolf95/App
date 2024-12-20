import { ReactNode } from 'react';
import { LayoutContainer } from '../../containers/LayoutContainer';
import { fetchBasicInfo } from '../../api/basicDataApi';
import { fetchSocialNetworks } from '../../api/socialNetworksDataApi';
import { useConcurrentlyAwait } from '@digital-wolf/hooks';

export interface HomeLayoutProps {
  children: ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const [basicInfo, socialNetworks] = await useConcurrentlyAwait(fetchBasicInfo, fetchSocialNetworks);

  return (
    <LayoutContainer basicInfo={basicInfo} socialNetworks={socialNetworks}>
      {children}
    </LayoutContainer>
  );
}
