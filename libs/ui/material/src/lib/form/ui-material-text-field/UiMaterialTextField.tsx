import { TextField, TextFieldProps } from '@mui/material';

export type UiMaterialTextFieldProps = TextFieldProps & { errorText?: string; password?: boolean };

export function UiMaterialTextField(props: UiMaterialTextFieldProps) {
  const { password, errorText, ...rest } = props;

  const optionals = {
    ...(props.password && { type: 'password' }),
  };

  return <TextField margin={'none'} variant={'outlined'} fullWidth size={'small'} error={!!errorText} helperText={errorText || ' '} {...optionals} {...rest} />;
}
