import { Image, ImageToStore } from '@digital-wolf/types';
import { useState, useRef } from 'react';
import { AdminSharedForm } from '../../Shared/AdminSharedForm';
import { UiMaterialAdminGallery, UiMaterialUploadImage, UiMaterialUploadImageRef } from '@digital-wolf/ui-material';

export interface AdminHomeSliderViewProps {
  images: Image[];
  isUploadLoading: boolean;
  onUploadImage: (image: ImageToStore) => Promise<void>;
  onRemoveImage: (image: Image) => void;
  onChangeImageOrder?: (image: Image, order: number) => Promise<void>;
  isLoading?: boolean;
}

export function AdminHomeSliderView({ images, isUploadLoading, isLoading, onUploadImage, onRemoveImage, onChangeImageOrder }: AdminHomeSliderViewProps) {
  const [fileToUpload, setFileToUpload] = useState<ImageToStore | undefined>();
  const ref = useRef<UiMaterialUploadImageRef>(null);

  function handleImageUpload(image?: ImageToStore) {
    setFileToUpload(image);
  }

  function handleRemoveImage(image: Image) {
    onRemoveImage(image);
  }

  async function handleOrderChange(image: Image, order: number) {
    await onChangeImageOrder?.(image, order);
  }

  async function handleSubmit() {
    if (fileToUpload) {
      await onUploadImage(fileToUpload);
      setFileToUpload(undefined);
      ref.current?.clear();
    }
  }

  return (
    <AdminSharedForm noArticle btnText={'Add'} initialLoading={isLoading} title={'Home Page'} isSubmitLoading={isUploadLoading} onSubmit={handleSubmit}>
      <UiMaterialAdminGallery onRemoveImage={handleRemoveImage} onChangeImageOrder={handleOrderChange} images={images} />
      <UiMaterialUploadImage ref={ref} useExternalLink={true} label={'Add Slider Image'} stateImage={fileToUpload} onSetState={handleImageUpload} />
    </AdminSharedForm>
  );
}
