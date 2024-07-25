import {Dimensions, Platform} from 'react-native';

export const COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  danger: '#F44336',
  lightGreen: '#4CAF50',
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
    borderColor: '#E1E1E1',
    tagColor: '#5AB5FA',
    tabBorderColor: '#E1E1E1',
    senderChatColor: '#0b66c3',
    receiveChatColor: '#606676',
    dropDownColor: '#070911',
    lightWhite: '#e1e1e1',
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
    borderColor: '#A0A0A0',
    tagColor: '#5AB5FA',
    tabBorderColor: '#4A4E51',
    senderChatColor: '#3F43F2',
    receiveChatColor: '#0F111B',
    dropDownColor: '#070911',
    lightWhite: '#e1e1e1',
  },
};

export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const SCREEN_WIDTH = Dimensions.get('screen').width;

export const IOS_DEVICE = Platform.OS === 'ios';
export const ANDROID_DEVICE = Platform.OS === 'android';

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
