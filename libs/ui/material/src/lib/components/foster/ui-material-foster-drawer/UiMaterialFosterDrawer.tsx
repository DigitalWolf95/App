import Drawer from '@mui/material/Drawer';
import { useMediaQuery, useTheme } from '@mui/material';
import { MainDrawerDesktopList } from './UiMaterialFosterDrawerDeskropList';
import { UiMaterialFosterDrawerMobileList } from './UiMaterialFosterDrawerMobileList';
import styled from './UiMaterialFosterDrawer.module.scss';
import { ReactNamedNode } from '@digital-wolf/types';
import { UiHelpersIf, useNamedChildren } from '@digital-wolf/ui-helpers';

export type UiMaterialFosterDrawerChildren = 'BottomBar';

interface UiMaterialFosterDrawerProps {
  readonly children?: ReactNamedNode<UiMaterialFosterDrawerChildren>;
  readonly title: string;
  readonly value: boolean;
  readonly showSubList?: boolean;
  readonly items?: UiMaterialFosterDrawerItem[];
  readonly currentDrawerItem?: UiMaterialFosterDrawerItem;
  readonly onChange: (state: boolean) => void;
  readonly onMenuItemClick?: (item: UiMaterialFosterDrawerItem | UiMaterialFosterDrawerSubItem) => void;
}

interface UiMaterialFosterDrawerBaseItem {
  readonly id: number;
  readonly label: string;
  readonly to: string;
}

export interface UiMaterialFosterDrawerItem extends UiMaterialFosterDrawerBaseItem {
  readonly type: 'MainItem';
  readonly subItems?: UiMaterialFosterDrawerSubItem[];
}

export interface UiMaterialFosterDrawerSubItem extends UiMaterialFosterDrawerBaseItem {
  readonly type: 'SubItem';
  readonly label: string;
}

export function UiMaterialFosterDrawer({
  value,
  items,
  title,
  currentDrawerItem,
  showSubList = true,
  children,
  onChange,
  onMenuItemClick,
}: UiMaterialFosterDrawerProps) {
  const theme = useTheme();
  const isDesktopView = useMediaQuery(theme.breakpoints.up('sm'));
  const { BottomBar } = useNamedChildren(children);

  return (
    <Drawer className={styled.UiMaterialFosterDrawer} anchor={'right'} open={value} onClose={() => onChange(false)}>
      <UiHelpersIf If={isDesktopView}>
        <MainDrawerDesktopList
          title={title}
          items={items || []}
          showSubList={showSubList}
          currentItem={currentDrawerItem}
          onChange={onChange}
          onItemClick={onMenuItemClick}
        />
      </UiHelpersIf>

      <UiHelpersIf If={!isDesktopView}>
        <UiMaterialFosterDrawerMobileList title={title} showSubList={showSubList} onChange={onChange} items={items || []} />
      </UiHelpersIf>

      {BottomBar}
      {/*<SharedCardSocialNetworks*/}
      {/*  socialNetworks={socialNetworks}*/}
      {/*  containerProps={{ style: { marginLeft: '65px', marginBottom: '20px', marginTop: '50px' } }}*/}
      {/*  onClick={onSocialNetworkClick}*/}
      {/*/>*/}
    </Drawer>
  );
}
