'use client';

import { UiMaterialButton, UiMaterialButtonIconProps } from '../../elements/ui-material-button/UiMaterialButton';
import { DivProps, DocumentSocialNetwork } from '@digital-wolf/types';
import { UiIconsSocial } from '@digital-wolf/ui-icons';

export interface SharedCardSocialNetworksProps extends Omit<DivProps, 'onClick'> {
  btnProps?: Omit<UiMaterialButtonIconProps, 'btnType'>;
  socialNetworks?: DocumentSocialNetwork[];
  onClick?: (socialNetwork: DocumentSocialNetwork) => void;
}

export function UiMaterialSocialBar({ socialNetworks = [], btnProps, onClick, ...divProps }: SharedCardSocialNetworksProps) {
  return (
    <div {...divProps}>
      {socialNetworks.map((social) => (
        <UiMaterialButton style={{ marginRight: '5px' }} btnType={'Icon'} key={social.id} {...btnProps} onClick={() => onClick?.(social)}>
          <UiIconsSocial slug={social.slug} />
        </UiMaterialButton>
      ))}
    </div>
  );
}
