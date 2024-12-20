'use client';

import { ReactNode, createContext, useContext, useMemo, useState, useEffect } from 'react';
import { DataBasicInfo, fetchBasicInfo as fetchBasicInfoApi } from '../api/basicDataApi';
import { DataSocialNetworks, fetchSocialNetworks as fetchSocialNetworksApi } from '../api/socialNetworksDataApi';
import { concurrentlyAwait } from '@digital-wolf/fns';

interface BasicInfoContextValues {
  isLoading: boolean;
  basicInfo?: DataBasicInfo['basicInfo'];
  basicInfoImages?: DataBasicInfo['basicInfoImages'];
  socialNetworks?: DataSocialNetworks['socialNetworks'];
  refetch: () => Promise<void>;
  setData: (data: { basicInfo?: DataBasicInfo; socialNetworks?: DataSocialNetworks }) => void;
}

const BasicInfoContext = createContext<BasicInfoContextValues>({ refetch: async () => {}, isLoading: false, setData: () => {} });

interface SystemContextProviderProps {
  autoFetch?: boolean;
  children: ReactNode;
}

export function useBasicInfoContext() {
  return useContext(BasicInfoContext);
}

export function BasicInfoContextProvider({ autoFetch, children }: SystemContextProviderProps) {
  const [basicInfo, setBasicInfo] = useState<DataBasicInfo | undefined>();
  const [socialNetworks, setSocialNetworks] = useState<DataSocialNetworks | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (autoFetch) refetch();
  }, []);

  function setData(data: { basicInfo?: DataBasicInfo; socialNetworks?: DataSocialNetworks }) {
    setBasicInfo(data.basicInfo);
    setSocialNetworks(data.socialNetworks);
  }

  async function refetch() {
    setIsLoading(true);
    const [basicInfo, socialNetworks] = await concurrentlyAwait(fetchBasicInfoApi, fetchSocialNetworksApi);
    setBasicInfo(basicInfo);
    setSocialNetworks(socialNetworks);
    setIsLoading(false);
  }

  const providerValue = useMemo<BasicInfoContextValues>(() => {
    return {
      isLoading,
      basicInfo: basicInfo?.basicInfo,
      basicInfoImages: basicInfo?.basicInfoImages,
      socialNetworks: socialNetworks?.socialNetworks,
      refetch,
      setData,
    };
  }, [basicInfo?.basicInfo, basicInfo?.basicInfoImages, isLoading, socialNetworks?.socialNetworks]);

  return <BasicInfoContext.Provider value={providerValue}>{children}</BasicInfoContext.Provider>;
}
