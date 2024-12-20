import { ReactNode } from 'react';
import { UiHelpersIf } from '@digital-wolf/ui-helpers';

interface UtilsHeadProps {
  title?: string;
  children?: ReactNode;
  preloadImageUrls?: (string | null | undefined)[];
}

export function UtilsHead({ title, preloadImageUrls, children }: UtilsHeadProps) {
  return (
    <head>
      {preloadImageUrls?.filter(Boolean).map((imageUrl) => (
        <link rel="prefetch" href={imageUrl || ''} key={imageUrl} />
      ))}
      <UiHelpersIf If={title}>
        <title>{title}</title>
      </UiHelpersIf>
      {children}
    </head>
  );
}
