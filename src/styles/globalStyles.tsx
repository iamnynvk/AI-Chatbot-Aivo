import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const globalStyles = ({theme}: any) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.backgroundColor,
  },
});

export const onBoardingImageStyles = StyleSheet.create({
  imageStyles: {
    width: wp(80),
    height: hp(40),
  },
});
