'use client'

import clsx from 'clsx';
import styles from './UiAgnosticGlobalLoader.module.scss';
import { ReactNode, useEffect, useState } from 'react';
import { fakeAwait } from '@digital-wolf/fns';

export interface UiAgnosticGlobalLoaderProps {
  children?: ReactNode;
  isActive: boolean;
  delay?: number;
}

export function UiAgnosticGlobalLoader({ children, delay = 2000, isActive = true, }: UiAgnosticGlobalLoaderProps) {
  const [shouldHide, setShouldHide] = useState(false);
  const [shouldReturnNull, setShouldReturnNull] = useState(false);

  useEffect(() => {
    async function start() {
      await fakeAwait(delay);
      setShouldHide(true);
      await fakeAwait(700);
      setShouldReturnNull(true);
    }
    if (isActive) start();
   }, [isActive]);

  if (shouldReturnNull) return <div/>;

  return (
    <div className={clsx(styles['UiAgnosticGlobalLoader'],{[styles['UiAgnosticGlobalLoader--hide']]: shouldHide})}>
      {children}
    </div>
  );
}

export default UiAgnosticGlobalLoader;
