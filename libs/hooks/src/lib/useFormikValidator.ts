'use client';

import { useFormik, FormikValues as FV, FormikConfig } from 'formik';

export function useFormikValidator<T extends FV>(config: FormikConfig<T>) {
  const formik = useFormik<T>(config) as unknown as Formik<T>;
  return { formik };
}

export function useFormikHelpers<T extends FV>() {
  function formikValidateEmail<T extends FV>(values: T, field: keyof T, { emailInvalidMsg }: { emailInvalidMsg?: string } = {}): Partial<FormikErrors<T>> {
    if (!values || !field || !values[field]) return {};
    const returnErrors: Partial<FormikErrors<T>> = {};

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      returnErrors[field] = emailInvalidMsg ?? 'Invalid Email Address';
    }

    return returnErrors;
  }

  function formikRequired<T extends FV>(values: T, field: keyof T, { requiredMsg }: { requiredMsg?: string } = {}): Partial<FormikErrors<T>> {
    if (!values || !field) return {};
    const returnErrors: Partial<FormikErrors<T>> = {};

    if (!values[field]) {
      returnErrors[field] = requiredMsg ?? 'Required';
    }

    return returnErrors;
  }

  function formikMinLen<T extends FV>(values: T, field: keyof T, { min = 0, minMsg }: { min?: number; minMsg?: string } = {}): Partial<FormikErrors<T>> {
    if (!values || !field) return {};
    const returnErrors: Partial<FormikErrors<T>> = {};

    if (typeof values[field] === 'string' && values[field].length < min) returnErrors[field] = minMsg ?? 'too_short';

    return returnErrors;
  }

  function formikMaxLen<T extends FV>(values: T, field: keyof T, { max = 0, maxMsg }: { max?: number; maxMsg?: string } = {}): Partial<FormikErrors<T>> {
    if (!values || !field) return {};
    const returnErrors: Partial<FormikErrors<T>> = {};

    if (typeof values[field] === 'string' && values[field].length > max) returnErrors[field] = maxMsg ?? 'too_long';

    return returnErrors;
  }

  return { validateEmail: formikValidateEmail<T>, validateRequired: formikRequired<T>, validateMin: formikMinLen<T>, validateMax: formikMaxLen<T> };
}

export interface Formik<T> extends ReturnType<typeof useFormik> {
  validate?: (values: T) => boolean;
}

export type FormikErrors<T extends FV> = Record<keyof T, string>;
