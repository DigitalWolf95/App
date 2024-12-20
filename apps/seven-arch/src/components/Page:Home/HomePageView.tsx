import { UiAgnosticCarousel } from '@digital-wolf/ui-agnostic';
import { UiMaterialGridContainer, UiMaterialGridItem } from '@digital-wolf/ui-material';
import { Image } from '@digital-wolf/types';
import { Article, SubArticle } from '../../models/articleModels';
import { UiFeaturesFosterArticle } from '@digital-wolf/ui-features';

interface FeatureHomePageViewProps {
  images: Image[];
  articles: Article[];
  onSubscribe: (email: string) => Promise<void>;
  onArticleCLick?: (article: Article) => void;
  onSubArticleClick?: (article: SubArticle) => void;
}

export function HomePageView({ images, articles, onSubscribe, onArticleCLick, onSubArticleClick }: FeatureHomePageViewProps) {
  return (
    <>
      <div>
        <UiAgnosticCarousel images={images} />
      </div>
      <UiMaterialGridContainer mt={0} mb={3} pt={0}>
        <UiMaterialGridItem xs={12}>
          {(articles || []).map((article) => (
            <UiFeaturesFosterArticle
              key={article.id}
              article={article}
              onSubscribe={onSubscribe}
              onArticleCLick={onArticleCLick}
              onSubArticleClick={onSubArticleClick}
            />
          ))}
        </UiMaterialGridItem>
      </UiMaterialGridContainer>
    </>
  );
}
