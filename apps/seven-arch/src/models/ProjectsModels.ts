import { Image } from '@digital-wolf/types';

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly images: ProjectImage[];
}

export interface ProjectImage {
  readonly image: Image;
  readonly order: number;
  readonly isTitleImage: boolean;
  readonly features: string[];
  readonly socialNetworks: ProjectsSocialUrls;
}

export interface ProjectsSocialUrls {
  readonly facebookUrl?: string;
  readonly instagramUrl?: string;
  readonly linkedInUrl?: string;
  readonly pinterestUrl?: string;
  readonly twitterUrl?: string;
  readonly youtubeUrl?: string;
}

export interface FactAndFigure {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface Person {
  readonly id: string;
  readonly name: string;
  readonly image: Image;
}
