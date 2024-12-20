import { Image, ImageToStore, ImageToStoreFile } from '@digital-wolf/types';
import { uuidV4 } from '@digital-wolf/fns';

export async function createImageDoc(imageToStore: ImageToStore, onSaveFileImage: (image: ImageToStoreFile) => Promise<string>): Promise<Image> {
  let img: Image = {
    id: uuidV4(),
    url: '',
    order: 0,
    type: 'file',
  };

  if (imageToStore.type === 'file') {
    const url = await onSaveFileImage(imageToStore);
    img = { ...img, type: 'file', url };
  }

  if (imageToStore.type === 'url') {
    img = { ...img, type: 'externalImage', url: imageToStore.value };
  }

  return img;
}
