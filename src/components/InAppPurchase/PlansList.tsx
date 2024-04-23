import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import useAppContext from '../../context/useAppContext';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FONT} from '../../constants';

const PlansList = ({data}: any) => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});

  return (
    <TouchableOpacity
      key={data?.id}
      activeOpacity={0.8}
      style={styles.container}>
      <Text style={styles.offers}>{data?.offers}</Text>
      <Text style={styles.title}>{data?.title}</Text>
      {data?.id == 1 && (
        <View style={styles.popularContainer}>
          <Text style={styles.popular}>Popular</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    borderWidth: 1,
    borderColor: theme?.borderLines,
    marginHorizontal: wp(6),
    marginBottom: wp(4),
    borderRadius: wp(2),
  },
  offers: {
    fontSize: wp(3),
    fontFamily: FONT.notoSansMedium,
    color: theme?.lightTextColor,
    marginStart: wp(4),
    marginTop: wp(2),
  },
  title: {
    color: theme?.textColor,
    marginStart: wp(4),
    marginTop: wp(1),
    marginBottom: wp(2),
    fontFamily: FONT.notoSansExtraBold,
  },
  popularContainer: {
    position: 'absolute',
    right: 0,
    backgroundColor: theme?.link,
    paddingHorizontal: wp(3),
    paddingVertical: wp(0.4),
    borderTopRightRadius: wp(1.5),
  },
  popular: {
    color: theme?.wrapperColor,
    fontFamily: FONT.notoSansExtraBold,
  },
});

export default PlansList;
