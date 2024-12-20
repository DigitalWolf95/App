import { DocumentSocialNetwork } from '@digital-wolf/types';
import { UiMaterialGridSwitch } from '@digital-wolf/ui-material';
import { DragIndicatorIcon, UiIconsSocial } from '@digital-wolf/ui-icons';
import clsx from 'clsx';

export interface AdminSocialToggleItemProps {
  socialNetwork: DocumentSocialNetwork;
  onChange: (socialNetwork: DocumentSocialNetwork, state: boolean) => void;
  className?: string;
  value: boolean;
}

export function AdminSocialToggleItem({ value, socialNetwork, className, onChange }: AdminSocialToggleItemProps) {
  return (
    <div className={className}>
      <UiMaterialGridSwitch value={value} onChange={(state) => onChange(socialNetwork, state)}>
        <div style={{ marginLeft: '30%' }} className={clsx(['u-center--x', 'u-test-align-start'])}>
          <DragIndicatorIcon className={'u-mr--3 dndHandle'} />
          <UiIconsSocial slug={socialNetwork.slug} className={'u-mr--3'} />
          <span>{socialNetwork.name}</span>
        </div>
      </UiMaterialGridSwitch>
    </div>
  );
}
