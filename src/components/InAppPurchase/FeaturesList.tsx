import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useAppContext from '../../context/useAppContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONT} from '../../constants';

const FeaturesList = ({data}: any) => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});
  console.log('data ---', data);
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={data?.image}
          color={theme.textColor}
          size={wp(6)}
        />
      </View>
      <View style={styles.featureContainer}>
        <Text style={styles.featuresText}>{data?.featuresName}</Text>
      </View>
    </View>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    backgroundColor: theme?.backgroundColor,
    flexDirection: 'row',
  },
  iconContainer: {
    flex: 0.2,
    marginTop: wp(2),
    alignItems: 'flex-end',
    paddingRight: wp(4),
  },
  featureContainer: {
    flex: 0.8,
    marginTop: wp(2),
  },
  featuresText: {
    fontFamily: FONT.notoSansMedium,
    fontSize: wp(4),
    color: theme?.textColor,
  },
});

export default FeaturesList;
