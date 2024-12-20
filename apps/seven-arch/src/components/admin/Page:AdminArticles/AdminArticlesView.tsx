import { useEffect, useState } from 'react';
import { useArticleData } from '../../../hooks/useArticleData';
import { UiHelpersDragAndDrop } from '@digital-wolf/ui-helpers';
import { AdminArticleItem } from './AdminArticleItem';
import { AdminSharedForm } from '../../Shared/AdminSharedForm';

export interface AdminArticlesViewProps {
  readonly articles: ReturnType<typeof useArticleData>[];
  readonly isPageLoading?: boolean;
  readonly isSubmitLoading?: boolean;
  readonly onSubmit?: () => void;
}

export function AdminArticlesView({ articles, isPageLoading, isSubmitLoading, onSubmit }: AdminArticlesViewProps) {
  const [sortedArticles, setSortedArticles] = useState<ReturnType<typeof useArticleData>[]>([]);

  useEffect(() => {
    setSortedArticles(articles.sort((a, b) => (a?.order ?? 0) - (b.order ?? 0)));
  }, [articles]);

  function handleDragEnd(fromIndex: number, toIndex: number) {
    const sortedArticlesCopy = [...sortedArticles];
    const [removed] = sortedArticlesCopy.splice(fromIndex, 1);
    sortedArticlesCopy.splice(toIndex, 0, removed);
    sortedArticlesCopy.forEach((item, index) => item.handleChangTempOrder(++index));
    setSortedArticles(sortedArticlesCopy);
  }

  return (
    <AdminSharedForm
      title={'Articles'}
      formGrid={false}
      noArticle
      spacing={0}
      initialLoading={isPageLoading}
      onSubmit={onSubmit}
      isSubmitLoading={isSubmitLoading}
    >
      <div>
        <div style={{ height: 20 }} />
        <UiHelpersDragAndDrop onDragEnd={handleDragEnd}>
          {sortedArticles.map((articleData) => (
            <AdminArticleItem articleData={articleData} key={articleData.entity} entity={articleData.entity} />
          ))}
        </UiHelpersDragAndDrop>
      </div>
    </AdminSharedForm>
  );
}
