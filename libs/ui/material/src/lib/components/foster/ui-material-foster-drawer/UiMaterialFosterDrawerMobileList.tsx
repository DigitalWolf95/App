import { Box, Grid, Typography } from '@mui/material';
import { UiMaterialFosterDrawerMobileListItem } from './UiMaterialFosterDrawerMobileListItem';
import { UiMaterialFosterDrawerItem } from './UiMaterialFosterDrawer';

interface UiMaterialFosterDrawerMobileListProps {
  readonly items: UiMaterialFosterDrawerItem[];
  readonly onChange: (event: boolean) => void;
  readonly title: string;
  readonly showSubList?: boolean;
}

export function UiMaterialFosterDrawerMobileList({ items, onChange, showSubList, title }: UiMaterialFosterDrawerMobileListProps) {
  const handlers = {
    onClick: () => onChange(false),
    onKeyDown: () => onChange(false),
  };

  return (
    <Box sx={{ width: 250 }} role="presentation" {...handlers}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={12}>
          <Typography sx={{ pl: '15px' }} variant={'h6'}>
            {title}
          </Typography>
          <UiMaterialFosterDrawerMobileListItem showSubList={showSubList} items={items ?? []} />
        </Grid>
      </Grid>
    </Box>
  );
}
