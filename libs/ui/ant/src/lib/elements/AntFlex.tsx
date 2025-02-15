import { ReactNode, CSSProperties } from 'react';
import { Flex, FlexProps } from 'antd';
import clsx from 'clsx';

export interface AntFlexProps extends FlexProps {
  children: ReactNode;
  fullHeight?: boolean;
  center?: boolean;
  centerX?: boolean;
  centerY?: boolean;
}

export function AntFlex({ children, fullHeight, center, centerX, centerY, ...rest }: AntFlexProps) {

  const alignCenter: CSSProperties['alignItems'] = center || centerY ? 'center' : undefined;
  const justifyCenter: CSSProperties['justifyContent'] = center || centerX ? 'center' : undefined;


  return <Flex className={clsx({ 'h-full': fullHeight })} align={alignCenter} justify={justifyCenter} {...rest} >{children}</Flex>;
}
