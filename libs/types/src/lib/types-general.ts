import { ReactNode, HTMLProps, ComponentType } from 'react';

// Generic Payload need to be type of object that can receive any key and any value, but it must have key id of type string
//eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style, @typescript-eslint/consistent-type-definitions
export type GenericPayload = {
  [key: string]: any;
};

export interface GenericLoadingFlags {
  readonly init: boolean;
  readonly submit: boolean;
}

export type FalsyValue = null | undefined | 0 | '' | false;

export type ReactComponent<T = any> = ComponentType<T>;

export type Optional<T> = T | null | undefined;

export type ReactNamedNode<T extends string> = ReactNode & { name?: T | 'Default' };
export type DivProps = HTMLProps<HTMLDivElement>;
export type ImgProps = HTMLProps<HTMLImageElement>;
export type SpanProps = HTMLProps<HTMLSpanElement>;
export type AnchorProps = HTMLProps<HTMLAnchorElement>;

export type Payload<T> = T extends (payload: infer P) => void ? P : undefined;
