import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import clsx from 'clsx';
import { PointerEvent } from 'react';
import { UiHelpersIf } from '@digital-wolf/ui-helpers';
import { FaReply } from '@digital-wolf/ui-icons';
import { UiMaterialFosterDrawerItem, UiMaterialFosterDrawerSubItem } from './UiMaterialFosterDrawer';
import Link from 'next/link';

interface UiMaterialFosterDrawerDesktopListItemProps {
  readonly items: UiMaterialFosterDrawerItem[] | UiMaterialFosterDrawerSubItem[];
  readonly dense?: boolean;
  readonly mainItems?: boolean;
  readonly selectedItemId?: number;
  readonly onHover?: (item: UiMaterialFosterDrawerItem | UiMaterialFosterDrawerSubItem) => void;
  readonly onClick?: (e: PointerEvent, item: UiMaterialFosterDrawerItem | UiMaterialFosterDrawerSubItem) => void;
}

export function UiMaterialFosterDrawerDesktopListItem({
  items,
  dense,
  mainItems,
  selectedItemId,
  onHover,
  onClick,
}: UiMaterialFosterDrawerDesktopListItemProps) {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.label} disablePadding>
          <div style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
            <Link href={item.to} className={'link'}>
              <ListItemButton
                className={clsx({ desktopMenuItem: mainItems, desktopMenuSubItem: !mainItems })}
                selected={selectedItemId === item.id}
                dense={dense}
                onClick={(e) => onClick?.(e as unknown as PointerEvent, item)}
                onMouseEnter={() => onHover?.(item)}
              >
                <ListItemText>
                  <UiHelpersIf If={item.type === 'MainItem'}>
                    <Typography fontWeight={'bold'} variant={'h5'}>
                      {item.label}
                    </Typography>
                  </UiHelpersIf>

                  <UiHelpersIf If={item.type === 'SubItem'}>
                    <FaReply flip="horizontal" size="lg" />
                    <Typography ml={1} component={'span'}>
                      {item.label}
                    </Typography>
                  </UiHelpersIf>
                </ListItemText>
              </ListItemButton>
            </Link>
          </div>
        </ListItem>
      ))}
    </List>
  );
}
