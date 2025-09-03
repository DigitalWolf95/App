import { $http } from '@digital-wolf/api/services';
import { Image, ImageToStore } from '@digital-wolf/types';
import { deleteImageDocument, storeImageDocument } from '@digital-wolf/firebase/document';
import { imageToStoreToWebp } from '@digital-wolf/fns';

export async function storeImageApi(image?: ImageToStore | null): Promise<Image | undefined> {
  if (!image) return undefined;
  const response = await $http.post('api/image', { image: await imageToStoreToWebp(image) }, { useFormData: true });
  if (response.success) {
    return response.data.image;
  }
}

const apiPathDefaults = { savePath: 'api/image', deletePath: 'api/delete-image' };

export async function saveImageApi({
  imageToSave,
  name,
  folder = 'unspecified',
  apiPath = apiPathDefaults,
}: SaveImageApiParams): Promise<Image | undefined> {
  if (!imageToSave) return undefined;
  const response = await $http.post(apiPath?.savePath, { image: await imageToStoreToWebp(imageToSave) }, { useFormData: true });
  if (response.success) {
    const image: Image = response.data.image;
    try {
      await storeImageDocument(folder, name || image.id, image, { returnData: false });
      return response.data.image;
    } catch (error) {
      await $http.post(apiPath?.deletePath, { image });
      throw error;
    }
  } else {
    throw new Error(response.message);
  }
}

export async function removeImageApi({
  image,
  name,
  folder = 'unspecified',
  apiPath = apiPathDefaults,
}: RemoveImageApiParams): Promise<Image | undefined> {
  if (!image) return undefined;
  const response = await $http.post(apiPath?.deletePath, { image }, { useFormData: true });
  if (response.success) {
    await deleteImageDocument(folder, name || image.id);
    // TODO: Create way to restore deleted image;
  } else {
    throw new Error(response.message);
  }
}

interface SaveImageApiParams {
  imageToSave?: ImageToStore | null;
  apiPath?: {
    savePath: string;
    deletePath: string;
  };
  folder?: string;
  name?: string;
}

interface RemoveImageApiParams {
  image: Image;
  apiPath?: {
    savePath: string;
    deletePath: string;
  };
  folder?: string;
  name?: string;
}
