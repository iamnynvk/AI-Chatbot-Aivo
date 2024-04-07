import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FONT, SCREEN_WIDTH} from '../constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const OnBoardingSlides = ({
  slides: {backgroundColor, image, title, subtitle},
}: any) => {
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Image source={image} style={styles.imageStyles} resizeMode="contain" />
      <Text style={[styles.textStyles]}>{title}</Text>
      <Text style={[styles.descriptionStyles]}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyles: {
    height: wp(80),
    width: wp(80),
    marginBottom: wp(20),
  },
  textStyles: {
    color: '#FFF',
    fontSize: wp(6),
    fontFamily: FONT.notoSansBold,
    marginBottom: wp(10),
  },
  descriptionStyles: {
    color: '#FFF',
    fontSize: wp(4),
    fontFamily: FONT.notoSansMedium,
    marginHorizontal: wp(6),
    textAlign: 'center',
  },
});

export default OnBoardingSlides;
