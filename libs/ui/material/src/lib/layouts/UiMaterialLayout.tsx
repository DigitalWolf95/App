import styles from './UiMaterialLayout.module.scss';
import { useNamedChildren } from '@digital-wolf/ui-helpers';
import { ReactNamedNode } from '@digital-wolf/types';
import { Breakpoint, Container } from '@mui/material';

export type UiMaterialLayoutChildren = 'AppBar' | 'Footer';

export interface UiMaterialLayoutProps {
  maxMainWidth?: Breakpoint;
  children?: ReactNamedNode<UiMaterialLayoutChildren>;
}

export function UiMaterialLayout({ children, maxMainWidth = 'sm' }: UiMaterialLayoutProps) {
  const { AppBar, Footer, Default } = useNamedChildren(children);

  return (
    <div className={styles.UiMaterialLayout}>
      {AppBar}
      <Container component={'main'} className={styles.UiMaterialLayout__main} maxWidth={maxMainWidth}>
        {Default}
      </Container>
      {Footer}
    </div>
  );
}

export default UiMaterialLayout;
