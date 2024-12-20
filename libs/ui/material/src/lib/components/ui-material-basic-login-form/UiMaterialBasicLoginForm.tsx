'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { LockOutlined } from '@digital-wolf/ui-icons';
import { UiMaterialAvatar } from '../../elements/ui-material-avatar/UiMaterialAvatar';
import { UiMaterialTextHeading } from '../../text/ui-material-text-heading/UiMaterialTextHeading';
import { UiMaterialBox } from '../../elements/ui-material-box/UiMaterialBox';
import { UiMaterialButton } from '../../elements/ui-material-button/UiMaterialButton';
import { UiMaterialCheckbox } from '../../form/ui-material-checkbox/UiMaterialCheckbox';
import { UiMaterialTextField } from '../../form/ui-material-text-field/UiMaterialTextField';
import { fnsObjectMergeWithDefaults } from '@digital-wolf/fns';
import { UiMaterialContainer } from '../../elements/ui-material-container/UiMaterialContainer';

export interface UiMaterialBasicLoginFormTranslations {
  title: string;
  btnSignIn: string;
}

export interface UiMaterialBasicLoginFormProps {
  error?: boolean;
  isLoading?: boolean;
  translations?: UiMaterialBasicLoginFormTranslations;
  onSubmit?: (payload: { email: string; password: string; rememberMe?: boolean }) => void;
}

const translationDefaults: UiMaterialBasicLoginFormTranslations = {
  title: 'Sign in',
  btnSignIn: 'Sign in',
};

export function UiMaterialBasicLoginForm({ error, isLoading, translations, onSubmit }: UiMaterialBasicLoginFormProps) {
  const [fields, setFields] = useState<{ email: string; password: string; rememberMe: boolean }>({ email: '', password: '', rememberMe: false });
  const t = fnsObjectMergeWithDefaults(translationDefaults, translations);

  const loginErrorText = error ? 'Wrong Email or Password' : '';

  function handleFieldChange(event: ChangeEvent<HTMLInputElement>) {
    const elem = event.target;
    setFields((oldFields) => ({ ...oldFields, [elem.name]: elem.value }));
  }

  function handleRememberMeChange(value: boolean) {
    setFields((oldFields) => ({ ...oldFields, rememberMe: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLDivElement>) {
    event.preventDefault();
    onSubmit?.({ email: fields.email, password: fields.password, rememberMe: fields.rememberMe });
  }

  return (
    <UiMaterialContainer component="main" maxWidth={'xs'}>
      <UiMaterialBox sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <UiMaterialAvatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </UiMaterialAvatar>
        <UiMaterialTextHeading className={'u-mb--3'} level={5}>
          {t.title}
        </UiMaterialTextHeading>
        <UiMaterialBox component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <UiMaterialTextField value={fields.email} onChange={handleFieldChange} label="Email Address" name="email" error={!!loginErrorText} />
          <UiMaterialTextField value={fields.password} onChange={handleFieldChange} label="Password" name="password" password errorText={loginErrorText} />
          <UiMaterialCheckbox checked={fields.rememberMe} onChange={(e) => handleRememberMeChange(e.checked)} label={'Remember Me'} />

          <UiMaterialButton submit loading={isLoading} btnType={'LoadingButton'} fullWidth sx={{ mb: 2 }}>
            {t.btnSignIn}
          </UiMaterialButton>
        </UiMaterialBox>
      </UiMaterialBox>
    </UiMaterialContainer>
  );
}
