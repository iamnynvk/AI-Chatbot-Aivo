import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity} from 'react-native';
import useAppContext from '../../context/useAppContext';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {COLORS, FONT, images} from '../../constants';
import {LABELS} from '../../localization/labels';
import {ROUTES} from '../../routes/routes';

const ProfileCard = () => {
  const navigation: any = useNavigation();
  const {theme, authUser}: any = useAppContext();
  const styles: any = getStyles({theme});

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={() => navigation?.navigate(ROUTES.PROFILE)}>
      <FastImage
        source={
          authUser?.userImageUrl
            ? {uri: authUser?.userImageUrl}
            : images.img_user_logo
        }
        resizeMode="contain"
        style={styles.imageStyles}
      />
      <View style={styles.sideContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {authUser?.fullName ?? LABELS.USER}
            </Text>
            <Text style={styles.emailAddress} numberOfLines={1}>
              {authUser?.email ?? LABELS.EMAIL_LABEL}
            </Text>
          </View>
          <View style={styles.iconStyles}>
            <Ionicons
              name="chevron-forward-outline"
              size={wp(6)}
              color={theme?.link}
              style={{alignSelf: 'flex-end'}}
            />
          </View>
        </View>
        <Text style={styles.freeAccountText}>
          {authUser?.subscription == null
            ? LABELS.FREE_ACCOUNT
            : LABELS.PREMIUM_ACCOUNT}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    flexDirection: 'row',
    marginVertical: wp(1),
    marginHorizontal: wp(0.2),
    padding: wp(2),
    borderRadius: wp(3),
    backgroundColor: theme?.inputColor,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  imageStyles: {
    height: wp(20),
    width: wp(20),
    alignSelf: 'center',
    borderRadius: wp(10),
    borderWidth: 0.8,
    borderColor: theme?.backColor,
  },
  sideContainer: {
    flex: 1,
    paddingVertical: wp(1),
    paddingHorizontal: wp(2.5),
  },
  divider: {
    marginHorizontal: wp(4),
  },
  userInfoContainer: {
    flexDirection: 'row',
  },
  userInfo: {
    flex: 0.92,
  },
  userName: {
    color: theme?.textColor,
    fontFamily: FONT.notoSansBold,
    fontSize: wp(4.2),
  },
  emailAddress: {
    color: theme?.lightTextColor,
    fontFamily: FONT.notoSansRegular,
    fontSize: wp(3.2),
  },
  iconStyles: {
    flex: 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  freeAccountText: {
    backgroundColor: theme?.tagColor,
    fontSize: wp(2.8),
    alignSelf: 'flex-start',
    borderRadius: wp(1),
    marginTop: wp(2.5),
    marginStart: wp(-0.5),
    fontFamily: FONT.notoSansRegular,
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
});

export default ProfileCard;
