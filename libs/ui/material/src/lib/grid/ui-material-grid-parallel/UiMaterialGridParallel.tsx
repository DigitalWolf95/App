import styles from './UiMaterialGridParallel.module.scss';
import Grid from '@mui/material/Grid';
import { ReactNamedNode } from '@digital-wolf/types';
import { useNamedChildren } from '@digital-wolf/ui-helpers';

export type UiMaterialGridParallelChildren = 'Left' | 'Right';

export interface UiMaterialGridParallelProps {
  children?: ReactNamedNode<UiMaterialGridParallelChildren>;
  centerX?: boolean;
  centerY?: boolean;
}

export function UiMaterialGridParallel({ children, centerX, centerY = true }: UiMaterialGridParallelProps) {
  const { Left, Right } = useNamedChildren(children);

  return (
    <Grid container alignItems={centerY ? 'center' : 'start'} className={styles.UiMaterialGridParallel}>
      <Grid item xs={12} sm={6} display={'flex'} justifyContent={centerX ? 'center' : 'start'}>
        {Left}
      </Grid>
      <Grid item xs={12} sm={6} display={'flex'} justifyContent={centerX ? 'center' : 'start'}>
        {Right}
      </Grid>
    </Grid>
  );
}

export default UiMaterialGridParallel;
