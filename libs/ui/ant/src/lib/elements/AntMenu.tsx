import { ReactNode, Children } from 'react';
import { Menu, MenuProps } from 'antd';
import { findElementInArrayByValue } from '@digital-wolf/fns';

export interface AntMenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  to?: string;
  children?: Omit<AntMenuItem, 'children'>[];
}

export interface AntMenuProps extends Omit<MenuProps, 'onSelect'> {
  items?: AntMenuItem[];
  selectedKeys?: string[];
  onSelect?: (item?: AntMenuItem) => void;
}

export function AntMenu({ items, selectedKeys, onSelect, ...rest }: AntMenuProps) {
  function handleSelected(selectEvent: { key: string }) {
    const item = findElementInArrayByValue(items, 'key', selectEvent.key);
    onSelect?.(item);
  }

  return <Menu theme={'dark'} selectedKeys={selectedKeys} items={items} onSelect={handleSelected} {...rest} />;
}
