import { AdminHomeSliderContainer } from '../../../containers/admin/AdminHomeSliderContainer';
import { fetchSliderImages } from '../../../api/homeApi';

export const revalidate = 0;

export default async function AdminHomeSliderPage() {
  const slider = await fetchSliderImages();

  return <AdminHomeSliderContainer sliderImages={slider.sliderImages} />;
}
