import { ThemeConfig } from 'antd';

export function getAntDefaultTheme(): ThemeConfig {
  return {
    token: {
      colorPrimary: '#FF0000', // YouTube's red for primary elements
      colorBgBase: '#FFFFFF', // Background
      colorTextBase: '#0F0F0F', // Dark text
      colorBorder: '#D3D3D3', // Light gray borders
    },
    components: {
      Button: {
        colorPrimary: '#FF0000',
        colorPrimaryHover: '#E60000',
        colorPrimaryActive: '#CC0000',
      },
      Layout: {
        headerBg: '#FFFFFF',
        bodyBg: '#F9F9F9',
      },
      Card: {
        colorBgContainer: '#FFFFFF',
        borderRadiusLG: 8,
      },
    },
  };
}
