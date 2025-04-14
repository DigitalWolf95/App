'use client';

import { ReactNode, useRef, FormEvent } from 'react';
import { UiMaterialCircularLoader } from '../../loaders/ui-material-circular-loader/UiMaterialCircularLoader';
import { UiHelpersIf } from '@digital-wolf/ui-helpers';
import { UiMaterialGridContainer, UiMaterialGridContainerProps } from '../../elements/ui-material-grid-container/UiMaterialGridContainer';

export interface UiMaterialFormProps {
  containerProps?: Omit<UiMaterialGridContainerProps, 'children'>;
  children?: ReactNode;
  grid?: boolean;
  isLoading?: boolean;
  spacing?: number;
  onSubmit?: () => void;
}

export function UiMaterialForm({ children, grid = true, isLoading, containerProps, spacing = 3, onSubmit }: UiMaterialFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // if (validation && formRef.current && !formRef.current.checkValidity()) return;
    onSubmit?.();
  }

  if (isLoading) return <UiMaterialCircularLoader />;
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <UiHelpersIf If={grid}>
        <UiMaterialGridContainer centerX column spacing={spacing} mt={0} mb={0} {...containerProps}>
          {children}
        </UiMaterialGridContainer>
      </UiHelpersIf>

      <UiHelpersIf If={!grid}>{children}</UiHelpersIf>
    </form>
  );
}
