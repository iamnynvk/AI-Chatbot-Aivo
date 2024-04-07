import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FONT} from '../../constants';
import {COLORS, SCREEN_WIDTH} from '../../constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ON_BOARDING_BUTTON} from '../../enums';

const Paginator = ({data, scrollX, currentIndex, onNext, onSkip}: any) => {
  return (
    <View style={styles.dotContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.skipContainer}
        disabled={currentIndex === 3}
        onPress={onSkip}>
        <Text style={styles.buttonStyles}>
          {currentIndex === 3 ? '' : ON_BOARDING_BUTTON.SKIP}
        </Text>
      </TouchableOpacity>

      <View style={styles.pagingDot}>
        {data.map((item: any) => {
          const inputRange = [
            (item?.id - 1) * SCREEN_WIDTH,
            item?.id * SCREEN_WIDTH,
            (item?.id + 1) * SCREEN_WIDTH,
          ];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });
          const dotOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={item.id}
              style={[
                styles.animatedDot,
                {
                  width: dotWidth,
                  opacity: dotOpacity,
                },
              ]}
            />
          );
        })}
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.NextContainer}
        onPress={onNext}>
        <Text style={styles.nextButtonStyles}>
          {currentIndex === 3
            ? ON_BOARDING_BUTTON.DONE
            : ON_BOARDING_BUTTON.NEXT}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Paginator);

const styles = StyleSheet.create({
  dotContainer: {
    position: 'absolute',
    bottom: 0,
    height: hp(6),
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipContainer: {
    width: '16%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyles: {
    fontFamily: FONT.notoSansBold,
    color: COLORS.white,
  },
  animatedDot: {
    height: wp(2),
    borderRadius: wp(2),
    backgroundColor: COLORS.lightWhite,
    marginHorizontal: wp(1),
  },
  NextContainer: {
    width: '16%',
    height: '100%',
    borderTopLeftRadius: wp(4),
    borderBottomLeftRadius: wp(4),
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonStyles: {
    color: COLORS.black,
    fontFamily: FONT.notoSansBold,
  },
  pagingDot: {
    flexDirection: 'row',
  },
});
