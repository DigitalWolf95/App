import { ExternalImage, Image } from '@digital-wolf/types';
import { deleteImageDocument, getDocument } from '../document/firebaseDocumentUtils';

// export async function storeImage({ url, folder, name }: { url: string; folder: string; name?: string }): Promise<ExternalImage> {
//   const id = name ?? uuidV4();
//   const externalImage: ExternalImage = { id, type: 'externalImage', url };
//   await storeImageDocument(folder, id, externalImage);
//   return externalImage;
// }

export async function deleteImage({ folder, name }: { folder: string; name: string }): Promise<void> {
  await deleteImageDocument(folder, name);
}

// export async function storeImages<T extends Record<string, Optional<string>>>(folder: string, images: Partial<T>): Promise<ImagesRecord> {
//   let imagesLinks: Record<keyof T, ExternalImage> = {} as Record<keyof T, ExternalImage>;
//   if (images) {
//     for (const imgKey of Object.keys(images)) {
//       const externalImage = await storeImage({ url: images[imgKey] as string, name: imgKey, folder });
//       imagesLinks = { ...imagesLinks, [imgKey]: externalImage };
//     }
//   }
//   return imagesLinks;
// }

// export async function storeImageList({ images, folder }: { folder: string; images: string[] }): Promise<ExternalImage[]> {
//   let imagesLinks: ExternalImage[] = [];
//   if (images) {
//     for (const img of images) {
//       const externalImage = await storeImage({ url: img, folder });
//       imagesLinks = [...imagesLinks, externalImage];
//     }
//   }
//   return imagesLinks;
// }

export async function getImageLink({ folder, name }: { name: string; folder: string }): Promise<Image | undefined> {
  try {
    // TODO: Query specific image, not the whole document;
    const images = await getDocument<ImagesRecord>(folder, 'images');
    return images[name] ?? undefined;
  } catch (e) {
    return;
  }
}

export async function getAllImageLinks({ folder }: { folder: string }): Promise<ExternalImage[]> {
  try {
    const images = await getDocument<ImagesRecord>(folder, 'images');
    return Object.values(images ?? {});
  } catch (e) {
    return [];
  }
}

export type ImagesRecord = Record<string, ExternalImage>;

// Firestore - It works, but it is too expensive;

/*export async function removeFirebaseImage(image: FirebaseImage) {
  const imageRef = storageRef(firebaseStorage, image.dbPath);
  await deleteObject(imageRef);
  //await storeImageDocument(image.id, null); // TODO: Implement this function, folder is missing
}*/

/*export async function storeImage({ image, folder, name }: { image: File; name?: string; folder: string }): Promise<FirebaseImage> {
  const id = name ?? uuidV4();
  const imageRef = storageRef(firebaseStorage, `images/${folder}/${name ?? image.name}`);
  const uploadedImage = await uploadBytes(imageRef, image);
  const firebaseImage: FirebaseImage = { id, type: 'firebaseImage', url: await getDownloadURL(uploadedImage.ref), dbPath: imageRef.fullPath };
  await storeImageDocument(folder, id, firebaseImage);
  return firebaseImage;
}*/

/*
export async function storeImages<T extends { [key: string]: Optional<File> }>({
                                                                                 images,
                                                                                 folder,
                                                                               }: {
  folder: string;
  images: Partial<T>;
}): Promise<Record<keyof typeof images, FirebaseImage>> {
  let imagesLinks: Record<keyof T, FirebaseImage> = {} as Record<keyof T, FirebaseImage>;
  if (images) {
    for (const imgKey of Object.keys(images)) {
      const link = await storeImage({ image: images[imgKey] as File, name: imgKey, folder });
      imagesLinks = { ...imagesLinks, [imgKey]: link };
    }
  }
  return imagesLinks;
}
*/

/* export async function storeImageList({ images, folder }: { folder: string; images: File[] }): Promise<FirebaseImage[]> {
  let imagesLinks: FirebaseImage[] = [];
  if (images) {
    for (const img of images) {
      const link = await storeImage({ image: img as File, name: img.name, folder });
      imagesLinks = [...imagesLinks, link];
    }
  }
  return imagesLinks;
} */

/*
export interface FirebaseImage {
  readonly id: string;
  readonly type: 'firebaseImage';
  readonly url: string;
  readonly order?: number;
  readonly dbPath: string;
}*/
