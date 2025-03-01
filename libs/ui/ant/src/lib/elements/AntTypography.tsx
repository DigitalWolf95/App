'use client';

import { Typography } from 'antd';
import { ReactNode, ComponentProps } from 'react';

const { Title, Text } = Typography;

type TextProps = ComponentProps<typeof Text>;
type TitleProps = ComponentProps<typeof Title>;

interface AntTitleProps extends TitleProps {
  children?: ReactNode;
}

interface AntTextProps extends TextProps {
  children?: ReactNode;
}

export function AntTitle({ children, ...rest }: AntTitleProps) {
  return <Title {...rest}>{children}</Title>;
}

export function AntText({ children, ...rest }: AntTextProps) {
  return <Text {...rest}>{children}</Text>;
}
