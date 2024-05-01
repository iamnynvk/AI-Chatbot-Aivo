import React from 'react';
import {View, Text} from 'react-native';
import useAppContext from '../context/useAppContext';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {LABELS} from '../localization/labels';
import {FONT} from '../constants';

const ProfileHeader = () => {
  const {theme, authUser}: any = useAppContext();
  const styles: any = getStyles({theme});

  return (
    <View style={styles.headerContainer}>
      {/* Profile Photo */}
      <View style={styles.profilePhotoContainer}>
        <View style={styles.profilePhoto}>
          <FastImage
            source={{
              uri: authUser?.userImageUrl,
              priority: 'high',
            }}
            style={styles.imageStyles}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.greetingText}>{LABELS.WELCOME_BACK}</Text>
          <View style={styles.userContainer}>
            <Text style={styles.userNameText}>{authUser?.fullName}</Text>
            <Text style={styles.freeAccountText}> Free Account </Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <FontAwesome6
            name="crown"
            color={theme?.secondaryColor}
            style={styles.menuIcon}
            size={wp(5)}
          />
        </View>
      </View>
    </View>
  );
};

const getStyles = ({theme}: any) => ({
  headerContainer: {
    height: hp(7),
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
  menuIcon: {
    alignSelf: 'center',
    padding: wp(3),
    borderRadius: wp(10),
  },
});

export default ProfileHeader;
