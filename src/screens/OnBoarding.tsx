import React, {useRef, useState, useMemo} from 'react';
import {View, FlatList, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Components
import Paginator from '../components/OnBoarding/Paginator';
import OnBoardingSlides from '../components/OnBoarding/OnBoardingSlides';
// Imports
import useAppContext from '../context/useAppContext';
import {ON_BOARDING} from '../../assets/data';
import {globalStyles} from '../styles/globalStyles';
import {storeValueInAsync} from '../utils/AsyncStorage';
import {ON_BOARDING_BUTTON} from '../enums';
import {ROUTES} from '../routes/routes';

const OnBoarding = () => {
  const navigation: any = useNavigation();
  const slideRef: any = useRef(null);
  const scrollX: any = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const {theme}: any = useAppContext();
  const globalStyle: any = globalStyles({theme});

  // Functions
  const viewableItemChanged = useMemo(() => {
    return ({viewableItems}: any) => {
      setCurrentIndex(viewableItems[0]?.index);
    };
  }, []);

  const viewConfig = useMemo(() => {
    return {viewAreaCoveragePercentThreshold: 50};
  }, []);

  const onScroll = useMemo(() => {
    return Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
      useNativeDriver: false,
    });
  }, [scrollX]);

  const scrollTo = async () => {
    if (currentIndex < ON_BOARDING.length - 1 && slideRef.current) {
      slideRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      await storeValueInAsync(ON_BOARDING_BUTTON.ALREADYLAUNCHED, true);
      navigation.reset({
        index: 0,
        routes: [{name: ROUTES.SIGNIN}],
      });
    }
  };

  const skipTo = () => {
    const lastIndex = ON_BOARDING.length - 1;
    if (slideRef.current) {
      slideRef.current.scrollToIndex({index: lastIndex});
    }
  };

  return (
    <View style={globalStyle.container}>
      <FlatList
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        data={ON_BOARDING}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}: any) => <OnBoardingSlides slides={item} />}
        bounces={false}
        onScroll={onScroll}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemChanged}
        viewabilityConfig={viewConfig}
        ref={slideRef}
      />
      <Paginator
        data={ON_BOARDING}
        scrollX={scrollX}
        currentIndex={currentIndex}
        onNext={scrollTo}
        onSkip={skipTo}
      />
    </View>
  );
};

export default OnBoarding;
