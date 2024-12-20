import { DivProps, SocialNetwork, SocialNetworkSlug } from '@digital-wolf/types';
import { FacebookIcon, InstagramIcon, LinkedInIcon, PinterestIcon, TwitterIcon, YouTubeIcon } from '../../material-icons/UiIconsMaterial';

const socialNetworksMap: Record<SocialNetworkSlug, SocialNetwork> = {
  pinterest: { id: 1, name: 'Pinterest', Icon: PinterestIcon, slug: 'pinterest', order: 1 },
  instagram: { id: 2, name: 'Instagram', Icon: InstagramIcon, slug: 'instagram', order: 2 },
  linkedIn: { id: 3, name: 'LinkedIn', Icon: LinkedInIcon, slug: 'linkedIn', order: 3 },
  twitter: { id: 4, name: 'Twitter', Icon: TwitterIcon, slug: 'twitter', order: 4 },
  facebook: { id: 5, name: 'Facebook', Icon: FacebookIcon, slug: 'facebook', order: 5 },
  youtube: { id: 6, name: 'Youtube', Icon: YouTubeIcon, slug: 'youtube', order: 6 },
};

export interface UiIconsSocialProps extends DivProps {
  readonly slug: SocialNetworkSlug;
}

export function UiIconsSocial({ slug, ...rest }: UiIconsSocialProps) {
  const Icon = socialNetworksMap[slug].Icon;
  return <Icon {...rest} />;
}