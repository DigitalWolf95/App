'use client'

import { useState, PointerEvent } from 'react';
import { UiMaterialFosterDrawerDesktopListItem } from './UiMaterialFosterDrawerDesktopListItem';
import { Box, Grid, Typography } from '@mui/material';
import { UiMaterialFosterDrawerItem, UiMaterialFosterDrawerSubItem } from './UiMaterialFosterDrawer';
import { UiMaterialButton } from '../../../elements/ui-material-button/UiMaterialButton';
import { CloseIcon } from '@digital-wolf/ui-icons';
import { UiHelpersIf } from '@digital-wolf/ui-helpers';


interface UiMaterialFosterDrawerDesktopListProps {
  readonly items: UiMaterialFosterDrawerItem[];
  readonly showSubList: boolean;
  readonly title: string;
  readonly currentItem?: UiMaterialFosterDrawerItem;
  readonly onChange?: (event: boolean) => void;
  readonly onItemClick?: (item: UiMaterialFosterDrawerItem | UiMaterialFosterDrawerSubItem) => void;
}

export function MainDrawerDesktopList({ items, showSubList, currentItem, title, onChange, onItemClick }: UiMaterialFosterDrawerDesktopListProps) {
  const [hoveredItem, setHoveredItem] = useState<UiMaterialFosterDrawerItem>(currentItem ?? items[0]);

  function handleCloseDrawer() {
    onChange?.(false);
  }

  function handleHoverOnDrawerItem(item: UiMaterialFosterDrawerItem | UiMaterialFosterDrawerSubItem) {
    if (item.type === 'MainItem') setHoveredItem(item);
  }

  function handleMenuClick(e: PointerEvent, item: UiMaterialFosterDrawerItem | UiMaterialFosterDrawerSubItem) {
    if (e.nativeEvent.pointerType === 'touch' && item.type === 'MainItem') {
      if (!hoveredItem || hoveredItem.id !== item.id) {
        setHoveredItem(item);
        return;
      }
    }
    onItemClick?.(item);
    onChange?.(false);
  }

  return (
    <Box className={'u-flex--auto-height'} sx={{ width: showSubList ? 600 : 250, paddingTop: '80px' }} role="presentation">
      <UiMaterialButton className={'closeBtn'} btnType={'Icon'} onClick={handleCloseDrawer}>
        <CloseIcon />
      </UiMaterialButton>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid style={{ paddingLeft: '70px' }} item xs={showSubList ? 6 : 12}>
          <Typography variant={'h6'} style={{ marginLeft: '18px', marginTop: '12px' }}>
            {title}
          </Typography>
          <UiMaterialFosterDrawerDesktopListItem
            mainItems={true}
            selectedItemId={hoveredItem.id}
            items={items ?? []}
            onHover={handleHoverOnDrawerItem}
            onClick={handleMenuClick}
          />
        </Grid>

        <UiHelpersIf If={showSubList}>
          <Grid style={{ paddingLeft: 0 }} item xs={6}>
            <Typography variant={'h6'} style={{ marginLeft: '18px', marginTop: '12px' }}>
              {hoveredItem.label}
            </Typography>
            <UiMaterialFosterDrawerDesktopListItem dense items={hoveredItem.subItems || []} onClick={handleMenuClick} />
          </Grid>
        </UiHelpersIf>
      </Grid>
    </Box>
  );
}
