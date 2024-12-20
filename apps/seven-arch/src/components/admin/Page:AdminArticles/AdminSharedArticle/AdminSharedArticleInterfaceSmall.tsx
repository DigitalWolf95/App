import { UiMaterialButton, UiMaterialDivider, UiMaterialGridItem, UiMaterialGridSwitch } from '@digital-wolf/ui-material';
import { UiHelpersIf } from '@digital-wolf/ui-helpers';
import { DragIndicatorIcon } from '@digital-wolf/ui-icons';

export interface AdminSharedArticleInterfaceSmallProps {
  readonly state?: boolean;
  readonly onStateChange?: (state: boolean) => void;
  readonly onBtnClick?: () => void;
  readonly dragAndDrop?: boolean;
}

export function AdminSharedArticleInterfaceSmall({ state, dragAndDrop, onStateChange, onBtnClick }: AdminSharedArticleInterfaceSmallProps) {
  return (
    <>
      <UiMaterialGridItem className={'u-center--x'} xs={5}>
        <UiHelpersIf If={dragAndDrop}>
          <DragIndicatorIcon style={{ marginRight: '-15px', zIndex: 2 }} className={'dndHandle'} />
        </UiHelpersIf>
        <UiMaterialGridSwitch label={'State:'} value={state} onChange={onStateChange} />
      </UiMaterialGridItem>
      <UiMaterialGridItem className={'u-start--x'} xs={1}>
        <UiMaterialDivider orientation={'vertical'} />
      </UiMaterialGridItem>

      <UiMaterialGridItem xs={6}>
        <UiMaterialButton fullWidth onClick={onBtnClick}>
          Manage Article
        </UiMaterialButton>
      </UiMaterialGridItem>
    </>
  );
}
