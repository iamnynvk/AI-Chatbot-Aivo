import React, {useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import useAppContext from '../../context/useAppContext';
import {LABELS} from '../../localization/labels';
import {FONT} from '../../constants';

const PlansList = ({data, selectedPlan, selected}: any) => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});

  const borderColor = useMemo(() => {
    return selected ? theme?.tagColor : theme?.borderColor;
  }, [selected, theme]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={selected}
      style={[styles.container, {borderColor}]}
      onPress={() => selectedPlan(data?.item)}>
      <Text style={styles.offers}>{data?.item?.offers}</Text>
      <Text style={styles.title}>{data?.item?.title}</Text>
      {data?.item?.id == 1 && (
        <View style={styles.popularContainer}>
          <Text style={styles.popular}>
            {LABELS.SAVE30} | {LABELS.POPULAR}
          </Text>
        </View>
      )}
      {data?.item?.id == 2 && (
        <View style={styles.popularContainer}>
          <Text style={styles.popular}>{LABELS.SAVE70}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    borderWidth: 1,
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
    fontSize: wp(3.6),
  },
  popularContainer: {
    position: 'absolute',
    right: 0,
    backgroundColor: theme?.tagColor,
    paddingHorizontal: wp(3),
    paddingVertical: wp(0.4),
    borderTopRightRadius: wp(1.5),
    borderBottomLeftRadius: wp(1.5),
  },
  popular: {
    color: theme?.wrapperColor,
    fontFamily: FONT.notoSansExtraBold,
    fontSize: wp(3),
  },
});

export default React.memo(PlansList);
