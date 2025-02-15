import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { getAntDarkTheme } from '../themes/ant-dark-theme';

export function AntProvider({ children }: { children: ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={getAntDarkTheme()}>{children}</ConfigProvider>
    </AntdRegistry>
  );
}
