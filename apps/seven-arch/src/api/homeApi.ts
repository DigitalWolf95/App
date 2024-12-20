import { getAllImageLinks } from '@digital-wolf/firebase/image';
import { Image } from '@digital-wolf/types';

export async function fetchSliderImages(): Promise<DataSliderImages> {
  const sliderImages = await getAllImageLinks({ folder: 'sliderImages' });
  return { sliderImages };
}

export interface DataSliderImages {
  readonly sliderImages?: Image[] | null;
}
