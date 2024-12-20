import { Button, IconButton, IconButtonProps, ButtonProps, Link } from '@mui/material';
import { LoadingButtonProps, default as LoadingButton } from '@mui/lab/LoadingButton';
import NextLink, { LinkProps } from 'next/link';
import { ReactNode } from 'react';
import { AnchorProps, DivProps } from '@digital-wolf/types';

interface UiMaterialButtonBase {
  children?: ReactNode;
  submit?: boolean;
}

export interface UiMaterialButtonIconProps extends IconButtonProps, UiMaterialButtonBase {
  btnType: 'Icon';
}

export interface UiMaterialButtonProps extends ButtonProps, UiMaterialButtonBase {
  btnType?: 'Button';
}

export interface UiMaterialButtonLoadingProps extends LoadingButtonProps, UiMaterialButtonBase {
  btnType: 'LoadingButton';
}

export interface UiMaterialButtonLinkProps extends LinkProps, UiMaterialButtonBase {
  btnType: 'Link';
  style?: DivProps['style'];
  target?: AnchorProps['target'];
  rel?: AnchorProps['rel'];
  color?: ButtonProps['color'];
  className?: ButtonProps['className'];
}

export function UiMaterialButton(props: UiMaterialButtonProps | UiMaterialButtonLoadingProps | UiMaterialButtonIconProps | UiMaterialButtonLinkProps) {
  const { children, submit, btnType = 'Button', ...rest } = props;

  const optionals: any = {
    ...(submit && { type: 'submit' }),
  };

  if (btnType === 'Icon') {
    return (
      <IconButton {...optionals} color="inherit" {...rest}>
        {children}
      </IconButton>
    );
  }

  if (btnType === 'Button') {
    return (
      <Button variant={'contained'} {...optionals} {...rest}>
        {children}
      </Button>
    );
  }

  if (btnType === 'LoadingButton') {
    return (
      <LoadingButton {...optionals} variant={'contained'} {...rest}>
        {children}
      </LoadingButton>
    );
  }

  if (btnType === 'Link') {
    return (
      <Link underline={'none'} href={'#'} component={NextLink} {...optionals} {...rest}>
        {children}
      </Link>
    );
  }
}
