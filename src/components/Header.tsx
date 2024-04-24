import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useAppContext from '../context/useAppContext';
import {FONT} from '../constants';

const Header = ({
  isBack = true,
  isClose = false,
  onClose,
  title,
  menuName,
  onMenuPress,
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
        {title && <Text style={styles.heading}>{title}</Text>}
      </View>
      <View style={styles.backContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={onMenuPress}>
          {menuName && (
            <Ionicons name={menuName} color={theme?.backColor} size={wp(7)} />
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
    alignItems: 'center',
  },
});

export default Header;
