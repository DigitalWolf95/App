'use client';

import { ReactNode, Fragment } from 'react';
import { useSystemContext } from '../context/SystemContext';
import { UiAgnosticGlobalLoader } from '@digital-wolf/ui-agnostic';
import '@digital-wolf/firebase'
import Image from 'next/image';

export interface BaseContainerProps {
  children?: ReactNode;
}

export function BaseContainer({ children }: BaseContainerProps) {
  const { appLoaded } = useSystemContext();

  return (
    <Fragment>
      <UiAgnosticGlobalLoader isActive={!appLoaded}>
        <Image className={'animate-bounce'} src={'/digital-wolf.webp'} alt={'Digital Wolf Logo'} width={200} height={200} />
      </UiAgnosticGlobalLoader>
      {children}
    </Fragment>
  );
}
