'use client';

import { Typography } from 'antd';
import { ReactNode } from 'react';

const { Title } = Typography;

interface AntTitleProps {
  children?: ReactNode;
}

export function AntTitle({ children }: AntTitleProps) {
  return <Title>{children}</Title>;
}
