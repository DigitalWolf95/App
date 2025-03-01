'use client';

import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { LayoutProps } from '../models/LayoutModels';
import { AntFlex, AntMenuItem, AntNavExpandLayout, AntNavExpandLayoutChildren, AntText } from '@digital-wolf/ant';
import { ItemType } from 'antd/es/menu/interface';
import { UiHelpersNamedChild } from '@digital-wolf/ui-helpers';
import { Avatar } from 'antd';

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
    <AntNavExpandLayout items={items} onSelectedItem={handleSelectedItem} transparent>
      <UiHelpersNamedChild<AntNavExpandLayoutChildren>>{children}</UiHelpersNamedChild>
      <UiHelpersNamedChild<AntNavExpandLayoutChildren> name={'Header'}>
        <AntText className={'!text-xl'}>Digital Wolf | Frontend Architect</AntText>
      </UiHelpersNamedChild>
      <UiHelpersNamedChild<AntNavExpandLayoutChildren> name={'Avatar'}>
        <AntFlex className={'!p-4'} centerX centerY>
          <Avatar className={'!p-0'} src={'/digital-wolf.webp'} size={'large'} alt={'Avatar'} />
        </AntFlex>
      </UiHelpersNamedChild>
    </AntNavExpandLayout>
  );
}
