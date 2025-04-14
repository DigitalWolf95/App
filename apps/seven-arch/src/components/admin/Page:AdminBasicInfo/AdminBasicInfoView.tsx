import { ChangeEvent, useEffect, useState } from 'react';
import { GenericLoadingFlags, Image } from '@digital-wolf/types';
import {
  UiMaterialButton,
  UiMaterialForm,
  UiMaterialGridItem,
  UiMaterialTextField,
  UiMaterialTextHeading,
  UiMaterialUploadImage,
} from '@digital-wolf/ui-material';
import { BasicInfoFormSubmit, BasicInfoFormDataState, BasicInfoFormImagesState } from '../../../models/basicInfoModels';

export interface AdminBasicInfoViewProps {
  readonly loadingFlags: GenericLoadingFlags;
  readonly onSubmit: (payload: BasicInfoFormSubmit) => void;
  readonly data: {
    companyName?: string;
  };
  readonly images: {
    readonly loadingScreenImage?: Image | null;
  };
}

const initFields: BasicInfoFormDataState = { companyName: '' };

export function AdminBasicInfoView({ onSubmit, data, images, loadingFlags }: AdminBasicInfoViewProps) {
  const [fields, setFields] = useState<BasicInfoFormDataState>(initFields);
  const [imagesState, setImagesState] = useState<BasicInfoFormImagesState>({});

  useEffect(() => {
    if (data) {
      setFields((oldFields) => ({ ...oldFields, companyName: data?.companyName ?? '' }));
    }
  }, [data]);

  function handleDataChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setFields((oldFields) => ({ ...oldFields, [name]: value }));
  }

  function handleSubmit() {
    onSubmit({ images: imagesState, data: fields });
  }

  return (
    <UiMaterialForm containerProps={{width: '100%'}} isLoading={loadingFlags.init} onSubmit={handleSubmit}>
      <UiMaterialGridItem centerText paddingLeft={0}>
        <UiMaterialTextHeading level={4}> Basic Info </UiMaterialTextHeading>
      </UiMaterialGridItem>

      <UiMaterialGridItem paddingLeft={0}>
        <UiMaterialTextField required name={'companyName'} label={'Company Name'} value={fields.companyName} onChange={handleDataChange} />
      </UiMaterialGridItem>
     
     <UiMaterialGridItem paddingLeft={0}>
     <UiMaterialUploadImage
        useExternalLink={true}
        label={'Splash Screen Image'}
        name={'loadingScreenImage'}
        isInitialExternalLink={images.loadingScreenImage?.type === 'externalImage'}
        setState={setImagesState}
        state={imagesState}
        src={images.loadingScreenImage?.url}
      />
     </UiMaterialGridItem>
      
      <UiMaterialGridItem paddingLeft={0}>
        <UiMaterialButton fullWidth btnType={'LoadingButton'} loading={loadingFlags.submit} type={'submit'}>
          Save
        </UiMaterialButton>
      </UiMaterialGridItem>
    </UiMaterialForm>
  );
}
