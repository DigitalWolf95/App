import { InputBaseComponentProps, TextField, TextFieldProps } from '@mui/material';
import React, { ElementType, ReactNode } from 'react';
import { UiMaterialGridItem, UiMaterialGridItemProps } from './../../elements/ui-material-grid-item/UiMaterialGridItem';
import styles from './UiMaterialCardOutlined.module.scss';
import clsx from 'clsx';

interface UiMaterialCardOutlinedProps extends UiMaterialGridItemProps {
  children: ReactNode;
  centerText?: boolean;
  label?: React.ReactNode;
  noPadding?: boolean;
  center?: boolean;
  style?: Record<string, unknown>;
}

// eslint-disable-next-line react/display-name
const InputComponent = React.forwardRef<HTMLDivElement>((props, ref) => <div {...props} ref={ref} />);

export const UiMaterialCardOutlined = ({ children, noPadding, label, className, center = true, ...rest }: UiMaterialCardOutlinedProps) => {
  return (
    <UiMaterialGridItem className={clsx({ [styles.noPaddings]: noPadding }, className)} centerText={center} {...rest}>
      <TextField
        fullWidth={true}
        variant="outlined"
        label={label}
        multiline
        InputLabelProps={{ component: 'span', shrink: true } as unknown as TextFieldProps['InputLabelProps']}
        InputProps={{
          inputComponent: InputComponent as ElementType<InputBaseComponentProps>,
        }}
        inputProps={{ children: children }}
      />
    </UiMaterialGridItem>
  );
};
