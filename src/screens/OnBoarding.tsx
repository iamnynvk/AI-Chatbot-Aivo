import React, {useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {ON_BOARDING} from '../../assets/data';
import {COLORS, FONT} from '../constants';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {ON_BOARDING_BUTTON} from '../enums';
import {ROUTES} from '../routes/routes';

const OnBoardingScreen = () => {
  const onBoardingRef: any = useRef();
  const navigation: any = useNavigation();

  const renderOnButton = (label: string) => {
    return (
      <TouchableOpacity
        style={[
          styles.labelContainer,
          {
            backgroundColor:
              label === ON_BOARDING_BUTTON.SKIP ? '' : COLORS.white,
          },
        ]}
        activeOpacity={0.8}
        onPress={() =>
          label === ON_BOARDING_BUTTON.NEXT
            ? onBoardingRef.current.goNext()
            : label === ON_BOARDING_BUTTON.SKIP
            ? onBoardingRef.current.goToPage(3, true)
            : navigation.reset({
                index: 0,
                routes: [{name: ROUTES.INAPPPURCHASE}],
              })
        }>
        <Text
          style={[
            styles.labelButtonStyles,
            {
              color:
                label === ON_BOARDING_BUTTON.SKIP ? COLORS.white : COLORS.black,
            },
          ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Onboarding
        ref={onBoardingRef}
        pages={ON_BOARDING}
        titleStyles={styles.titleStyles}
        containerStyles={styles.containerStyles}
        subTitleStyles={styles.subTitleStyles}
        bottomBarHeight={wp(14)}
        bottomBarHighlight={false}
        allowFontScaling={false}
        NextButtonComponent={() => renderOnButton(ON_BOARDING_BUTTON.NEXT)}
        SkipButtonComponent={() => renderOnButton(ON_BOARDING_BUTTON.SKIP)}
        DoneButtonComponent={() => renderOnButton(ON_BOARDING_BUTTON.DONE)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyles: {
    fontFamily: FONT.notoSansBold,
    fontSize: wp(6),
  },
  containerStyles: {
    padding: wp(6),
  },
  subTitleStyles: {
    fontFamily: FONT.notoSansMedium,
  },
  labelContainer: {
    padding: wp(4),
    borderTopLeftRadius: wp(5),
    borderBottomLeftRadius: wp(5),
  },
  labelButtonStyles: {
    fontFamily: FONT.notoSansExtraBold,
    fontSize: wp(4),
  },
});

export default OnBoardingScreen;
