export interface FileImage {
  readonly id: string;
  readonly type: 'file';
  readonly url: string;
  readonly order?: number;
}

export interface ExternalImage {
  readonly id: string;
  readonly type: 'externalImage';
  readonly url: string;
  readonly order?: number;
}

export interface ImageToStoreUrl {
  type: 'url';
  value: string;
}

export interface ImageToStoreFile {
  type: 'file';
  value: File;
}

export interface ImageToRemove {
  type: 'remove';
}

export type Image = ExternalImage | FileImage;

export type ImageToStore = ImageToStoreFile | ImageToStoreUrl | ImageToRemove;

// Generic Payload need to be type of object that can receive any key and any value, but it must have key id of type string
//eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style, @typescript-eslint/consistent-type-definitions
export type ImageToStoreList = {
  [key: string]: ImageToStore | undefined;
};
