import React, {useEffect} from 'react';
import {View} from 'react-native';
import useAppContext from '../context/useAppContext';
import {globalStyles} from '../styles/globalStyles';
import Header from '../components/Header';
import {LABELS} from '../localization/labels';
import FastImage from 'react-native-fast-image';
import {FONT, images} from '../constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FEATURES, IN_APP_PURCHASE_DATA} from '../../assets/data';
import FeaturesList from '../components/InAppPurchase/FeaturesList';
import {Divider, Text} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import PlansList from '../components/InAppPurchase/PlansList';

const InAppPurchase = (props: any) => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});

  return (
    <View style={styles.container}>
      <Header isBack={false} title={LABELS.UPGRADE} />
      {/* Image */}
      <View style={styles.animContainer}>
        <LottieView
          source={images.anim_robot}
          autoPlay
          loop
          style={styles.animStyles}
        />
      </View>

      {/* Features */}
      <View style={styles.featuresContainer}>
        {FEATURES.map((feature: any) => (
          <FeaturesList data={feature} />
        ))}
      </View>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <Divider
          style={styles.divider}
          theme={{colors: {primary: theme?.textColor}}}
        />
        <Text style={styles.planText}>{LABELS.SELECT_PLANS}</Text>
        <Divider
          style={styles.divider}
          theme={{colors: {primary: theme?.textColor}}}
        />
      </View>

      {/* Select Plans */}
      <View style={styles.planContainer}>
        {IN_APP_PURCHASE_DATA.map((planDetails: any) => (
          <PlansList data={planDetails} />
        ))}
      </View>
    </View>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.backgroundColor,
  },
  animContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: wp(-10),
    marginBottom: wp(-6),
    borderColor: '#fff',
  },
  animStyles: {
    height: wp(80),
    width: wp(80),
  },
  featuresContainer: {
    marginTop: wp(2),
  },
  planText: {
    fontFamily: FONT.notoSansMedium,
    fontSize: wp(4),
    color: theme?.textColor,
  },
  dividerContainer: {
    marginTop: wp(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    flex: 1,
    marginHorizontal: wp(4),
  },
  planContainer: {
    marginTop: wp(4),
  },
});

export default InAppPurchase;
