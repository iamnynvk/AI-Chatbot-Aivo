import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FONT} from '../constants';
import {COLORS, SCREEN_WIDTH} from '../constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Paginator = ({data, scrollX, currentIndex, onNext, onSkip}: any) => {
  return (
    <View style={styles.dotContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.skipContainer}
        disabled={currentIndex === 3}
        onPress={() => onSkip()}>
        <Text style={styles.buttonStyles}>
          {currentIndex === 3 ? '' : 'Skip'}
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
              style={{
                height: wp(2),
                borderRadius: wp(2),
                width: dotWidth,
                opacity: dotOpacity,
                backgroundColor: COLORS.lightWhite,
                marginHorizontal: wp(1),
              }}
            />
          );
        })}
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.NextContainer}
        onPress={() => onNext()}>
        <Text style={styles.nextButtonStyles}>
          {currentIndex === 3 ? 'Done' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Paginator);

const styles = StyleSheet.create({
  dotContainer: {
    position: 'absolute',
    justifyContent: 'space-between',
    bottom: 0,
    height: hp(6),
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipContainer: {
    height: '100%',
    justifyContent: 'center',
    width: '16%',
    alignItems: 'center',
  },
  buttonStyles: {
    fontFamily: FONT.notoSansBold,
    color: '#FFF',
  },
  NextContainer: {
    height: '100%',
    justifyContent: 'center',
    width: '16%',
    alignItems: 'center',
    borderTopLeftRadius: wp(4),
    borderBottomLeftRadius: wp(4),
    backgroundColor: '#fff',
  },
  nextButtonStyles: {
    color: '#000',
    fontFamily: FONT.notoSansBold,
  },
  pagingDot: {
    flexDirection: 'row',
  },
});
