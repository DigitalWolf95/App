import { Avatar, AvatarProps } from '@mui/material';
import { ReactNode } from 'react';

/* eslint-disable-next-line */
export interface UiMaterialAvatarProps extends AvatarProps {
  children: ReactNode;
}

export function UiMaterialAvatar({ children, ...rest }: UiMaterialAvatarProps) {
  return <Avatar {...rest}>{children}</Avatar>;
}
