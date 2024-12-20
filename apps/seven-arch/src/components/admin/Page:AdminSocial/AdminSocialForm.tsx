import { UiMaterialCardOutlined, UiMaterialTextField } from '@digital-wolf/ui-material';
import { UiIconsSocial } from '@digital-wolf/ui-icons';
import { DocumentSocialNetwork } from '@digital-wolf/types';

export interface AdminSocialFormProps {
  socialNetwork: DocumentSocialNetwork;
  linkValue: string | undefined;
  onLinkChange: (socialNetwork: DocumentSocialNetwork, link: string) => void;
}

export function AdminSocialForm({ socialNetwork, linkValue, onLinkChange }: AdminSocialFormProps) {
  return (
    <UiMaterialCardOutlined
      label={
        <div className={'u-center--x'}>
          <UiIconsSocial slug={socialNetwork.slug} className={'u-mr--3'} />
          {socialNetwork.name}
        </div>
      }
    >
      <UiMaterialTextField
        style={{ marginTop: '20px' }}
        fullWidth
        label={'Link'}
        value={linkValue ?? ''}
        onChange={(event) => onLinkChange(socialNetwork, event.target.value)}
      />
    </UiMaterialCardOutlined>
  );
}
