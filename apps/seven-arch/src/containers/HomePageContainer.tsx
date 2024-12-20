'use client';

import { DataSliderImages } from '../api/homeApi';
import { DataArticles } from '../api/articleApi';
import { useSystemContext } from '../context/SystemContext';
import { useContainerData, useLinks } from '@digital-wolf/hooks';
import { useEffect, useMemo } from 'react';
import { sortArray } from '@digital-wolf/fns';
import { filterActiveArticles } from '../utils/articleUtils';
import { Article, SubArticle } from '../models/articleModels';
import { HomePageView } from '../components/Page:Home/HomePageView';

export interface FeatureHomePageContainerProps extends DataSliderImages, DataArticles {}

export interface FeatureHomePageContainerState extends DataSliderImages, DataArticles {}

export function HomePageContainer({ sliderImages, articles }: FeatureHomePageContainerProps) {
  const { state } = useContainerData<FeatureHomePageContainerState>({ sliderImages, articles });
  const { setFullWidth, resetMainViewMaxWidthToDefault, setIsTransparentAppBar } = useSystemContext();
  const { openInternalLink, openExternalLink, isExternalLink } = useLinks();

  useEffect(() => {
    setFullWidth();
    setIsTransparentAppBar(true);
    return () => {
      resetMainViewMaxWidthToDefault();
      setIsTransparentAppBar(false);
    };
  }, []);

  const sortedSliderImages = useMemo(() => {
    return sortArray(state.sliderImages || [], 'order');
  }, [state.sliderImages]);

  const activeArticles = useMemo(() => {
    return filterActiveArticles(state.articles);
  }, [state.articles]);

  function handleArticleClick(article: Article | SubArticle) {
    if (isExternalLink(article.link)) {
      openExternalLink(article.link);
      return;
    }
    openInternalLink(article.link);
  }

  async function handleSubscribe(email: string) {
    console.log(email);
  }

  return (
    <HomePageView
      articles={activeArticles}
      images={sortedSliderImages}
      onSubscribe={handleSubscribe}
      onSubArticleClick={handleArticleClick}
      onArticleCLick={handleArticleClick}
    />
  );
}
