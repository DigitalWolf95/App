'use client';

import '@digital-wolf/styles';
import { Typography } from '@mui/material';
import { UiMaterialGridContainer } from '../../elements/ui-material-grid-container/UiMaterialGridContainer';
import { UiMaterialGridItem } from '../../elements/ui-material-grid-item/UiMaterialGridItem';
import { useMemo } from 'react';
import { FeatureFontSize, FeatureTextAlign } from '@digital-wolf/types';

export interface UiMaterialCardDescriptionProps {
  readonly text: string;
  readonly align?: FeatureTextAlign;
  readonly fontSize?: FeatureFontSize;
}

export function UiMaterialCardDescription({ text, align, fontSize = 'normal' }: UiMaterialCardDescriptionProps) {
  const styles = useMemo(() => ({ overflow: 'auto', backgroundColor: '#333', height: '100%', width: '100%', margin: 0, padding: '24px' }), []);

  return (
    <UiMaterialGridContainer centerX={false} centerY={false} style={styles}>
      <UiMaterialGridContainer spacing={0} sx={{ margin: 'auto auto auto auto' }}>
        <UiMaterialGridItem centerText xs={12}>
          <Typography fontWeight={500} color="white" align={align} className={`FontSizeFeature__${fontSize}`}>
            {text}
          </Typography>
        </UiMaterialGridItem>
      </UiMaterialGridContainer>
    </UiMaterialGridContainer>
  );
}
