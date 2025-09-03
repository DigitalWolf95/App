import { Image } from '@digital-wolf/types';
import { getDocument, storeDocument, storeImageDocument } from '@digital-wolf/firebase/document';
import { getImageLink } from '@digital-wolf/firebase/image';
import { BasicInfoFormSubmit } from '../models/basicInfoModels';
import { $http } from '@digital-wolf/api/services';
import { imageToStoreToWebp, imageToWebp } from '@digital-wolf/fns';

export async function fetchBasicInfo(): Promise<DataBasicInfo> {
  const basicInfo = await getDocument<DataBasicInfo['basicInfo']>('general', 'basicInfo');
  const basicInfoImages = { loadingScreenImage: await getImageLink({ folder: 'general', name: 'loadingScreenImage' }) };
  return { basicInfo, basicInfoImages };
}

export async function saveBasicInfoData(payload: BasicInfoFormSubmit): Promise<DataBasicInfo> {
  const basicInfo = await storeDocument('general', 'basicInfo', payload.data);
  const loadingScreenImageToStore = await imageToStoreToWebp(payload.images.loadingScreenImage);
  if (loadingScreenImageToStore) {
    const response = await $http.post('api/image', { image: loadingScreenImageToStore }, { useFormData: true });
    const loadingScreenImage = response.success
      ? await storeImageDocument('general', 'loadingScreenImage', response.data.image)
      : undefined;
    return { basicInfo, basicInfoImages: { loadingScreenImage } };
  }
  return { basicInfo };
}

export interface DataBasicInfo {
  readonly basicInfo: { companyName: string };
  readonly basicInfoImages?: { loadingScreenImage?: Image };
}
