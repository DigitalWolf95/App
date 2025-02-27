import { AntMenu, AntMenuItem } from '../elements/AntMenu';
import { Layout } from 'antd';
import { useMemo } from 'react';

export interface AntMobileMenu {
  items: AntMenuItem[];
  transparent?: boolean;
}

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
} as const;

export function AntMobileMenu({ items, transparent }: AntMobileMenu) {
  const menuStyles = useMemo(
    () => ({
      ...(transparent && { background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)' }),
      justifyContent: 'center',
      alignItems: 'center',
      height: '60px',
      flex: 1,
    }),
    [transparent]
  );

  return (
    <footer style={footerStyle}>
      <AntMenu mode={'horizontal'} selectable={false} style={menuStyles} items={items} />
    </footer>
  );
}
