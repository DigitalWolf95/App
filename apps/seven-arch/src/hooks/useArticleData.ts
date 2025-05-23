import { useCallback, useEffect, useRef } from 'react';
import { fetchArticleByEntity, saveArticleApi, SaveArticlePayload, updateArticleApi, UpdateArticlePayload } from '../api/articleApi';
import { useContainerData } from '@digital-wolf/hooks';
import { Article, MainArticleSubmitPayload } from '../models/articleModels';
import { EntityKeys } from '../models/firebaseBaseModels';

export interface UseArticleDataProps {
  readonly entity: EntityKeys;
  readonly link: string;
  readonly options?: {
    readonly initialLoading?: boolean;
  };
}

export interface UseArticleDataState {
  isArticleLoading?: boolean;
  isArticleSubmitLoading?: boolean;
  hasArticleSubmitError?: boolean;
  articlePayload?: MainArticleSubmitPayload | null;
  order?: number;
  article?: Article;
}

export function useArticleData({ entity, link, options }: UseArticleDataProps) {
  const orderRef = useRef<number>(0);
  const { state, updateState } = useContainerData<UseArticleDataState>({
    isArticleLoading: options?.initialLoading ?? false,
  });

  useEffect(() => {
    async function fetchArticles() {
      try {
        updateState({ isArticleLoading: true });
        const article = await fetchArticleByEntity(entity);
        orderRef.current = article?.order ?? 0;
        updateState({ article, order: article?.order });
      } finally {
        updateState({ isArticleLoading: false });
      }
    }

    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSavePayload(payload: MainArticleSubmitPayload) {
    updateState({ articlePayload: payload });
  }

  async function saveArticle(payload: MainArticleSubmitPayload): Promise<Article> {
    const formattedPayload: SaveArticlePayload = {
      ...payload,
      link,
      entity,
    };
    console.log('save')
    const article = await saveArticleApi(formattedPayload);
    updateState({ article });
    return article;
  }

  async function updateArticle(payload: MainArticleSubmitPayload, id: string): Promise<Article> {
    const formattedPayload: UpdateArticlePayload = {
      id: id,
      ...payload,
      subArticles: payload.subArticles?.map(({image, ...rest}) => {
        return {...rest, image: image ?? state.article?.subArticles?.find((aSub) => aSub.id === rest.id)?.image}
      }),
      link,
      entity,
    } as UpdateArticlePayload;

    console.log('update', payload);

    const article = await updateArticleApi(formattedPayload);
    updateState({ article });
    return article;
  }

  const saveArticleMemo = useCallback(saveArticle, [entity, link, updateState]);
  const updateArticleMemo = useCallback(updateArticle, [entity, link, updateState]);

  async function handleSubmitArticle(payload: MainArticleSubmitPayload | null | undefined = state.articlePayload) {
    console.log('pat:', payload)
    if (!payload) return;
    try {
      updateState({ isArticleSubmitLoading: true });
      if (state.article) {
        await updateArticleMemo(payload, state.article.id);
        updateState({ articlePayload: null });
        return;
      }
      await saveArticleMemo(payload);
      updateState({ articlePayload: null });
    } catch (error) {
      updateState({ hasArticleSubmitError: true });
    } finally {
      updateState({ isArticleSubmitLoading: false });
    }
  }

  function handleChangTempOrder(order: number) {
    if (order === state.order) return;
    updateState({ order });
  }

  const handleSubmitArticleMemo = useCallback(handleSubmitArticle, [saveArticleMemo, state.article, state.articlePayload, updateArticleMemo, updateState]);
  const handleSavePayloadMemo = useCallback(handleSavePayload, [updateState]);
  const handleChangTempOrderMemo = useCallback(handleChangTempOrder, [updateState]);

  return {
    article: state.article,
    isArticleSubmitLoading: state.isArticleSubmitLoading,
    isArticleLoading: state.isArticleLoading,
    handleSubmitArticle: handleSubmitArticleMemo,
    handleSavePayload: handleSavePayloadMemo,
    handleChangTempOrder: handleChangTempOrderMemo,
    order: state.order,
    currentPayload: state.articlePayload,
    entity,
  };
}
