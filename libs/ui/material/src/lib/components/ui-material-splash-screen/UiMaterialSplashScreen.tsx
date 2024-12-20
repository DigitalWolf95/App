'use client';

import React, { useEffect, useState } from 'react';
import styles from './UiMaterialSplashScreen.module.scss';
import clsx from 'clsx';
import { LinearProgress } from '@mui/material';

export interface UiMaterialSplashScreenProps {
  imageUrl?: string;
  fadeDelay?: number;
  trigger?: boolean;
}

export function UiMaterialSplashScreen({ imageUrl, fadeDelay = 0, trigger }: UiMaterialSplashScreenProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [isFadeInProgress, setFadeInProgress] = useState(true);

  useEffect(() => {
    async function startToFade() {
      await new Promise((resolve) => setTimeout(resolve, fadeDelay));
      setFadeInProgress(false);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setShowSplash(false);
    }

    if (trigger) startToFade();
  }, [trigger]);

  if (!showSplash || !imageUrl) return null;

  return (
    <div>
      <div className={clsx([styles['splash-screen'], { [styles['splash-screen-out']]: !isFadeInProgress }])}>
        <div
          style={{ backgroundImage: `url(${imageUrl})` }}
          className={clsx([
            styles['splash-image'],
            { [styles['splash-image--in']]: isFadeInProgress, [styles['splash-image--out']]: !isFadeInProgress },
            'u-fit-background',
            'u-full-height',
            'u-full-width',
          ])}
        />
        <div className={clsx([styles['overlay'], { [styles['splash-image--in']]: isFadeInProgress, [styles['splash-image--out']]: !isFadeInProgress }])}>
          <LinearProgress color={'primary'} className={styles.loader} />
        </div>
      </div>
    </div>
  );
}
