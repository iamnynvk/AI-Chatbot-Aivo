import React from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
// Imports
import {COLORS, FONT, SCREEN_WIDTH} from '../../constants/theme';
import useAppContext from '../../context/useAppContext';

const OnBoardingSlides = ({slides: {image, title, subtitle}}: any) => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});

  return (
    <View style={[styles.container]}>
      <FastImage
        source={image}
        style={styles.imageStyles}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.textStyles}>{title}</Text>
      <Text style={styles.descriptionStyles}>{subtitle}</Text>
    </View>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.backgroundColor,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyles: {
    height: wp(70),
    width: wp(70),
    marginBottom: wp(20),
  },
  textStyles: {
    color: theme?.textColor,
    fontSize: wp(6),
    fontFamily: FONT.notoSansBold,
    marginBottom: wp(10),
  },
  descriptionStyles: {
    color: theme?.lightTextColor,
    fontSize: wp(4),
    fontFamily: FONT.notoSansMedium,
    marginHorizontal: wp(6),
    textAlign: 'center',
  },
});

export default OnBoardingSlides;
