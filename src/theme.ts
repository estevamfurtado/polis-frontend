import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config:ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  gray: {
    900: '#18191D',
    850: '#212226',
    800: '#303136',
    700: '#494A51',
  }
}

const theme = extendTheme({ config, colors });
export default theme;
