import { ReactComponent } from './generalModels';

export type SocialNetworkSlug = 'pinterest' | 'instagram' | 'linkedIn' | 'twitter' | 'facebook' | 'youtube';

export interface SocialNetwork {
  id: number;
  name: string;
  link?: string;
  Icon: ReactComponent;
  slug: SocialNetworkSlug;
  order?: number;
}
