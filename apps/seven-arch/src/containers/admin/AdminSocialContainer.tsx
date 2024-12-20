'use client';

import { useContainerData } from '@digital-wolf/hooks';
import { DocumentSocialNetwork } from '@digital-wolf/types';
import { DataSocialNetworks, saveSocialNetworks } from '../../api/socialNetworksDataApi';
import { AdminSocialView } from '../../components/admin/Page:AdminSocial/AdminSocialView';

export interface FeatureSocialNetworksContainerProps extends DataSocialNetworks {}

export interface FeatureSocialNetworksContainerState extends DataSocialNetworks {}

export function AdminSocialContainer({ socialNetworks }: FeatureSocialNetworksContainerProps) {
  const { state, updateState, loadingFlags, updateLoadingFlag } = useContainerData<FeatureSocialNetworksContainerState>({ socialNetworks });

  async function handleSubmit(payload: DocumentSocialNetwork[]) {
    try {
      updateLoadingFlag('submit', true);
      const socialNetworks = await saveSocialNetworks(payload);
      updateState({ socialNetworks });
    } finally {
      updateLoadingFlag('submit', false);
    }
  }

  return <AdminSocialView loadingFlags={loadingFlags} socialNetworks={state.socialNetworks} onSubmit={handleSubmit} />;
}
