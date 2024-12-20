import { ReactNode } from 'react';
import { LayoutContainer } from '../../containers/LayoutContainer';
import { fetchBasicInfo } from '../../api/basicDataApi';
import { useConcurrentlyAwait } from '@digital-wolf/hooks';
import { fetchSocialNetworks } from '../../api/socialNetworksDataApi';

export interface HomeLayoutProps {
  children: ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const [basicInfo, socialNetworks] = await useConcurrentlyAwait(fetchBasicInfo, fetchSocialNetworks);

  return (
    <LayoutContainer basicInfo={basicInfo} socialNetworks={socialNetworks} isPrivate isAdmin>
      {children}
    </LayoutContainer>
  );
}
