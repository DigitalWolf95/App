'use client'

import { ReactNode } from 'react';
import { useSystemContext } from '../context/SystemContext';
import { UiAgnosticGlobalLoader } from '@digital-wolf/ui-agnostic'
import Image from 'next/image';

export interface BaseContainerProps {
  children?: ReactNode;
}

export function BaseContainer({ children }: BaseContainerProps) {
  const {appLoaded} = useSystemContext();

  return <>
    <UiAgnosticGlobalLoader isActive={!appLoaded}>
      <Image className={'animate-bounce'} src={'/DigitalWolf.png'} alt={'Digital Wolf Logo'} width={200} height={200} />
    </UiAgnosticGlobalLoader>
    {children}
  </>
}
