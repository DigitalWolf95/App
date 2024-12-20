import classes from './UiFeaturesFosterArticle.module.scss';
import Slider, { Settings } from 'react-slick';
import { FosterArticle, FosterSubArticle } from '@digital-wolf/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  UiMaterialButton,
  UiMaterialCardDescription,
  UiMaterialCardInput,
  UiMaterialFade,
  UiMaterialFosterImage,
  UiMaterialGridContainer,
  UiMaterialGridItem,
  UiMaterialHidden,
  UiMaterialTextHeading,
} from '@digital-wolf/ui-material';
import { UiHelpersIf } from '@digital-wolf/ui-helpers';
import { ArrowBackIcon, ArrowForwardIcon } from '@digital-wolf/ui-icons';
import clsx from 'clsx';

export interface UiFeaturesFosterArticleProps<EntityKeys extends string> {
  readonly article: FosterArticle<EntityKeys>;
  readonly onArticleCLick?: (article: FosterArticle<EntityKeys>) => void;
  readonly onSubArticleClick?: (article: FosterSubArticle) => void;
  readonly onSubscribe?: (email: string) => void;
}

const settings: Settings = {
  lazyLoad: 'progressive',
  dots: false,
  infinite: true,
  speed: 500,
  adaptiveHeight: true,
  arrows: false,
  autoplay: false,
};

export function UiFeaturesFosterArticle<EntityKeys extends string>({
  article,
  onSubscribe,
  onArticleCLick,
  onSubArticleClick,
}: UiFeaturesFosterArticleProps<EntityKeys>) {
  const [isShown, setIsShown] = useState(false);
  const imageWidth = useMemo(() => {
    if (article && article.size == 'large' && !article.feature) return 12;
    return 8;
  }, [article]);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<Slider | null>(null);

  function handleGoNext() {
    sliderRef.current?.slickNext();
  }

  function handleGoPrev() {
    sliderRef.current?.slickPrev();
  }

  useEffect(() => {
    const targetRefCurrent = targetRef.current;
    if (!targetRefCurrent) return;
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsShown(true);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (targetRef.current) {
      observer.observe(targetRefCurrent);
    }

    return () => {
      if (targetRefCurrent) observer.unobserve(targetRefCurrent);
    };
  }, []);

  return (
    <UiHelpersIf If={!!article}>
      <div ref={targetRef} className={classes.sharedArticle}>
        <UiMaterialFade in={isShown} timeout={1000}>
          <div>
            <UiMaterialGridContainer spacing={2} centerX={false}>
              <UiMaterialGridItem xs={12}>
                <UiMaterialTextHeading className={classes.sharedArticle__heading} fontWeight={500} color={'white'} level={4}>
                  {article?.title || ''}
                </UiMaterialTextHeading>
              </UiMaterialGridItem>

              <UiMaterialHidden smDown>
                <UiMaterialGridItem xs={12} sm={6} md={imageWidth} xl={imageWidth < 12 ? 9 : 12} className={classes['sharedArticle__height']}>
                  <UiMaterialFosterImage url={article.image?.url} text={article?.content} onClick={() => onArticleCLick?.(article)} />
                </UiMaterialGridItem>

                <UiHelpersIf If={!!article?.feature && article.feature.type === 'newsTeller'}>
                  <UiMaterialGridItem xs={12} sm={6} md={4} xl={3} className={clsx(classes.sharedArticle__height)}>
                    <UiMaterialCardInput
                      containerProps={{ className: `u-overflow__auto` }}
                      text={article?.feature?.content || ''}
                      btnText={'Subscribe'}
                      align={article?.feature?.align}
                      fontSize={article.feature?.fontSize}
                      onSubscribe={onSubscribe}
                    />
                  </UiMaterialGridItem>
                </UiHelpersIf>
              </UiMaterialHidden>

              <UiMaterialHidden mdDown>
                <UiHelpersIf If={!!article?.feature && article.feature.type === 'description'}>
                  <UiMaterialGridItem xs={12} sm={6} md={4} xl={3} className={`${classes.sharedArticle__height} u-overflow__auto`}>
                    <UiMaterialCardDescription text={article?.feature?.content || ''} align={article?.feature?.align} fontSize={article.feature?.fontSize} />
                  </UiMaterialGridItem>
                </UiHelpersIf>
              </UiMaterialHidden>

              <UiMaterialHidden smDown>
                <UiHelpersIf If={!!article?.subArticles && article.subArticles.length > 0}>
                  {article?.subArticles?.map((subArticle) => (
                    <UiMaterialGridItem key={subArticle.id} xs={6} sm={6} md={4} xl={3} className={classes.sharedArticle__height}>
                      <UiMaterialFosterImage url={subArticle.image?.url} text={subArticle.content} onClick={() => onSubArticleClick?.(subArticle)} />
                    </UiMaterialGridItem>
                  ))}
                </UiHelpersIf>
              </UiMaterialHidden>

              <UiMaterialHidden smUp>
                <UiMaterialGridItem xs={12}>
                  <UiHelpersIf If={article.subArticles && article.subArticles.length > 0}>
                    <UiMaterialButton variant={'outlined'} className={classes.sharedArticle__sliderArrowNext} onClick={handleGoNext}>
                      <ArrowForwardIcon />
                    </UiMaterialButton>
                    <UiMaterialButton variant={'outlined'} className={classes.sharedArticle__sliderArrowPrev} onClick={handleGoPrev}>
                      <ArrowBackIcon />
                    </UiMaterialButton>
                  </UiHelpersIf>
                  <Slider ref={sliderRef} className={classes.sharedArticle__mobileSlider} {...settings}>
                    <UiMaterialFosterImage url={article.image?.url} text={article?.content} onClick={() => onArticleCLick?.(article)} />
                    {article?.subArticles?.map((subArticle) => (
                      <UiMaterialFosterImage
                        key={subArticle.id}
                        url={subArticle.image?.url}
                        text={subArticle.content}
                        onClick={() => onSubArticleClick?.(subArticle)}
                      />
                    ))}
                  </Slider>
                </UiMaterialGridItem>
              </UiMaterialHidden>
            </UiMaterialGridContainer>
          </div>
        </UiMaterialFade>
      </div>
    </UiHelpersIf>
  );
}
