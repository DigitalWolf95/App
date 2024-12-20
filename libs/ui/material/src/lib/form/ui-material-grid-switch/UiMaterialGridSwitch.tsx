// Plesae generate me a Material Ui Switch component that will be used in a Grid, 6 for a label and 6 for the switch.
import { ReactNode, ChangeEvent } from 'react';
import { FormControl, FormLabel, Switch } from '@mui/material';
import { UiMaterialGridItem, UiMaterialGridItemProps } from '../../elements/ui-material-grid-item/UiMaterialGridItem';
import { UiMaterialGridContainer } from '../../elements/ui-material-grid-container/UiMaterialGridContainer';
import { UiHelpersIf } from '@digital-wolf/ui-helpers';

export interface UiMaterialGridSwitchProps {
  readonly label?: string;
  readonly value?: boolean;
  readonly children?: ReactNode;
  readonly className?: string;
  readonly onChange?: (state: boolean) => void;
  readonly gridItemProps?: UiMaterialGridItemProps;
}

export function UiMaterialGridSwitch({ label, value, children, onChange, gridItemProps }: UiMaterialGridSwitchProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>, newValue: boolean) {
    onChange?.(newValue);
  }

  return (
    <UiMaterialGridItem xs={12} {...gridItemProps}>
      <FormControl fullWidth>
        <UiMaterialGridContainer margin={0} centerX={false} centerY={true} spacing={0}>
          <UiMaterialGridItem xs={6}>
            <FormLabel component="legend">
              <UiHelpersIf If={!!children} Fallback={<span>{label}</span>}>
                {children}
              </UiHelpersIf>
            </FormLabel>
          </UiMaterialGridItem>

          <UiMaterialGridItem xs={6}>
            <Switch value={true} checked={value} onChange={handleChange} color="primary" />
          </UiMaterialGridItem>
        </UiMaterialGridContainer>
      </FormControl>
    </UiMaterialGridItem>
  );
}
