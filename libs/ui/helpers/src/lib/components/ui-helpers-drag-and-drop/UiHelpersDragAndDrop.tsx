'use client';

import ReactDragListView from 'react-drag-listview';
import { ReactNode } from 'react';
import { DivProps } from '@digital-wolf/types';

export interface UiHelpersDragAndDropProps {
  onDragEnd: (fromIndex: number, toIndex: number) => void;
  children: ReactNode;
  nodeSelector?: string;
  handleSelector?: string;
  style?: DivProps['style'];
  className?: DivProps['className'];
}

export function UiHelpersDragAndDrop({
  onDragEnd,
  children,
  style,
  className,
  nodeSelector = 'div.DragElement',
  handleSelector = '.dndHandle',
}: UiHelpersDragAndDropProps) {
  const reactDragListViewProps = {
    nodeSelector,
    handleSelector,
    lineClassName: 'DragLine',
  } as any;

  return (
    <ReactDragListView className={className} style={style} onDragEnd={onDragEnd} {...reactDragListViewProps}>
      {children}
    </ReactDragListView>
  );
}
