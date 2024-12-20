import { ImageToStore, ImageToStoreList } from '@digital-wolf/types';

export interface BasicInfoFormDataState {
  readonly companyName: string;
}

export interface BasicInfoFormImagesState extends ImageToStoreList {
  readonly loadingScreenImage?: ImageToStore;
}

export interface BasicInfoFormSubmit {
  readonly images: {
    readonly loadingScreenImage?: ImageToStore;
  };
  readonly data: {
    readonly companyName: string;
  };
}
