import { UiMaterialButton, UiMaterialText } from '@digital-wolf/ui-material';

export function FooterCopyright() {
  return (
    <UiMaterialText variant="body2" color="text.secondary" textAlign={'end'}>
      <UiMaterialButton btnType={'Link'} href={'/legal-and-policies'}>
        Legal and policies
      </UiMaterialButton>{' '}
      © {new Date().getFullYear()} Seven Arch. All Rights Reserved.
    </UiMaterialText>
  );
}
