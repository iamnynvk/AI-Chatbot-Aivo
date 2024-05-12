import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Divider, Text} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
// Components
import useAppContext from '../context/useAppContext';
import Header from '../components/Header';
import FeaturesList from '../components/InAppPurchase/FeaturesList';
import PlansList from '../components/InAppPurchase/PlansList';
import SubmitButton from '../components/Button/SubmitButton';
// Imports
import {LABELS} from '../localization/labels';
import {FONT, images} from '../constants';
import {FEATURES, IN_APP_PURCHASE_DATA} from '../../assets/data';
import {ROUTES} from '../routes/routes';
import {IN_APP_PURCHASE_SEEN} from '../enums';
import {storeValueInAsync} from '../utils/AsyncStorage';

const InAppPurchase = () => {
  const navigation: any = useNavigation();
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});
  const [planSelect, setPlanSelect] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selectedPlan = (plans: any) => {
    setPlanSelect(plans);
  };

  const onSubscriptionHandler = async () => {
    setIsLoading(true);
  };

  return (
    <View style={styles.container}>
      <Header
        isBack={false}
        isClose={true}
        onClose={async () => {
          await storeValueInAsync(IN_APP_PURCHASE_SEEN.IN_APP_SEEN, true);
          navigation.reset({
            index: 0,
            routes: [{name: ROUTES.MAIN}],
          });
        }}
        title={LABELS.UPGRADE}
      />
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
      <View>
        <FlatList
          data={FEATURES}
          keyExtractor={(feature: any) => feature?.id}
          showsVerticalScrollIndicator={false}
          renderItem={(feature: any) => <FeaturesList data={feature} />}
        />
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
        <FlatList
          data={IN_APP_PURCHASE_DATA}
          keyExtractor={(planDetails: any) => planDetails?.id}
          showsVerticalScrollIndicator={false}
          renderItem={(planDetails: any) => (
            <PlansList
              data={planDetails}
              selectedPlan={selectedPlan}
              selected={planSelect?.id === planDetails?.item?.id}
            />
          )}
        />
      </View>

      {/* Subscription Button */}
      <View style={styles.subscriptionContainer}>
        <SubmitButton
          isDisable={!planSelect}
          handleSubmitButton={onSubscriptionHandler}
          isLoading={isLoading}
          title={LABELS.SUBSCRIPTION_BUTTON}
        />
      </View>
      <View style={styles.conditionContainer}>
        <Text style={styles.condition}>
          {LABELS.PRIVACY} | {LABELS.TERMS}
        </Text>
        <Text style={[styles.condition, {color: theme?.lightTextColor}]}>
          {LABELS.CANCEL_ANYTIME}
        </Text>
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
    marginTop: wp(-14),
    marginBottom: wp(-6),
    zIndex: -999,
  },
  animStyles: {
    height: wp(80),
    width: wp(80),
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
  subscriptionContainer: {
    alignItems: 'center',
    marginTop: wp(4),
  },
  conditionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(6),
    marginTop: wp(4),
  },
  condition: {
    fontSize: wp(3),
    fontFamily: FONT.notoSansRegular,
    color: theme?.textColor,
  },
});

export default InAppPurchase;
