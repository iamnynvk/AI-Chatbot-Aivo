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
    statusBarColor: '#27374D',
    backgroundColor: '#ffffff',
    textColor: '#000000',
  },
  dark: {
    statusBarColor: '#27374D',
    backgroundColor: '#070911',
    textColor: '#ffffff',
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
