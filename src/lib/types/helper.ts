import type {
  ComponentPropsWithoutRef,
  HTMLAttributes,
  PropsWithChildren
} from 'react';
import type { Content } from './contents';

export type ValidTag = keyof React.JSX.IntrinsicElements;

export type CustomTag<T extends ValidTag> = PropsWithChildren<
  {
    tag?: T | ValidTag;
  } & (ComponentPropsWithoutRef<T> & HTMLAttributes<HTMLOrSVGElement>)
>;

export type APIResponse<T = unknown> = T | { message: string };

export type PropsForViews<T = unknown> = T &
  Pick<Content, 'slug'> & {
    increment?: boolean;
  };
