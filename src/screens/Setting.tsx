import React from 'react';
import {View, Text, Linking, Share} from 'react-native';
import InAppReview from 'react-native-in-app-review';
import ProfileCard from '../components/Profile/ProfileCard';
import useAppContext from '../context/useAppContext';
import Header from '../components/Header/Header';
import List from '../components/List/List';
import {FEEDBACK} from '../enums';
import {FONT} from '../constants';
import {ROUTES} from '../routes/routes';
import {useNavigation} from '@react-navigation/native';
import {LABELS, STATIC_MESSAGE} from '../localization/labels';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Setting = () => {
  const navigation: any = useNavigation();
  const {theme, setFeedBack, themeMode, appInfo}: any = useAppContext();
  const styles: any = getStyles({theme});

  const requestInAppReview = () => {
    if (InAppReview.isAvailable()) {
      InAppReview.RequestInAppReview()
        .then(hasFlowFinishedSuccessfully => {
          console.log(
            'In-App review flow finished successfully:',
            hasFlowFinishedSuccessfully,
          );
          setFeedBack({
            show: true,
            message: STATIC_MESSAGE.USER_REVIEW_MULTIPLE,
            type: FEEDBACK.SUCCESS,
          });
        })
        .catch(error => {
          console.log('In-App review flow failed:', error);
        });
    }
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: STATIC_MESSAGE?.SHARE_LINK + appInfo?.appLink,
      });
    } catch (error: any) {
      setFeedBack({
        show: true,
        message: error,
        type: FEEDBACK.ERROR,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header isLogo={true} title={LABELS.SETTING} />
      <View style={styles.bodyContainer}>
        <View style={styles.profileCardContainer}>
          <ProfileCard />
        </View>
        <List
          label={LABELS.UPGRADE}
          onPress={() => navigation?.navigate(ROUTES.INAPPPURCHASE)}
        />
        <List
          label={LABELS?.DARK_MODE}
          title={themeMode?.label}
          onPress={() => navigation?.navigate(ROUTES?.MODE)}
        />
        <List label={LABELS.SHARE} onPress={onShare} />
        <List label={LABELS?.RATE_APP} onPress={requestInAppReview} />
        <List
          label={LABELS?.SEND_FEEDBACK}
          onPress={() => navigation?.navigate(ROUTES?.FEEDBACK)}
        />
      </View>
      <View style={styles.appInfoContainer}>
        <Text style={styles.appInfoText}>
          {LABELS.AIVO_CHATBOT} - {LABELS.VERSION}{' '}
          {appInfo?.appVersion || '0.0.1'}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[styles.appInfoText, {color: theme?.link}]}
            onPress={() => Linking.openURL(appInfo?.termAndCondition)}>
            {LABELS.TERM_OF_USE}
          </Text>
          <Text style={styles.appInfoText}> | </Text>
          <Text
            style={[styles.appInfoText, {color: theme?.link}]}
            onPress={() => Linking.openURL(appInfo?.privacyPolicy)}>
            {LABELS.PRIVACY_POLICY}
          </Text>
        </View>
      </View>
    </View>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.backgroundColor,
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: wp(2.5),
  },
  profileCardContainer: {
    marginTop: wp(1),
  },
  headerTitle: {
    fontFamily: FONT.notoSansBold,
    textTransform: 'uppercase',
    fontSize: wp(4),
  },
  appInfoContainer: {
    position: 'absolute',
    bottom: wp(2),
    alignSelf: 'center',
  },
  appInfoText: {
    color: theme?.feedbackText,
    fontFamily: FONT.notoSansMedium,
    fontSize: wp(3.4),
  },
});

export default Setting;
