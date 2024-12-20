import { Divider } from '@mui/material';
import { UiMaterialButton, UiMaterialGridItem, UiMaterialGridSwitch } from '@digital-wolf/ui-material';

export interface AdminSharedArticleInterfaceLargeProps {
  readonly state?: boolean;
  readonly onStateChange?: (state: boolean) => void;
  readonly onBtnClick?: () => void;
}

export function AdminSharedArticleInterfaceLarge({ state, onStateChange, onBtnClick }: AdminSharedArticleInterfaceLargeProps) {
  return (
    <>
      <UiMaterialGridSwitch label={'State:'} value={state} onChange={onStateChange} />
      <UiMaterialGridItem className={'u-pt--2'} xs={12}>
        <Divider />
      </UiMaterialGridItem>

      <UiMaterialGridItem xs={12}>
        <UiMaterialButton fullWidth onClick={onBtnClick}>
          Manage Article
        </UiMaterialButton>
      </UiMaterialGridItem>
    </>
  );
}
