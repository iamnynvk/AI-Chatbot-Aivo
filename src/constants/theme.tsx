import {Dimensions} from 'react-native';

export const COLORS = {
  background: '#070911',
  cards: '#0F111B',
  grayDark: '#38393b',
  blue: '#0258f9',
  blueDark: '#2b4292',
  purple: '#462963',
  white: '#FFFFFF',
  black: '#000000',
  lightWhite: '#e1e1e1',
  danger: '#F44336',
  secondary: '#4A4E51',
  border: '#f19c12',
  pupal: '#3BF6F1',
  lightBlue: '#3F43F2',
  borderColor: '#181D2C',
  tabBackColor: '#1C2132',
};

export const color: any = {
  light: {
    backgroundColor: '#ffffff',
    textColor: '#262626',
    lightTextColor: '#737373',
    secondaryColor: '#0b66c3',
    wrapperColor: '#f9fafc',
    danger: '#ff3040',
    link: '#0b66c3',
    borderLines: '#4A4E51',
    inputColor: '#f9fafc',
    lightBorder: '#0b66c3',
    backColor: '#000000',
  },
  dark: {
    backgroundColor: '#000000',
    textColor: '#f5f5f5',
    lightTextColor: '#a8a8a8',
    secondaryColor: '#0195f7',
    wrapperColor: '#f9fafc',
    danger: '#ff3040',
    link: '#f19c12',
    borderLines: '#4A4E51',
    inputColor: '#181D2C',
    lightBorder: '#3BF6F1',
    backColor: '#FFFFFF',
  },
};

export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const SCREEN_WIDTH = Dimensions.get('screen').width;

export const FONT = {
  notoSansBlack: 'NotoSans-Black',
  notoSansBold: 'NotoSans-Bold',
  notoSansExtraBold: 'NotoSans-ExtraBold',
  notoSansExtraLight: 'NotoSans-ExtraLight',
  notoSansLight: 'NotoSans-Light',
  notoSansMedium: 'NotoSans-Medium',
  notoSansRegular: 'NotoSans-Regular',
  notoSansSemiBold: 'NotoSans-SemiBold',
  notoSansThin: 'NotoSans-Thin',
};
const appTheme = {COLORS, color, FONT, SCREEN_HEIGHT, SCREEN_WIDTH};

export default appTheme;
