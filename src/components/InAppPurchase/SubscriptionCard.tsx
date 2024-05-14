import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
// Imports
import {ROUTES} from '../../routes/routes';
import {LABELS} from '../../localization/labels';
import {COLORS, FONT, images} from '../../constants';
import useAppContext from '../../context/useAppContext';

const SubscriptionCard = () => {
  const navigation: any = useNavigation();
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate(ROUTES.INAPPPURCHASE)}
      style={styles.cardContainer}>
      <View style={styles.detailContainer}>
        <Text style={styles.cardHeading}>{LABELS.AIVO_PREMIUM}</Text>
        <Text style={styles.cardDescription}>{LABELS.UNLOCK_DESC}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate(ROUTES.INAPPPURCHASE)}
          style={styles.upgradeContainer}>
          <Text style={styles.upgradeText}>{LABELS.UPGRADE_PLAN}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <LottieView
          source={images.anim_subscription}
          autoPlay
          loop
          style={styles.animStyles}
        />
      </View>
    </TouchableOpacity>
  );
};

const getStyles = ({theme}: any) => ({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: theme?.tagColor,
    padding: wp(4),
    marginVertical: wp(3),
    borderRadius: wp(3),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeading: {
    color: COLORS.white,
    fontSize: wp(4),
    fontFamily: FONT.notoSansBold,
  },
  cardDescription: {
    marginTop: wp(1),
    fontSize: wp(3),
    color: COLORS.white,
    lineHeight: wp(4),
    fontFamily: FONT.notoSansMedium,
  },
  upgradeContainer: {
    marginTop: wp(4),
    padding: wp(1),
    backgroundColor: theme?.wrapperColor,
    borderRadius: wp(2),
    width: hp(12),
    alignItems: 'center',
  },
  upgradeText: {
    fontFamily: FONT.notoSansRegular,
    fontSize: wp(3),
    color: COLORS.black,
  },
  animStyles: {
    height: wp(24),
    width: wp(34),
  },
});

export default SubscriptionCard;
