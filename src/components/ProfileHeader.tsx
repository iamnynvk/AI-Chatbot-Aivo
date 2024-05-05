import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
// Imports
import useAppContext from '../context/useAppContext';
import {LABELS} from '../localization/labels';
import {FONT, images} from '../constants';
import {ROUTES} from '../routes/routes';

const ProfileHeader = () => {
  const navigation: any = useNavigation();
  const {theme, authUser}: any = useAppContext();
  const styles: any = getStyles({theme});

  return (
    <View style={styles.headerContainer}>
      {/* Profile Photo */}
      <View style={styles.profilePhotoContainer}>
        <View style={styles.profilePhoto}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(ROUTES.PROFILE)}>
            <FastImage
              source={{
                uri: authUser?.userImageUrl,
                priority: 'high',
              }}
              style={styles.imageStyles}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.greetingText}>{LABELS.WELCOME_BACK}</Text>
          <View style={styles.userContainer}>
            <Text style={styles.userNameText}>{authUser?.fullName}</Text>
            <Text style={styles.freeAccountText}>{LABELS.FREE_ACCOUNT}</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(ROUTES.INAPPPURCHASE)}>
            <LottieView
              source={images.anim_crown}
              autoPlay
              loop
              style={styles.animStyles}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const getStyles = ({theme}: any) => ({
  headerContainer: {
    height: hp(7),
    marginHorizontal: wp(1),
  },
  profilePhotoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  profilePhoto: {
    flex: 0.15,
    justifyContent: 'center',
  },
  imageStyles: {
    height: wp(12),
    width: wp(12),
    borderRadius: wp(10),
    borderWidth: 1,
    borderColor: theme?.borderColor,
    alignSelf: 'center',
  },
  userDetails: {
    flex: 0.7,
    justifyContent: 'center',
    paddingStart: wp(1),
  },
  greetingText: {
    fontFamily: FONT.notoSansLight,
    color: theme?.lightTextColor,
    fontSize: wp(3),
  },
  userContainer: {
    flexDirection: 'row',
  },
  userNameText: {
    fontFamily: FONT.notoSansBold,
    color: theme?.textColor,
  },
  freeAccountText: {
    backgroundColor: theme?.tagColor,
    marginStart: wp(2),
    fontSize: wp(3),
    alignSelf: 'center',
    borderRadius: wp(1),
    fontFamily: FONT.notoSansMedium,
    color: theme?.wrapperColor,
  },
  menuContainer: {
    flex: 0.15,
    justifyContent: 'center',
  },
  animStyles: {
    height: wp(14),
    width: wp(14),
    alignSelf: 'center',
  },
});

export default ProfileHeader;
