import React, {useRef, useState, useMemo} from 'react';
import {View, FlatList, Animated} from 'react-native';
import {ON_BOARDING} from '../../assets/data';
import useAppContext from '../context/useAppContext';
import {globalStyles} from '../styles/globalStyles';
import Paginator from '../components/Paginator';
import OnBoardingSlides from '../components/OnBoardingSlides';

const OnBoarding = () => {
  const slideRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const {theme}: any = useAppContext();
  const globalStyle = globalStyles({theme});

  const viewableItemChanged = useMemo(() => {
    return ({viewableItems}: any) => {
      setCurrentIndex(viewableItems[0].index);
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

  const scrollTo = () => {
    if (currentIndex < ON_BOARDING.length - 1 && slideRef.current) {
      slideRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      console.log('LAST SLIDE');
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
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <OnBoardingSlides slides={item} />}
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
