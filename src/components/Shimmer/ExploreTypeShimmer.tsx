import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import useAppContext from '../../context/useAppContext';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const ExploreTypeShimmer = ({size}: {size: number}) => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});

  const shimmerItems = Array.from({length: size});

  return (
    <FlatList
      horizontal
      data={shimmerItems}
      keyExtractor={(_, index) => index.toString()}
      renderItem={() => (
        <View style={styles.shimmerWrapper}>
          <ShimmerPlaceHolder
            shimmerColors={[
              theme?.shimmerColor1,
              theme?.shimmerColor2,
              theme?.shimmerColor1,
            ]}
            style={styles.shimmerTab}
          />
        </View>
      )}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const getStyles = ({theme}: any) => ({
  contentContainer: {
    paddingHorizontal: wp(2),
  },
  shimmerWrapper: {
    marginHorizontal: wp(2),
  },
  shimmerTab: {
    width: wp(25),
    height: wp(8),
    borderRadius: wp(4),
  },
});

export default ExploreTypeShimmer;
