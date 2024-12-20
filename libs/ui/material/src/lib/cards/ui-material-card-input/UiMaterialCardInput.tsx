'use client';

import '@digital-wolf/styles';
import { Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { FeatureFontSize, FeatureTextAlign } from '@digital-wolf/types';
import { UiMaterialGridContainer, UiMaterialGridContainerProps } from '../../elements/ui-material-grid-container/UiMaterialGridContainer';
import { UiMaterialGridItem } from '../../elements/ui-material-grid-item/UiMaterialGridItem';
import { UiMaterialTextField } from '../../form/ui-material-text-field/UiMaterialTextField';
import { UiMaterialButton } from '../../elements/ui-material-button/UiMaterialButton';

export interface UiMaterialCardInputProps {
  readonly text: string;
  readonly btnText: string;
  readonly onSubscribe?: (email: string) => void;
  readonly align?: FeatureTextAlign;
  readonly fontSize?: FeatureFontSize;
  readonly containerProps?: Omit<UiMaterialGridContainerProps, 'children'>;
}

export function UiMaterialCardInput({ text, btnText, onSubscribe, containerProps, align, fontSize = 'normal' }: UiMaterialCardInputProps) {
  const [email, setEmail] = useState('');
  const styles = useMemo(() => ({ backgroundColor: '#333', height: '100%', width: '100%', margin: 0, padding: '24px' }), []);

  function handleSubscribeClick() {
    onSubscribe?.(email);
  }

  return (
    <UiMaterialGridContainer centerX={false} centerY={false} sx={styles} {...containerProps}>
      <UiMaterialGridContainer spacing={0} sx={{ margin: 'auto auto auto auto' }}>
        <UiMaterialGridItem mb={2} xs={12}>
          <Typography fontWeight={500} color="white" align={align} className={`FontSizeFeature__${fontSize}`}>
            {text}
          </Typography>
        </UiMaterialGridItem>

        <UiMaterialGridItem xs={12}>
          <UiMaterialTextField label={'Email'} onChange={(e) => setEmail(e.target.value)} />
        </UiMaterialGridItem>

        <UiMaterialGridItem xs={12}>
          <UiMaterialButton onClick={handleSubscribeClick} fullWidth>
            {btnText}
          </UiMaterialButton>
        </UiMaterialGridItem>
      </UiMaterialGridContainer>
    </UiMaterialGridContainer>
  );
}
