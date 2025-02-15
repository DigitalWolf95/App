import { ReactNode } from 'react';
import { Menu, MenuProps } from 'antd';
import { findElementInArrayByValue } from '@digital-wolf/fns';

export interface AntMenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  to?: string;
}

export interface AntMenuProps {
  items?: AntMenuItem[];
  menuProps?: MenuProps;
  selectedKeys?: string[];
  onSelect?: (item?: AntMenuItem) => void;
}

export function AntMenu({ items, menuProps, selectedKeys, onSelect }: AntMenuProps) {
  function handleSelected(selectEvent: { key: string }) {
    const item = findElementInArrayByValue(items, 'key', selectEvent.key);
    onSelect?.(item);
  }

  return <Menu theme={'dark'} selectedKeys={selectedKeys} items={items} onSelect={handleSelected} {...menuProps} />;
}
