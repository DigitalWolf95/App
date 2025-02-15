'use client'

import clsx from 'clsx';
import styles from './UiAgnosticGlobalLoader.module.scss';
import { ReactNode, useEffect, useState } from 'react';

export interface UiAgnosticGlobalLoaderProps {
  children?: ReactNode;
  isActive: boolean;
}

export function UiAgnosticGlobalLoader({ children, isActive = true }: UiAgnosticGlobalLoaderProps) {
  const [shouldHide, setShouldHide] = useState(false);
  const [shouldReturnNull, setShouldReturnNull] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShouldHide(true);
      setTimeout(() => { 
        setShouldReturnNull(true);
      }, 300);
    }
   }, [isActive]);

  if (shouldReturnNull) return <div/>;

  return (
    <div className={clsx(styles['UiAgnosticGlobalLoader'],{[styles['UiAgnosticGlobalLoader--hide']]: shouldHide})}>
      {children}
    </div>
  );
}

export default UiAgnosticGlobalLoader;
