import { Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Fragment } from 'react';
import Link from 'next/link';
import { UiMaterialFosterDrawerItem } from './UiMaterialFosterDrawer';
import { UiHelpersIf } from '@digital-wolf/ui-helpers';

interface UiMaterialFosterDrawerItemListProps {
  readonly showSubList?: boolean;
  readonly items: UiMaterialFosterDrawerItem[];
  readonly dense?: boolean;
  readonly subItem?: boolean;
}

export function UiMaterialFosterDrawerMobileListItem({ items, dense, showSubList }: UiMaterialFosterDrawerItemListProps) {
  return (
    <List sx={{ pt: 0 }}>
      {items.map(({ label, subItems, to }, index) => (
        <Fragment key={`${label} - fragment`}>
          <ListItem key={label} disablePadding>
            <Link className={'link'} style={{ width: '100%' }} href={to}>
              <ListItemButton dense={dense}>
                <ListItemText>{label}</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>

          <UiHelpersIf If={showSubList}>
            {subItems?.map((subItem) => (
              <ListItem style={{ paddingLeft: 15 }} key={subItem.label} disablePadding>
                <Link className={'link'} href={subItem.to}>
                  <ListItemButton dense>
                    <ListItemText>{subItem.label}</ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
            <UiHelpersIf If={index < items.length - 1}>
              <Divider />
            </UiHelpersIf>
          </UiHelpersIf>
        </Fragment>
      ))}
    </List>
  );
}
