import React from 'react';
import {View} from 'react-native';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import useAppContext from '../../context/useAppContext';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const FeaturesCardShimmer = ({size}: any) => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});

  return (
    <React.Fragment>
      {[...Array(size)].map((_, index) => (
        <View key={index} style={styles.shimmerContainer}>
          <ShimmerPlaceHolder
            shimmerColors={[
              theme?.shimmerColor1,
              theme?.shimmerColor2,
              theme?.shimmerColor1,
            ]}
            style={styles.shimmerIcon}
          />
          <ShimmerPlaceHolder
            shimmerColors={[
              theme?.shimmerColor1,
              theme?.shimmerColor2,
              theme?.shimmerColor1,
            ]}
            style={styles.shimmerTitle}
          />
          <ShimmerPlaceHolder
            shimmerColors={[
              theme?.shimmerColor1,
              theme?.shimmerColor2,
              theme?.shimmerColor1,
            ]}
            style={styles.shimmerDescription}
          />
          <ShimmerPlaceHolder
            shimmerColors={[
              theme?.shimmerColor1,
              theme?.shimmerColor2,
              theme?.shimmerColor1,
            ]}
            style={[
              styles.shimmerDescription,
              {width: wp(80), marginTop: wp(1)},
            ]}
          />
        </View>
      ))}
    </React.Fragment>
  );
};

const getStyles = ({theme}: any) => ({
  shimmerContainer: {
    marginVertical: wp(1),
    marginHorizontal: wp(1),
    padding: wp(4),
    borderRadius: wp(3),
    backgroundColor: theme?.inputColor,
  },
  shimmerIcon: {
    height: wp(10),
    width: wp(10),
    borderRadius: wp(2),
  },
  shimmerTitle: {
    height: wp(4),
    width: wp(40),
    marginTop: wp(3),
    borderRadius: wp(1),
  },
  shimmerDescription: {
    height: wp(3.5),
    width: wp(60),
    marginTop: wp(2),
    borderRadius: wp(1),
  },
});

export default FeaturesCardShimmer;
