'use client';

import styles from './cha-auth-form.module.scss';
import { fnsObjectMergeWithDefaults } from '@digital-wolf/fns';
import { useFormikHelpers, useFormikValidator } from '@digital-wolf/hooks';
import { ChaInput } from '../../elements/cha-input/cha-input';

export interface ChaAuthFormFields {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ChaAuthFormTranslations {
  title: string;
  btnSignIn: string;
  loginError: string;
}

export interface ChaAuthFormProps {
  error?: boolean;
  isLoading?: boolean;
  translations?: ChaAuthFormTranslations;
  onSubmit?: (payload: { email: string; password: string; rememberMe?: boolean }) => void;
}

const translationDefaults: ChaAuthFormTranslations = {
  title: 'Sign in',
  btnSignIn: 'Sign in',
  loginError: 'Wrong Email or Password',
};

export function ChaAuthForm({ error, translations, onSubmit, isLoading }: ChaAuthFormProps) {
  const t = fnsObjectMergeWithDefaults(translationDefaults, translations);

  const { validateEmail, validateRequired } = useFormikHelpers<ChaAuthFormFields>();
  const { formik } = useFormikValidator<ChaAuthFormFields>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: (values) => {
      const requiredEmailError = validateRequired(values, 'email', { requiredMsg: 'Email is Required' });
      const emailErrors = validateEmail(values, 'email');
      return { ...emailErrors, ...requiredEmailError };
    },
    onSubmit: handleSubmit,
  });

  async function handleSubmit({ email, password, rememberMe, ...rest }: ChaAuthFormFields) {
    console.log('submit ', email, password, rememberMe, rest);
    onSubmit?.({ email, password, rememberMe });
  }

  return (
    <form className={styles['container']} onSubmit={formik.handleSubmit}>
      <ChaInput id={'test-id'} name={'email'} formik={formik} />
      <button type={'submit'}>{t?.btnSignIn}</button>
    </form>
  );
}

export default ChaAuthForm;
