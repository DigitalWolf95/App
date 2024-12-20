'use client';

import { DataSliderImages } from '../../api/homeApi';
import { useContainerData } from '@digital-wolf/hooks';
import { Image, ImageToStore } from '@digital-wolf/types';
import { useUiMaterialToastMessage } from '@digital-wolf/ui-material';
import { updateImageDocument } from '@digital-wolf/firebase/document';
import { removeImageApi, saveImageApi } from '../../api/imageApi';
import { AdminHomeSliderView } from '../../components/admin/Page:AdminHomeSlider/AdminHomeSliderView';

interface FeatureAdminMainPageContainerState {
  sliderImages: Image[];
  isSaveLoading?: boolean;
  isDeleteLoading?: boolean;
}

export interface AdminHomeSliderContainerProps extends DataSliderImages {}

export function AdminHomeSliderContainer({ sliderImages }: AdminHomeSliderContainerProps) {
  const { showToastMessage } = useUiMaterialToastMessage();

  const { state, addToArrayInState, updateState, deleteFromArrayInState, updateArrayItemInState, initialLoading } =
    useContainerData<FeatureAdminMainPageContainerState>({ sliderImages: sliderImages ?? [] });

  async function handleAddNewImage(imageToSave: ImageToStore) {
    try {
      updateState({ isSaveLoading: true });
      const newImage = await saveImageApi({ folder: 'sliderImages', imageToSave });
      showToastMessage('Image successfully added');
      addToArrayInState('sliderImages', newImage);
    } finally {
      updateState({ isSaveLoading: false });
    }
  }

  async function handleDeleteImage(image: Image) {
    try {
      updateState({ isDeleteLoading: true });
      await removeImageApi({ folder: 'sliderImages', image });
      deleteFromArrayInState('sliderImages', 'id', image.id);
    } finally {
      updateState({ isDeleteLoading: false });
    }
  }

  async function handleOrderChange(image: Image, order: number) {
    try {
      updateState({ isSaveLoading: true });
      const newImage = await updateImageDocument({ folder: 'sliderImages', payload: { ...image, order } });
      updateArrayItemInState('sliderImages', 'id', newImage.id, newImage);
      showToastMessage('Image order successfully changed');
    } finally {
      updateState({ isSaveLoading: false });
    }
  }

  return (
    <AdminHomeSliderView
      isLoading={initialLoading}
      isUploadLoading={state.isSaveLoading ?? false}
      onUploadImage={handleAddNewImage}
      onRemoveImage={handleDeleteImage}
      onChangeImageOrder={handleOrderChange}
      images={state.sliderImages}
    />
  );
}
