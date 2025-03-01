'use client';

import styles from './AntNavExpandLayout.module.scss';
import { useMemo, useState, HTMLProps } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, theme, MenuProps, LayoutProps } from 'antd';
import { AntIconButton } from '../../elements/AntIconButton';
import { AntMenu, AntMenuItem } from '../../elements/AntMenu';
import { useScreenSize } from '@digital-wolf/hooks';
import { AntMobileMenu } from '../../components/AntMobileMenu';
import { ReactNamedNode } from '@digital-wolf/types';
import { useNamedChildren } from '@digital-wolf/ui-helpers';

export type AntNavExpandLayoutChildren = 'Header' | 'Avatar';

export interface AntNavExpandLayoutProps {
  children?: ReactNamedNode<AntNavExpandLayoutChildren>;
  collapsed?: boolean;
  noHeader?: boolean;
  noCollapse?: boolean;
  menuProps?: MenuProps;
  headerProps?: HTMLProps<HTMLDivElement>;
  mainLayoutProps?: LayoutProps;
  contentLayoutProps?: LayoutProps;
  selectedMenuKeys?: string[];
  items: AntMenuItem[];
  mobileItems?: AntMenuItem[];
  transparent?: boolean;
  onSelectedItem?: (item?: AntMenuItem) => void;
  onChangeCollapsed?: (value: boolean) => void;
}

const { Header, Sider, Content } = Layout;

export function AntNavExpandLayout({
  children,
  collapsed,
  items,
  mobileItems = items,
  noHeader,
  noCollapse,
  selectedMenuKeys,
  menuProps = {},
  headerProps = {},
  mainLayoutProps,
  contentLayoutProps,
  transparent,
  onChangeCollapsed,
  onSelectedItem,
}: AntNavExpandLayoutProps) {
  const { Header: HeaderChild, Default, Avatar: AvatarChild } = useNamedChildren(children);
  const [value, setValue] = useState(true);
  const { token } = theme.useToken();
  const { colorBgContainer, borderRadiusLG } = token;
  const { isSmAndUp, isXs } = useScreenSize();

  const isCollapsed = useMemo<boolean>(() => {
    if (typeof collapsed === 'boolean') return collapsed;
    return value;
  }, [collapsed, value]);

  const contentStyle = useMemo(
    () => ({
      background: transparent ? 'transparent' : colorBgContainer,
      borderRadius: transparent ? 0 : borderRadiusLG,
    }),
    [colorBgContainer, borderRadiusLG, isSmAndUp, transparent]
  );

  const sliderStyles = useMemo(
    () => ({
      ...(transparent && { background: 'linear-gradient(260deg, rgba(0,0,0,0) 64%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%)' }),
    }),
    [transparent]
  );

  const headerStyles = useMemo(
    () => ({
      background: transparent
        ? 'linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 54%, rgba(0,0,0,1) 100%)'
        : colorBgContainer,
    }),
    [transparent, colorBgContainer]
  );

  const layoutStyles = useMemo(
    () => ({
      ...(transparent && { backgroundImage: 'url("/brick-wall.webp")' }),
    }),
    []
  );

  const menuStyles = useMemo(
    () => ({
      ...(transparent && { backgroundColor: 'transparent' }),
    }),
    []
  );

  const ToggleIcon = useMemo(() => {
    return isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;
  }, [isCollapsed]);

  function handleChangeCollapse() {
    setValue(!isCollapsed);
    onChangeCollapsed?.(!isCollapsed);
  }

  return (
    <Layout className={styles.AntNavExpandLayout} style={layoutStyles} hasSider {...mainLayoutProps}>
      {isSmAndUp && (
        <Sider style={sliderStyles} trigger={null} collapsible collapsed={isCollapsed}>
          {AvatarChild}
          <AntMenu
            style={menuStyles}
            {...menuProps}
            selectedKeys={selectedMenuKeys}
            onSelect={onSelectedItem}
            items={items}></AntMenu>
        </Sider>
      )}
      <Layout style={{ backgroundColor: 'transparent' }} {...contentLayoutProps}>
        {!noHeader && (
          <Header className={styles.header} style={headerStyles} {...headerProps}>
            {!noCollapse && isSmAndUp && <AntIconButton icon={ToggleIcon} onClick={handleChangeCollapse} />}
            {HeaderChild}
          </Header>
        )}
        <Content className={styles.content} style={contentStyle}>
          {Default}
        </Content>
      </Layout>

      {isXs && <AntMobileMenu transparent={transparent} items={mobileItems} />}
    </Layout>
  );
}
