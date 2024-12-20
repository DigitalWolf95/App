import { Image } from '../../types-image';
import { TextAlignFeature } from '../TextAlign';
import { FontSizeFeature } from '../FontSize';

export interface FosterArticle<EntityKeys extends string> {
  readonly id: string;
  readonly title?: string;
  readonly image?: Image;
  readonly content: string;
  readonly feature: FosterArticleFeature;
  readonly subArticles?: FosterSubArticle[];
  readonly size: 'small' | 'large';
  readonly link: string;
  readonly state: boolean;
  readonly entity: EntityKeys;
  readonly order?: number;
}

export interface FosterSubArticle {
  readonly id: string;
  readonly content: string;
  readonly state: boolean;
  readonly image?: Image;
  readonly link: string;
}

export interface FosterArticleFeatureDescription {
  readonly type: 'description';
  readonly content: string;
  readonly align: TextAlignFeature;
  readonly fontSize: FontSizeFeature;
}

export interface FosterArticleFeatureNewsTeller {
  readonly type: 'newsTeller';
  readonly content: string;
  readonly align: TextAlignFeature;
  readonly fontSize: FontSizeFeature;
}

export type FosterArticleFeature = null | FosterArticleFeatureDescription | FosterArticleFeatureNewsTeller;
export type FosterArticleFeatureType = Exclude<FosterArticleFeature, null>['type'];
