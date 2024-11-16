import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Imports
import useAppContext from '../../context/useAppContext';
import {LABELS} from '../../localization/labels';
import {COLORS, FONT, images} from '../../constants';
import {ROUTES} from '../../routes/routes';

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
              source={
                authUser?.userImageUrl
                  ? {
                      uri: authUser?.userImageUrl,
                      priority: 'high',
                    }
                  : images.img_user_logo
              }
              style={styles.imageStyles}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.greetingText}>{LABELS.WELCOME_BACK}</Text>
          <View style={styles.userContainer}>
            <Text style={styles.userNameText}>
              {authUser?.fullName ? authUser?.fullName : LABELS.USER}
            </Text>
            <Text style={styles.freeAccountText}>
              {authUser?.subscription == null
                ? LABELS.FREE_ACCOUNT
                : LABELS.PREMIUM_ACCOUNT}
            </Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.creditContainer}
            onPress={() => {}}>
            <Ionicons
              name={'sparkles'}
              size={wp(3.8)}
              color={COLORS.white}
              style={{marginHorizontal: wp(1)}}
            />
            <Text style={styles.creditText}>{authUser?.credit}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const getStyles = ({theme}: any) => ({
  headerContainer: {
    height: hp(7),
    marginHorizontal: wp(2),
    marginVertical: wp(1),
  },
  profilePhotoContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: wp(1),
  },
  profilePhoto: {
    flex: 0.15,
    justifyContent: 'center',
  },
  imageStyles: {
    height: wp(12),
    width: wp(12),
    borderRadius: wp(10),
    borderWidth: 0.8,
    borderColor: theme?.backColor,
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
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  menuContainer: {
    flex: 0.15,
    justifyContent: 'center',
  },
  creditContainer: {
    flexDirection: 'row',
    padding: wp(2),
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme?.tagColor,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  creditText: {
    color: COLORS.white,
    fontFamily: FONT.notoSansBold,
    fontSize: wp(4),
  },
});

export default ProfileHeader;
