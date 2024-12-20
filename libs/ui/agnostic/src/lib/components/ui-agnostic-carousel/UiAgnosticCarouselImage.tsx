import { Image } from '@digital-wolf/types';
import { UiMaterialFosterImage } from '@digital-wolf/ui-material';

export interface MainSliderImageProps {
  image: Image;
}

export function UiAgnosticCarouselImage({ image }: MainSliderImageProps) {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <UiMaterialFosterImage type={'div'} image={image} />
    </div>
  );
}
