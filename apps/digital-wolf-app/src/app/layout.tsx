import '../styles/global.scss';
import { BaseContainer } from '../containers/BaseContainer';
import { ReactNode } from 'react';
import { AntProvider } from '@digital-wolf/ant';
import { SystemContextProvider } from '../context/SystemContext';

export const metadata = {
  title: 'Digital-Wolf',
  description: 'Digital-Wolf Development Workspace',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AntProvider>
          <SystemContextProvider>
            <BaseContainer>{children}</BaseContainer>
          </SystemContextProvider>
        </AntProvider>
      </body>
    </html>
  );
}
