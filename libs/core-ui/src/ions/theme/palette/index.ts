import { hexToRGBA } from '@mf-core/core-ui';
import { PaletteMode } from '../../../foundations';
import { SkinType, ThemeColorType } from '../../../layouts';

const DefaultPalette = (mode: PaletteMode, skin: SkinType, themeColor: ThemeColorType) => {
  // ** Vars
  const whiteColor = '#F4F5FA'
  const lightColor = '#333333'
  const darkColor = '#EEEEEE'
  const mainColor = mode === 'light' ? lightColor : darkColor

  const primaryGradient = () => {
    if (themeColor === 'primary') {
      return '#f0a0c0'
    } else if (themeColor === 'secondary') {
      return '#9C9FA4'
    } else if (themeColor === 'success') {
      return '#93DD5C'
    } else if (themeColor === 'error') {
      return '#FF8C90'
    } else if (themeColor === 'warning') {
      return '#FFCF5C'
    } else {
      return '#6ACDFF'
    }
  }

  const defaultBgColor = () => {
    if (skin === 'bordered' && mode === 'light') {
      return whiteColor
    } else if (skin === 'bordered' && mode === 'dark') {
      return '#333333'
    } else if (mode === 'light') {
      return '#F4F5FA'
    } else return '#222222'
  }

  return {
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      primaryGradient: primaryGradient(),
      bodyBg: mode === 'light' ? '#F4F5FA' : '#222222', // Same as palette.background.default but doesn't consider bordered skin
      trackBg: mode === 'light' ? '#F0F2F8' : '#474360',
      darkBg: skin === 'bordered' ? '#333333' : '#222222',
      lightBg: skin === 'bordered' ? whiteColor : '#F4F5FA',
      tableHeaderBg: mode === 'light' ? '#F9FAFC' : '#444444'
    },
    mode: mode,
    common: {
      black: '#000',
      white: whiteColor
    },
    primary: {
      light: '#9E69FD',
      main: '#9155FD',
      dark: '#804BDF',
      contrastText: whiteColor
    },
    secondary: {
      light: '#9C9FA4',
      main: '#8A8D93',
      dark: '#777B82',
      contrastText: whiteColor
    },
    error: {
      light: '#FF6166',
      main: '#FF4C51',
      dark: '#E04347',
      contrastText: whiteColor
    },
    warning: {
      light: '#FFCA64',
      main: '#FFB400',
      dark: '#E09E00',
      contrastText: whiteColor
    },
    info: {
      light: '#32BAFF',
      main: '#16B1FF',
      dark: '#139CE0',
      contrastText: whiteColor
    },
    success: {
      light: '#6AD01F',
      main: '#56CA00',
      dark: '#4CB200',
      contrastText: whiteColor
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161'
    },
    text: {
      primary: hexToRGBA(mainColor, 0.87),
      secondary: hexToRGBA(mainColor, 0.6),
      disabled: hexToRGBA(mainColor, 0.38)
    },
    divider: hexToRGBA(mainColor, 0.12),
    background: {
      paper: mode === 'light' ? whiteColor : '#333333',
      default: defaultBgColor()
    },
    action: {
      active: hexToRGBA(mainColor, 0.54),
      hover: hexToRGBA(mainColor, 0.04),
      selected: hexToRGBA(mainColor, 0.08),
      disabled: hexToRGBA(mainColor, 0.26),
      disabledBackground: hexToRGBA(mainColor, 0.12),
      focus: hexToRGBA(mainColor, 0.12),
    }
  }
}

export default DefaultPalette
