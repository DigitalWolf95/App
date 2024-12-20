import { entities, documents, folders } from '../constants/entitiesAndFoldersNames';

type FoldersKeys = keyof typeof folders;
export type FolderKeys = (typeof folders)[FoldersKeys];

type DocumentsKeys = keyof typeof documents;
export type DocumentKeys = (typeof documents)[DocumentsKeys];

type EntitiesKeys = keyof typeof entities;
export type EntityKeys = (typeof entities)[EntitiesKeys];
