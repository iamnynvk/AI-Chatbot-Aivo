import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import useAppContext from '../context/useAppContext';
import {globalStyles} from '../styles/globalStyles';
import Header from '../components/Header';
import {LABELS} from '../localization/labels';
import FastImage from 'react-native-fast-image';
import {images} from '../constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import {IN_APP_PURCHASE_DATA} from '../../assets/data';
import FeaturesList from '../components/InAppPurchase/FeaturesList';
import {Text} from 'react-native';

const InAppPurchase = (props: any) => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});

  return (
    <View style={styles.container}>
      <Header isBack={false} title={LABELS.UPGRADE} />
      {/* Image */}
      <View style={styles.ImageContainer}>
        <FastImage
          source={images.img_premium_plan}
          style={styles.imageStyles}
          resizeMode="contain"
        />
      </View>

      <FlatList
        data={IN_APP_PURCHASE_DATA}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}: any) => <FeaturesList data={item} />}
        showsVerticalScrollIndicator={false}
      />

      {/* Select Plans */}
      <View style={styles.lineContainer} />
      <Text>Select Plans</Text>
      <View style={styles.lineContainer} />
    </View>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.backgroundColor,
  },
  ImageContainer: {
    alignItems: 'center',
    marginTop: wp(10),
    alignSelf: 'center',
  },
  imageStyles: {
    height: wp(80),
    width: wp(80),
  },
  lineContainer: {
    borderColor: '#fff',
    borderWidth: 1,
  },
});

export default InAppPurchase;
