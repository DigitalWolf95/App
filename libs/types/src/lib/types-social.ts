import { ReactComponent } from './types-general';

export type SocialNetworkSlug = 'pinterest' | 'instagram' | 'linkedIn' | 'twitter' | 'facebook' | 'youtube';

export interface SocialNetwork {
  id: number;
  name: string;
  link?: string;
  Icon: ReactComponent;
  slug: SocialNetworkSlug;
  order?: number;
}

export interface DocumentSocialNetwork {
  id: number;
  link?: string;
  order?: number;
  name: string;
  slug: SocialNetworkSlug;
  state: boolean;
}
