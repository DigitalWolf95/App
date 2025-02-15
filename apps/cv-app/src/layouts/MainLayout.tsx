'use client';

import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { LayoutProps } from '../models/LayoutModels';
import { AntMenuItem, AntNavExpandLayout, AntNavExpandLayoutChildren } from '@digital-wolf/ant';
import { ItemType } from 'antd/es/menu/interface';
import { UiHelpersNamedChild } from '@digital-wolf/ui-helpers';

const items: AntMenuItem[] = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Under',
    to: 'dadwa',
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'The',
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'Development',
  },
];

export function MainLayout({ children }: LayoutProps) {
  function handleSelectedItem(item?: ItemType) {
    console.log(item);
  }

  return (
    <AntNavExpandLayout items={items} onSelectedItem={handleSelectedItem}>
      <UiHelpersNamedChild<AntNavExpandLayoutChildren>>
        {children}
      </UiHelpersNamedChild>
    </AntNavExpandLayout>
  );
}
