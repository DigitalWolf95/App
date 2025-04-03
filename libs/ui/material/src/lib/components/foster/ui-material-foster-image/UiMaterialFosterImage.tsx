import Image from 'next/image';
import styles from './UiMaterialFosterImage.module.scss';
import { Typography } from '@mui/material';
import { DivProps, Image as ImageType } from '@digital-wolf/types';
import { UiHelpersIf } from '@digital-wolf/ui-helpers';
import { makeImageUrl } from '@digital-wolf/fns';

export interface UiMaterialFosterImageProps {
  image?: ImageType;
  url?: string;
  alt?: string;
  text?: string;
  type?: 'img' | 'div';
  noZoom?: boolean;
  onClick?: () => void;
  imageProps?: DivProps;
}

export function UiMaterialFosterImage({ image, text, type = 'img', alt, url, noZoom, imageProps, onClick }: UiMaterialFosterImageProps) {

  const urlToUse = makeImageUrl(image?.url || url);

  return (
    <UiHelpersIf If={image || url}>
      <div
        className={`${styles.SharedContentImage} ${styles.SharedContentImage_container} ${styles['SharedContentImage_fullSize']} ${
          noZoom ? '' : 'u-mouse-pointer'
        }`}
        style={{ aspectRatio: '16/9' }}
        onClick={onClick}
      >
        <UiHelpersIf If={text}>
          <div className={styles.SharedContentImage_overlay} />
          <Typography variant={'subtitle1'} className={styles['SharedContentImage_text']}>
            {text}
          </Typography>
        </UiHelpersIf>

        <UiHelpersIf If={type === 'img'}>
          <Image
            className={`${styles['SharedContentImage_fullSize']} ${noZoom ? '' : styles['SharedContentImage__image-zoom']}`}
            style={{ objectFit: 'cover', aspectRatio: '16/9' }}
            width={1000}
            height={1000}
            src={urlToUse}
            alt={alt ?? ''}
          />
        </UiHelpersIf>

        <UiHelpersIf If={type === 'div'}>
          <div
            className={`${styles['SharedContentImage_fullSize']} ${styles['SharedContentImage__image-div']} ${
              noZoom ? '' : styles['SharedContentImage__image-zoom']
            } ${imageProps?.className ?? ''}`}
            style={{
              backgroundImage: `url('${urlToUse}')`,
              ...(imageProps?.style ?? {}),
            }}
          />
        </UiHelpersIf>
      </div>
    </UiHelpersIf>
  );
}
