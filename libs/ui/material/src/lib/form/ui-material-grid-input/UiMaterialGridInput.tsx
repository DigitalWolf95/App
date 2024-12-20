import { UiMaterialGridItem, UiMaterialGridItemProps } from '../../elements/ui-material-grid-item/UiMaterialGridItem';
import { UiMaterialTextField, UiMaterialTextFieldProps } from '../ui-material-text-field/UiMaterialTextField';

export interface UiMaterialGridInputProps {
  inputProps: UiMaterialTextFieldProps;
  gridProps: UiMaterialGridItemProps;
}

export function SharedGridInput({ inputProps, gridProps }: UiMaterialGridInputProps) {
  return (
    <UiMaterialGridItem xs={6} md={4} lg={3} {...gridProps}>
      <UiMaterialTextField {...inputProps} />
    </UiMaterialGridItem>
  );
}
