'use client';

import styles from './UiMaterialLinkBar.module.scss';
import { useMemo } from 'react';
import { UiMaterialButton } from './../../elements/ui-material-button/UiMaterialButton';
import { DivProps } from '@digital-wolf/types';

export interface UiMaterialLinkBarLink {
  label: string;
  url: string;
  external?: boolean;
}

export interface UiMaterialLinkBarProps extends DivProps {
  spacing?: number;
  links?: UiMaterialLinkBarLink[];
  color?: string;
}

export function UiMaterialLinkBar({ spacing, links, color, ...divProps }: UiMaterialLinkBarProps) {
  const spacingCmp = useMemo(() => {
    const sp = spacing ?? 1;
    return sp === 0 ? 0 : `${sp * 0.25}rem`;
  }, [spacing]);

  const elemStyles = useMemo(() => {
    return {
      marginInline: spacingCmp,
      ...(color && { color }),
    };
  }, [spacingCmp, color]);

  return (
    <div {...divProps} className={styles.UiMaterialLinkBar}>
      {links?.map((link) => (
        <UiMaterialButton
          className={styles.UiMaterialLinkBar__link}
          key={link.label}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noopener noreferrer' : undefined}
          passHref={link.external}
          href={link.url}
          style={elemStyles}
          btnType={'Link'}
        >
          {link.label}
        </UiMaterialButton>
      ))}
    </div>
  );
}

export default UiMaterialLinkBar;
