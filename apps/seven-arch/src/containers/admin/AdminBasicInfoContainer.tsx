'use client';

import { useContainerData } from '@digital-wolf/hooks';
import { DataBasicInfo, saveBasicInfoData } from '../../api/basicDataApi';
import { AdminBasicInfoView } from '../../components/admin/Page:AdminBasicInfo/AdminBasicInfoView';
import { BasicInfoFormSubmit } from '../../models/basicInfoModels';
import { GenericLoadingFlags } from '@digital-wolf/types';

interface AdminBasicInfoContainerState extends DataBasicInfo {}

interface AdminBasicInfoContainerProps extends DataBasicInfo {}

export function AdminBasicInfoContainer({ basicInfoImages, basicInfo }: AdminBasicInfoContainerProps) {
  const { state, updateState, updateLoadingFlag, loadingFlags } = useContainerData<AdminBasicInfoContainerState, GenericLoadingFlags>({
    basicInfoImages,
    basicInfo,
  });

  async function handleSubmit(data: BasicInfoFormSubmit) {
    updateLoadingFlag('submit', true);
    try {
      const response = await saveBasicInfoData(data);
      if (response?.basicInfo) updateState({ basicInfo: response.basicInfo });
      if (response?.basicInfoImages) updateState({ basicInfoImages: response.basicInfoImages });
    } finally {
      updateLoadingFlag('submit', false);
    }
  }

  return <AdminBasicInfoView onSubmit={handleSubmit} loadingFlags={loadingFlags} images={{ ...state.basicInfoImages }} data={{ ...state.basicInfo }} />;
}
