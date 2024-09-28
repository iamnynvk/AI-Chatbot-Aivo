import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useAppContext from '../../context/useAppContext';
import {FONT, images} from '../../constants';
import {LABELS} from '../../localization/labels';
import {ActivityIndicator} from 'react-native-paper';

const Header = ({
  isBack = false,
  isLogo = false,
  isClose = false,
  isLoading = false,
  onClose,
  title,
  menuName,
  onMenuPress,
  menuStyles = {},
}: any) => {
  const {theme}: any = useAppContext();
  const navigation: any = useNavigation();
  const styles: any = getStyles({theme});

  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => (isClose ? onClose() : navigation?.goBack())}>
          {isBack && (
            <Ionicons
              name="chevron-back"
              color={theme?.backColor}
              size={wp(7)}
            />
          )}
          {isLogo && (
            <FastImage
              source={images.img_aivoLogoRemoveBg}
              style={styles.iconStyles}
              resizeMode="contain"
              tintColor={theme?.textColor}
            />
          )}
          {isClose && (
            <Ionicons
              name="close-outline"
              color={theme?.backColor}
              size={wp(7)}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        {title && (
          <Text style={styles.heading} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        )}
      </View>
      <View style={styles.backContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onMenuPress}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size={'small'} color={theme?.link} />
          ) : (
            menuName && (
              <Text
                style={[styles.menuStyles, menuStyles]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {menuName}
              </Text>
            )
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    height: hp(6.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
  titleContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: theme?.textColor,
    fontFamily: FONT.notoSansMedium,
    fontSize: wp(4.6),
  },
  backContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  menuStyles: {
    color: theme?.danger,
    fontSize: wp(4),
    alignSelf: 'center',
    fontFamily: FONT.notoSansExtraBold,
  },
  iconStyles: {
    height: 30,
    width: 30,
    alignSelf: 'center',
  },
});

export default Header;
