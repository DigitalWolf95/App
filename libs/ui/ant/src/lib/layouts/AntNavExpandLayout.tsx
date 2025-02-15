'use client';

import { useMemo, ReactNode, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, theme, Skeleton, MenuProps, Space } from 'antd';
import { AntIconButton } from '../elements/AntIconButton';
import { AntMenu, AntMenuItem } from '../elements/AntMenu';
import { useScreenSize } from '@digital-wolf/hooks';
import { AntMobileMenu } from '../components/AntMobileMenu';
import { ReactNamedNode } from '@digital-wolf/types';
import { useNamedChildren } from '@digital-wolf/ui-helpers';

export type AntNavExpandLayoutChildren = 'Header';

export interface AntNavExpandLayoutProps {
  children?: ReactNamedNode<AntNavExpandLayoutChildren>;
  collapsed?: boolean;
  noHeader?: boolean;
  noCollapse?: boolean;
  menuProps?: MenuProps;
  selectedMenuKeys?: string[];
  items: AntMenuItem[];
  mobileItems?: AntMenuItem[];
  onSelectedItem?: (item?: AntMenuItem) => void;
  onChangeCollapsed?: (value: boolean) => void;
}

const { Header, Sider, Content } = Layout;
const { Avatar, Input } = Skeleton;

export function AntNavExpandLayout({
  children,
  collapsed,
  items,
  mobileItems = items,
  noHeader,
  noCollapse,
  selectedMenuKeys,
  menuProps = {},
  onChangeCollapsed,
  onSelectedItem,
}: AntNavExpandLayoutProps) {
  const {Header: HeaderChild, Default} = useNamedChildren(children);
  const [value, setValue] = useState(false);
  const { token } = theme.useToken();
  const { colorBgContainer, borderRadiusLG } = token;
  const { isSmAndUp, isXs } = useScreenSize();

  const isCollapsed = useMemo<boolean>(() => {
    if (typeof collapsed === 'boolean') return collapsed;
    return value;
  }, [collapsed, value]);

  const contentStyle = useMemo(
    () => ({
      margin: isSmAndUp ? '24px 16px' : '24px 5px',
      minHeight: 280,
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
    }),
    [colorBgContainer, borderRadiusLG, isSmAndUp]
  );

  const ToggleIcon = useMemo(() => {
    return isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;
  }, [isCollapsed]);

  function handleChangeCollapse() {
    setValue(!isCollapsed);
    onChangeCollapsed?.(!isCollapsed);
  }

  return (
    <Layout style={{ height: '100%' }} hasSider>
      {isSmAndUp && (
        <Sider breakpoint={'lg'} trigger={null} collapsible collapsed={isCollapsed}>
          <Space>
            <Avatar style={{ margin: '10px', marginLeft: isCollapsed ? '20px' : '10px' }} size={'large'} />
            {!isCollapsed && <Input style={{ minWidth: '115px', width: '115px' }} size={'large'} />}
          </Space>
          <AntMenu menuProps={menuProps} selectedKeys={selectedMenuKeys} onSelect={onSelectedItem} items={items} />
        </Sider>
      )}
      <Layout>
        {!noHeader && (
          <Header style={{ padding: 0, background: colorBgContainer, borderBottom: '1px solid white' }}>
            {!noCollapse && isSmAndUp && <AntIconButton icon={ToggleIcon} onClick={handleChangeCollapse} />}
            {HeaderChild}
          </Header>
        )}
        <Content style={contentStyle}>{Default}</Content>
      </Layout>

      {isXs && <AntMobileMenu items={mobileItems}/>}
    </Layout>
  );
}
