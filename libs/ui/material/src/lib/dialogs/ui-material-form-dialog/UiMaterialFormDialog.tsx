import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';
import styles from './UiMaterialFormDialog.module.scss';
import { useNamedChildren } from '@digital-wolf/ui-helpers';
import { ReactNamedNode } from '@digital-wolf/types';

export type UiMaterialFormDialogChildren = 'Actions' | 'Content';

export interface UiMaterialFormDialogProps {
  readonly open: boolean | undefined;
  readonly title: string;
  readonly onClose: () => void;
  readonly children?: ReactNamedNode<UiMaterialFormDialogChildren>;
}

export function UiMaterialFormDialog({ open, title, children, onClose }: UiMaterialFormDialogProps) {
  const { Content, Actions } = useNamedChildren(children);

  return (
    <Dialog
      className={styles.dialogAllowOverflow}
      open={Boolean(open)}
      onClose={onClose}
      maxWidth={'xs'}
      sx={{ overflow: 'visible' }}
      componentsProps={{}}
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      <DialogContent>{Content}</DialogContent>
      <Divider />
      <DialogActions className={'u-pa--3'}>{Actions}</DialogActions>
    </Dialog>
  );
}
