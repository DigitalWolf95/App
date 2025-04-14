import { HomePageContainer } from '../../../containers/HomePageContainer';
import { useConcurrentlyAwait } from '@digital-wolf/hooks';
import { fetchSliderImages } from '../../../api/homeApi';
import { fetchArticles } from '../../../api/articleApi';

export default async function HomePage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [sliderImages, articles] = await useConcurrentlyAwait(fetchSliderImages, fetchArticles);

  return <HomePageContainer sliderImages={sliderImages?.sliderImages} articles={articles?.articles} />;
}
