import React, {useEffect, useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  Animated,
  NativeModules,
} from 'react-native';
import useAppContext from '../context/useAppContext';
import {COLORS, FONT, images} from '../constants';
import {LABELS} from '../localization/labels';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {IOS_DEVICE} from '../constants/theme';

const AlertPopUp = () => {
  const {StatusBarManager} = NativeModules;
  const {theme, feedBack, setFeedBack}: any = useAppContext();
  const styles = getStyles({theme});
  const slideAnimation = useRef(new Animated.Value(-100)).current;

  const handleRemove = () =>
    setFeedBack({
      show: false,
      message: '',
      type: null,
    });

  useEffect(() => {
    if (feedBack?.message) {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [feedBack?.message]);

  useEffect(() => {
    const timeOut = feedBack?.show && setTimeout(() => handleRemove(), 3500);

    return () => clearTimeout(timeOut);
  }, [feedBack?.message]);

  return (
    feedBack?.show && (
      <Animated.View
        style={[
          styles.container,
          {top: IOS_DEVICE ? StatusBarManager.HEIGHT : 0},
          feedBack.type === 'error' && styles.error,
          {
            transform: [{translateY: slideAnimation}],
            top: IOS_DEVICE ? StatusBarManager.HEIGHT : 0,
          },
        ]}>
        <Image
          source={
            feedBack?.type === 'error' ? images.img_error : images.img_success
          }
          style={styles.icon}
          resizeMode="contain"
        />

        <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">
          {feedBack.message}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.closeButton}
          onPress={handleRemove}>
          <Text style={styles.closeButtonText}>{LABELS.CLOSE}</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    backgroundColor: COLORS.lightGreen,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  error: {
    backgroundColor: COLORS.danger,
  },
  icon: {
    width: wp(6.5),
    height: wp(6.5),
    marginRight: 10,
  },
  text: {
    color: theme?.wrapperColor,
    flex: 1,
    fontFamily: FONT.notoSansMedium,
    padding: wp(1.2),
  },
  closeButton: {
    padding: wp(1.2),
  },
  closeButtonText: {
    color: theme?.wrapperColor,
    fontSize: wp(4.4),
    fontFamily: FONT.notoSansBold,
  },
});

export default AlertPopUp;
