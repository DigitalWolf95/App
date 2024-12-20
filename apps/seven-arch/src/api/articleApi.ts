import { Article, ArticleFeature, SubArticle } from '../models/articleModels';
import { EntityKeys } from '../models/firebaseBaseModels';
import { getEntities, getEntityById, storeEntity, updateEntityById } from '@digital-wolf/firebase/entity';
import { ImageToStore } from '@digital-wolf/types';
import { storeImageApi } from './imageApi';

export async function fetchArticles(): Promise<DataArticles> {
  const articles = await getEntities<Article>('articles');
  return { articles };
}

export async function fetchArticleByEntity(entity: EntityKeys): Promise<Article> {
  const id = `article-${entity}`;
  return await getEntityById<Article>('articles', id);
}

export async function saveArticleApi(payload: SaveArticlePayload): Promise<Article> {
  const { image, subArticles, ...dataPayload } = payload;
  const id = `article-${payload.entity}`;
  const storedImage = await storeImageApi(payload.image);

  return await storeEntity<Article>({
    entity: 'articles',
    payload: { ...dataPayload, ...(storedImage && { image: storedImage }), subArticles: await prepareSubarticles(subArticles) },
    id,
  });
}

export async function updateArticleApi(payload: UpdateArticlePayload): Promise<Article> {
  const { image, subArticles, ...dataPayload } = payload;
  const storedImage = await storeImageApi(image);

  return await updateEntityById<Article>({
    entity: 'articles',
    payload: { ...dataPayload, ...(storedImage && { image: storedImage }), subArticles: await prepareSubarticles(subArticles) },
    id: payload.id,
  });
}

async function prepareSubarticles(subArticles?: SaveSubArticlePayload[]): Promise<SubArticle[] | undefined> {
  if (!subArticles) return;
  return (await Promise.all(
    subArticles.map(async (subArticle) => {
      return { ...subArticle, image: (await storeImageApi(subArticle.image)) ?? null };
    })
  )) as SubArticle[];
}

export interface DataArticles {
  readonly articles?: Article[];
}

export interface SaveArticlePayload {
  readonly title?: string;
  readonly image?: ImageToStore | null;
  readonly content: string;
  readonly feature: ArticleFeature | null;
  readonly subArticles?: SaveSubArticlePayload[];
  readonly size: 'small' | 'large';
  readonly link: string;
  readonly state: boolean;
  readonly entity: EntityKeys;
}

export interface UpdateArticlePayload extends SaveArticlePayload {
  readonly id: string;
}

export interface SaveSubArticlePayload {
  readonly id?: string;
  readonly content?: string;
  readonly image?: ImageToStore | null | undefined;
  readonly state?: boolean;
  readonly link?: string;
}
