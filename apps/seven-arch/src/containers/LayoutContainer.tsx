'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { MainLayoutView } from '../layouts/MainLayoutView';
import { DocumentSocialNetwork, Payload, ReactComponent } from '@digital-wolf/types';
import { LayoutDrawerProps, LayoutProps, LayoutSocialNetworkProps } from '../models/LayoutModels';
import { mainDrawerItems, adminDrawerItems } from '../constants/mainDrawerItems';
import { UiMaterialBasicLoginForm, UiMaterialBasicLoginFormProps, UiMaterialSplashScreen } from '@digital-wolf/ui-material';
import { useUserContext } from '@digital-wolf/context-api';
import { useCounterDown } from '@digital-wolf/hooks';
import { DataBasicInfo } from '../api/basicDataApi';
import { DataSocialNetworks } from '../api/socialNetworksDataApi';
import { useBasicInfoContext } from '../context/BasicInfoContext';

interface LayoutContainerProps {
  children: ReactNode;
  isPrivate?: boolean;
  isAdmin?: boolean;
  basicInfo?: DataBasicInfo;
  socialNetworks?: DataSocialNetworks;
  Layout?: ReactComponent<LayoutProps>;
}

export function LayoutContainer({ children, isPrivate, isAdmin, basicInfo, socialNetworks, Layout = MainLayoutView }: LayoutContainerProps) {
  const [drawerValue, setDrawerValue] = useState<boolean>(false);
  const { isFinished: isCountdownFinished } = useCounterDown(2000);
  const { setData, socialNetworks: documentSocialNetworks } = useBasicInfoContext();
  const { isLoggedIn, signIn, isSubmitLoading, isUserLoading } = useUserContext();

  useEffect(() => {
    setData({ basicInfo, socialNetworks });
  }, []);

  function handleLoginSubmit(payload: Payload<UiMaterialBasicLoginFormProps['onSubmit']>) {
    signIn(payload?.email, payload?.password, payload?.rememberMe);
  }

  function handleDrawerChange(newDrawerState: boolean) {
    setDrawerValue(newDrawerState);
  }

  function handleSocialNetworkClick(social: DocumentSocialNetwork) {
    console.log('social => ', social);
  }

  const drawerProps = useMemo<LayoutDrawerProps>(() => {
    return { value: drawerValue, onChange: handleDrawerChange, items: isAdmin ? adminDrawerItems : mainDrawerItems };
  }, [drawerValue]);

  const socialNetworkProps = useMemo<LayoutSocialNetworkProps>(() => {
    return { onClick: handleSocialNetworkClick, items: documentSocialNetworks ?? [] };
  }, [documentSocialNetworks]);

  return (
    <Layout drawerProps={drawerProps} socialNetworkProps={socialNetworkProps} basicInfo={basicInfo}>
      <UiMaterialSplashScreen trigger={!isUserLoading && isCountdownFinished} imageUrl={basicInfo?.basicInfoImages?.loadingScreenImage?.url} />

      {isPrivate && !isLoggedIn ? <UiMaterialBasicLoginForm isLoading={isSubmitLoading} onSubmit={handleLoginSubmit} /> : children}
    </Layout>
  );
}
