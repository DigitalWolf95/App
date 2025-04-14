import styles from './UiMaterialFooter.module.scss';
import { UiMaterialGridContainer } from '../../elements/ui-material-grid-container/UiMaterialGridContainer';
import { UiMaterialGridItem } from '../../elements/ui-material-grid-item/UiMaterialGridItem';
import { ReactNamedNode } from '@digital-wolf/types';
import { useNamedChildren } from '@digital-wolf/ui-helpers';
import { Divider as MuiDivider, DividerProps, RegularBreakpoints } from '@mui/material';

export type UiMaterialFooterChildren = 'FirstQuadrant' | 'SecondQuadrant' | 'ThirdQuadrant' | 'FourthQuadrant' | 'Divider';

/* eslint-disable-next-line */
interface UiMaterialFooterProps {
  children?: ReactNamedNode<UiMaterialFooterChildren>;
  noDivider?: boolean;
  dividerProps?: DividerProps;
  breakpoints?: RegularBreakpoints;
}

export function UiMaterialFooter({ children, noDivider, dividerProps, breakpoints = { xs: 12, sm: 6 } }: UiMaterialFooterProps) {
  const { FirstQuadrant, SecondQuadrant, ThirdQuadrant, FourthQuadrant, Divider } = useNamedChildren(children);

  return (
    <footer className={styles.UiMaterialFooter}>
      <UiMaterialGridContainer centerX={false} style={{ paddingBottom: '50px' }}>
        <UiMaterialGridItem xs={12}>
          {!Divider && !noDivider && <MuiDivider {...dividerProps} />}
          {Divider}
        </UiMaterialGridItem>

        <UiMaterialGridItem style={{maxWidth: '100%'}} {...breakpoints}>{SecondQuadrant}</UiMaterialGridItem>

        <UiMaterialGridItem style={{maxWidth: '100%'}} {...breakpoints}>{FirstQuadrant}</UiMaterialGridItem>

        <UiMaterialGridItem style={{maxWidth: '100%'}} {...breakpoints}>{FourthQuadrant}</UiMaterialGridItem>

        <UiMaterialGridItem style={{maxWidth: '100%'}} {...breakpoints}>{ThirdQuadrant}</UiMaterialGridItem>
      </UiMaterialGridContainer>
    </footer>
  );
}
