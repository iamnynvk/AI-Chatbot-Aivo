import React from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import useAppContext from '../../context/useAppContext';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const TitleHeaderShimmer = () => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});

  return (
    <ShimmerPlaceHolder
      shimmerColors={[
        theme?.shimmerColor1,
        theme?.shimmerColor2,
        theme?.shimmerColor1,
      ]}
      style={styles.shimmerHeading}
    />
  );
};

const getStyles = ({theme}: any) => ({
  shimmerHeading: {
    height: wp(4.5),
    width: wp(20),
    margin: wp(1),
    borderRadius: wp(1),
  },
});

export default TitleHeaderShimmer;
