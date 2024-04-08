import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, images} from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SvgIcon} from './SvgIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useAppContext from '../context/useAppContext';

const Header = ({onPress, isLogout, logout}: any) => {
  const {theme}: any = useAppContext();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          marginVertical: 10,
          marginStart: 5,
        }}
        onPress={onPress}>
        <Ionicons name="chevron-back" color={theme?.backColor} size={wp(8)} />
      </TouchableOpacity>
      {isLogout && (
        <TouchableOpacity activeOpacity={0.9} onPress={logout}>
          <Ionicons
            name="exit-outline"
            size={24}
            color={COLORS.white}
            style={{marginEnd: 5}}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(6.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
});

export default Header;
