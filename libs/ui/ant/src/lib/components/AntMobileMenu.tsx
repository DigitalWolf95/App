import { AntMenu, AntMenuItem } from '../elements/AntMenu';
import { Layout } from 'antd';

export interface AntMobileMenu {
  items: AntMenuItem[];
}

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
} as const;

const menuStyles = { flex: 1, justifyContent: 'center', alignItems: 'center', height: '60px' } as const;

export function AntMobileMenu({ items }: AntMobileMenu) {
  return (
    <footer style={footerStyle}>
      <AntMenu mode={'horizontal'} selectable={false} style={menuStyles} items={items} />
    </footer>
  );
}
