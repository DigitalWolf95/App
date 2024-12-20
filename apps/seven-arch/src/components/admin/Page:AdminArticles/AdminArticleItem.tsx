import { EntityKeys } from '../../../models/firebaseBaseModels';
import { useArticleData } from '../../../hooks/useArticleData';
import { UiHelpersIf } from '@digital-wolf/ui-helpers';
import { capitalizeFirstLetter } from '@digital-wolf/fns';
import { AdminSharedArticle } from './AdminSharedArticle/AdminSharedArticle';

export interface FeatureAdminSharedArticlesItemProps {
  entity: EntityKeys;
  order?: number;
  articleData: ReturnType<typeof useArticleData>;
}

export function AdminArticleItem({ entity, articleData }: FeatureAdminSharedArticlesItemProps) {
  const { article, isArticleLoading, handleSavePayload, currentPayload, order } = articleData;

  return (
    <UiHelpersIf If={!isArticleLoading}>
      <AdminSharedArticle
        dragAndDrop={true}
        className={'u-mb--5'}
        key={article?.entity}
        article={article}
        previousPayload={currentPayload ?? undefined}
        order={order}
        isMainArticle={true}
        onSubmitArticle={handleSavePayload}
        label={
          <span>
            <strong>{capitalizeFirstLetter(entity)}</strong> Article Settings
          </span>
        }
        size={'small'}
      />
    </UiHelpersIf>
  );
}
