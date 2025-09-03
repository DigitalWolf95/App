import imageCompression from 'browser-image-compression';
import { ChangeEvent } from 'react';
import { ImageToStore } from '@digital-wolf/types';

export const getFilePreviewURL = (file?: File): Promise<string | undefined> => {
  if (!file) return new Promise((resolve) => resolve(undefined));
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export async function getImageSizeInKB(imageURL: string): Promise<number | null> {
  try {
    const response = await fetch(imageURL);
    if (!response.ok) {
      throw new Error('Failed to fetch the image.');
    }

    const blob = await response.blob();
    return blob.size / 1024;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const fileToBase64 = async (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      const dataUrlParts = base64String.split(',');
      if (dataUrlParts.length === 2) {
        resolve(dataUrlParts[1]);
      } else {
        reject(new Error('Invalid base64 string'));
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

export async function imageToWebp(imageFile: File | undefined): Promise<File | undefined> {
  if (!imageFile) return undefined;

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  return await imageCompression(imageFile, options);
}

export async function imageToStoreToWebp(image?: ImageToStore | null): Promise<ImageToStore | undefined> {
  if (image?.type === 'file' && image.value) {
    const webpImage = await imageToWebp(image.value);
    if (!webpImage) return;
    return {
      type: 'file',
      value: webpImage,
    };
  }
}

export async function imageEventToWebp(event: ChangeEvent<HTMLInputElement>): Promise<File | undefined> {
  if (!event.target.files || !event.target.files[0]) return;
  const imageFile = event.target.files[0];

  return await imageToWebp(imageFile);
}
