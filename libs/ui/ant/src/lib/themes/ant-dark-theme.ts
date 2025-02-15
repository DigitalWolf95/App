import { ThemeConfig } from 'antd';

export function getAntDarkTheme(): ThemeConfig {
  return {
    token: {
      colorPrimary: '#FF0000',
      colorBgBase: '#181818', // Dark background
      colorTextBase: '#FFFFFF', // White text
      colorBorder: '#303030', // Dark gray borders
    },
    components: {
      Button: {
        colorPrimary: '#FF0000',
        colorPrimaryHover: '#E60000',
        colorPrimaryActive: '#CC0000',
      },
      Layout: {
        headerBg: '#202020',
        bodyBg: '#181818',
      },
      Card: {
        colorBgContainer: '#202020',
        borderRadiusLG: 8,
      },
    },
  };
}

// import { ThemeConfig } from "antd";
//
// // 🎨 YouTube Light Theme
// export const lightTheme: ThemeConfig = {
//   token: {
//     colorPrimary: "#FF0000", // YouTube's red for primary elements
//     colorBgBase: "#FFFFFF", // Background
//     colorTextBase: "#0F0F0F", // Dark text
//     colorBorder: "#D3D3D3", // Light gray borders
//   },
//   components: {
//     Button: {
//       colorPrimary: "#FF0000",
//       colorPrimaryHover: "#E60000",
//       colorPrimaryActive: "#CC0000",
//     },
//     Layout: {
//       headerBg: "#FFFFFF",
//       bodyBg: "#F9F9F9",
//     },
//     Card: {
//       colorBgContainer: "#FFFFFF",
//       borderRadiusLG: 8,
//     },
//   },
// };
//
// // 🌙 YouTube Dark Theme
// export const darkTheme: ThemeConfig = {
//   token: {
//     colorPrimary: "#FF0000",
//     colorBgBase: "#181818", // Dark background
//     colorTextBase: "#FFFFFF", // White text
//     colorBorder: "#303030", // Dark gray borders
//   },
//   components: {
//     Button: {
//       colorPrimary: "#FF0000",
//       colorPrimaryHover: "#E60000",
//       colorPrimaryActive: "#CC0000",
//     },
//     Layout: {
//       headerBg: "#202020",
//       bodyBg: "#181818",
//     },
//     Card: {
//       colorBgContainer: "#202020",
//       borderRadiusLG: 8,
//     },
//   },
// };
