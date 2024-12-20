'use client';

import { FormControl, FormLabel, FormErrorMessage, FormHelperText, InputProps, FormControlProps, Input } from '@chakra-ui/react';
import { Label } from '@mui/icons-material';
import { FormikValues, useFormik } from 'formik';
import { useMemo } from 'react';
import { useUuid } from '@digital-wolf/hooks';

export interface ChaInputProps<T extends FormikValues> extends InputProps {
  formControl?: FormControlProps;
  errorMsg?: string;
  label?: string;
  msg?: string;
  msgAndError?: boolean;
  formik?: ReturnType<typeof useFormik<T>>;
}

export function ChaInput<T extends FormikValues>({ errorMsg, formik, label, msg, msgAndError, name: nameStr, formControl, ...props }: ChaInputProps<T>) {
  const { uuid: name } = useUuid({ primaryValue: nameStr });

  const errorMsgMemo = useMemo(() => {
    return formik ? formik.errors?.[name] : errorMsg;
  }, [errorMsg, formik?.errors?.[name]]) as string;

  return (
    <FormControl {...formControl} isInvalid={Boolean(errorMsgMemo)}>
      {Boolean(Label) && <FormLabel htmlFor={props.id}>{label}</FormLabel>}
      <Input value={formik ? formik.values[name] : props.value} onChange={formik ? formik.handleChange : props.onChange} name={name} {...props} />
      {Boolean(msg) && (!errorMsgMemo || msgAndError) && <FormHelperText>{msg}</FormHelperText>}
      {Boolean(errorMsgMemo) && <FormErrorMessage>{errorMsgMemo}</FormErrorMessage>}
    </FormControl>
  );
}
