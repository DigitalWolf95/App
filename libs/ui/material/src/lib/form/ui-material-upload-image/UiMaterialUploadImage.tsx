'use client';

import { DragEvent, useEffect, useState, ChangeEvent, Dispatch, SetStateAction, useMemo, forwardRef, Ref, useImperativeHandle } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { UiMaterialCardOutlined } from '../../cards/ui-material-card-outlined/UiMaterialCardOutlined';
import { UiMaterialGridContainer } from '../../elements/ui-material-grid-container/UiMaterialGridContainer';
import { UiHelpersIf } from '@digital-wolf/ui-helpers';
import { UiMaterialGridSwitch } from '../ui-material-grid-switch/UiMaterialGridSwitch';
import { UiMaterialGridItem } from '../../elements/ui-material-grid-item/UiMaterialGridItem';
import { UiMaterialTextField } from '../ui-material-text-field/UiMaterialTextField';
import { UiMaterialButton } from '../../elements/ui-material-button/UiMaterialButton';
import { DeleteForeverIcon, ImageNotSupportedOutlinedIcon } from '@digital-wolf/ui-icons';
import { UiMaterialGridBreak } from '../../elements/ui-material-grid-break/UiMaterialGridBreak';
import { getFilePreviewURL } from '@digital-wolf/fns';
import { UiMaterialUploadFile } from '../ui-material-upload-file/UiMaterialUploadFile';
import classes from './UiMaterialUploadImage.module.scss';
import clsx from 'clsx';
import { ImageToStore, ImageToStoreList } from '@digital-wolf/types';

interface UiMaterialUploadImageProps<T extends ImageToStoreList> {
  state?: T;
  stateImage?: ImageToStore | null;
  label: string;
  name?: keyof T;
  src?: string | null;
  isInitialExternalLink?: boolean;
  useExternalLink?: boolean;
  setState?: Dispatch<SetStateAction<T>>;
  onSetState?: (image?: ImageToStore) => void;
}

export interface UiMaterialUploadImageRef {
  clear: () => void;
}

function UiMaterialUploadImageFnc<T extends ImageToStoreList>(
  { name, label, src, setState, state, stateImage, isInitialExternalLink, useExternalLink, onSetState }: UiMaterialUploadImageProps<T>,
  ref: Ref<{ clear: () => void }>
) {
  const [useExternalLinkState, setUseExternalLinkState] = useState<boolean>(!!isInitialExternalLink);
  const [image, setImage] = useState<string | undefined>(isInitialExternalLink && src ? src : undefined);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  useImperativeHandle<UiMaterialUploadImageRef, UiMaterialUploadImageRef>(ref, () => {
    return {
      clear() {
        setImage(undefined);
        setPreviewUrl(undefined);
      },
    };
  });

  useEffect(() => {
    async function getUrl() {
      const imgToStore = state?.[name as string] || stateImage;
      if (imgToStore?.type === 'file') {
        const res = await getFilePreviewURL(imgToStore.value);
        setPreviewUrl(res);
        return;
      }

      if (imgToStore?.type === 'url') {
        setPreviewUrl(imgToStore.value);
        return;
      }

      setPreviewUrl(image ?? src ?? undefined);
    }

    getUrl();
  }, [state, image, name, src, stateImage]);

  const externalLinkValue = useMemo(() => {
    const imgToSave = state?.[name as string] || stateImage;
    if (state && (imgToSave?.type === 'file' || imgToSave?.type === 'url')) return imgToSave?.value ?? '';
    return image ?? '';
  }, [state, image, name, stateImage]);

  function changeState(value: File | string | undefined) {
    let data: ImageToStore | undefined;

    if (!value) data = { type: 'remove' };

    if (useExternalLinkState && value) {
      data = { type: 'url', value: value as string };
    }

    if (!useExternalLinkState && value) {
      data = { type: 'file', value: value as File };
    }

    if (name) setState?.((oldState) => ({ ...oldState, [name as string]: data }));
    console.log(data);
    onSetState?.(data);
  }

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    if (useExternalLinkState) return;
    const file = e.dataTransfer?.files[0];
    setImage(await getFilePreviewURL(file));
    changeState(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleRemoveImage = () => {
    setPreviewUrl(undefined);
    setImage(undefined);
    changeState(undefined);
  };

  async function handleUploadImage(file: File, previewUrl?: string) {
    setImage(previewUrl);
    changeState(file);
  }

  function handleUseExternalLinkChange(value: boolean) {
    setUseExternalLinkState(value);
    handleRemoveImage();
    setImage(undefined);
  }

  function handleExternalLinkChange(e: ChangeEvent<HTMLInputElement>) {
    setImage(e.target.value);
    changeState(e.target.value);
  }

  return (
    <UiMaterialCardOutlined style={{ aspectRatio: '16/9', width: '100%', height: '100%', marginBottom: '20px' }} label={label}>
      <UiMaterialGridContainer centerX={false} spacing={0} mb={0}>
        <UiHelpersIf If={useExternalLink}>
          <UiMaterialGridSwitch
            gridItemProps={{ className: 'u-text--align-start u-ml--1 u-mb--3' }}
            label={'Use External Link'}
            value={useExternalLinkState}
            onChange={handleUseExternalLinkChange}
          />
        </UiHelpersIf>

        <UiHelpersIf If={useExternalLinkState}>
          <UiMaterialGridItem item xs={12}>
            <UiMaterialTextField label={'External URL'} required={false} value={externalLinkValue} onChange={handleExternalLinkChange} />
          </UiMaterialGridItem>
        </UiHelpersIf>

        <UiHelpersIf If={useExternalLink}>
          <UiMaterialGridItem className={'u-pb--5'} xs={12}>
            <Divider />
          </UiMaterialGridItem>
        </UiHelpersIf>

        <Grid item xs={12} style={{ position: 'relative' }}>
          <div className={classes.dropzone}>
            <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} style={{ aspectRatio: '16/9', width: '100%', height: '100%' }}>
              <Grid style={{ height: '100%' }} container alignContent={'center'}>
                <Grid style={{ height: previewUrl ? '100%' : 'auto' }} item xs={12}>
                  <UiHelpersIf If={previewUrl}>
                    <img src={previewUrl} alt="Uploaded" className={classes.image} />
                    <div className={clsx(classes.overlay, classes.overlayFull)}>
                      <UiMaterialButton onClick={handleRemoveImage} btnType={'Icon'}>
                        <DeleteForeverIcon style={{ fontSize: '30px' }} />
                      </UiMaterialButton>
                    </div>
                  </UiHelpersIf>

                  <UiHelpersIf If={useExternalLinkState && !externalLinkValue}>
                    <div className={clsx('u-center--x u-center--y u-flex--column u-full-height')}>
                      <ImageNotSupportedOutlinedIcon style={{ fontSize: '50px', color: 'gray' }} />
                      <UiMaterialGridBreak />
                      <Typography className={'u-mt--2'}>Please provide an external URL</Typography>
                    </div>
                  </UiHelpersIf>

                  <UiHelpersIf If={!previewUrl && !useExternalLinkState}>
                    <span>Drag and drop an image here</span>
                    <UiMaterialGridBreak />
                    <span>or</span>
                    <UiMaterialGridBreak />
                    <UiMaterialUploadFile onChange={handleUploadImage} />
                  </UiHelpersIf>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      </UiMaterialGridContainer>
    </UiMaterialCardOutlined>
  );
}

export const UiMaterialUploadImage = forwardRef(UiMaterialUploadImageFnc);
