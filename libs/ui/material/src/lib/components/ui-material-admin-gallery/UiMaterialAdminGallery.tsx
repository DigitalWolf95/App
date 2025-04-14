import classes from './UiMaterialAdminGallery.module.scss';
import { useMemo } from 'react';
import { Image } from '@digital-wolf/types';
import { changeArrayElementPosition, makeImageUrl, sortArray } from '@digital-wolf/fns';
import { UiMaterialCardOutlined } from '../../cards/ui-material-card-outlined/UiMaterialCardOutlined';
import { UiHelpersDragAndDrop, UiHelpersIf } from '@digital-wolf/ui-helpers';
import { DeleteForeverIcon, DragIndicatorIcon } from '@digital-wolf/ui-icons';
import { UiMaterialButton } from '../../elements/ui-material-button/UiMaterialButton';
import { UiMaterialGridItem } from '../../elements/ui-material-grid-item/UiMaterialGridItem';
import { CircularProgress } from '@mui/material';

export interface UiMaterialAdminGalleryProps {
  loading?: boolean;
  images?: Image[];
  onChangeImageOrder?: (image: Image, order: number) => Promise<void>;
  onRemoveImage?: (image: Image) => void;
}

export function UiMaterialAdminGallery({ loading, images = [], onRemoveImage, onChangeImageOrder }: UiMaterialAdminGalleryProps) {
  const sortedImages = useMemo(() => {
    return sortArray(images, 'order');
  }, [images]);

  function handleRemoveImage(image: Image) {
    onRemoveImage?.(image);
  }

  async function handleDragEnd(fromIndex: number, endIndex: number) {
    const newImages = changeArrayElementPosition(images, fromIndex, endIndex);
    for (const [index, image] of newImages.entries()) {
      const newOrder = index + 1;
      if (image.order !== newOrder) onChangeImageOrder?.(image, newOrder);
    }
  }

  return (
    <UiMaterialCardOutlined className={classes['shared-galery']} label={'Slider Images'} style={{ marginBottom: '20px' }}>
      <UiHelpersDragAndDrop onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {sortedImages.map((img) => (
            <div className={'DragElement'} key={img.id} style={{ width: '140.5px', padding: '5px', aspectRatio: '16/9' }}>
              <div className={classes['shared-galery__hover-zone']} style={{ height: '100%' }}>
                <div className={classes['shared-galery__overlay']}>
                  <DragIndicatorIcon style={{ zIndex: 2, transform: 'rotateZ(90deg)' }} className={'dndHandle'} />
                  <UiMaterialButton onClick={() => handleRemoveImage(img)} btnType={'Icon'}>
                    <DeleteForeverIcon style={{ fontSize: '30px' }} />
                  </UiMaterialButton>
                </div>
                <div style={{ height: '100%', width: '100%', backgroundImage: `url(${makeImageUrl(img.url)})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
              </div>
            </div>
          ))}
        </div>
      </UiHelpersDragAndDrop>
      <UiHelpersIf If={loading}>
        <UiMaterialGridItem item xs={3} style={{ height: '150px' }}>
          <CircularProgress style={{ marginTop: '30px' }} />
        </UiMaterialGridItem>
      </UiHelpersIf>
    </UiMaterialCardOutlined>
  );
}
