import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import useAppContext from '../context/useAppContext';
import SubscriptionCard from '../components/InAppPurchase/SubscriptionCard';
import TitleHeader from '../components/Header/TitleHeader';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../routes/routes';
import {COLLECTIONS} from '../enums';
import {FONT, SCREEN_HEIGHT} from '../constants/theme';
import {LABELS} from '../localization/labels';
import ProfileHeader from '../components/Cards/ProfileHeader';
import FeaturesCard from '../components/Cards/FeaturesCard';
import TitleHeaderShimmer from '../components/Shimmer/TitleHeaderShimmer';
import FeaturesCardShimmer from '../components/Shimmer/FeaturesCardShimmer';
import {EmptyComponent} from '../components/EmptyComponent/EmptyComponent';

const Home = () => {
  const navigation: any = useNavigation();
  const {theme, getCollectionData}: any = useAppContext();
  const [featuresForHome, setFeaturesForHome] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const styles: any = getStyles({theme});

  useEffect(() => {
    getFeaturesData();
  }, []);

  const getFeaturesData = async () => {
    try {
      const popularFeatures = await fetchCollectionData(
        COLLECTIONS.POPULAR_FEATURES,
      );
      const assistantFeatures = await fetchCollectionData(
        COLLECTIONS.ASSISTANT_FEATURES,
        4,
      );

      setFeaturesForHome(() => [
        {
          id: Math.random(),
          title: LABELS.POPULAR,
          type: 'header_one',
        },
        ...popularFeatures,
        {id: Math.random(), title: LABELS.EXPLORE, type: 'header_two'},
        ...assistantFeatures,
      ]);
    } catch (error) {
      console.error('Error fetching features:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCollectionData = async (
    collectionName: string,
    limit?: number,
  ) => {
    const result = await getCollectionData(collectionName);
    const data = result?._docs
      ?.map((item: any) => item?._data)
      ?.sort((a: any, b: any) => a.id - b.id);
    return limit ? data?.slice(0, limit) : data;
  };

  const _renderShimmerEffect = () => {
    return (
      <View>
        <TitleHeaderShimmer />
        <FeaturesCardShimmer size={4} />
      </View>
    );
  };

  const _renderEmptyComponent = () => {
    return <>{isLoading ? _renderShimmerEffect() : <EmptyComponent />}</>;
  };

  const _renderFeaturesItem = ({item}: any) => {
    switch (item.type) {
      case 'header_one':
        return <TitleHeader title={item.title} />;
      case 'popular_features':
        return <FeaturesCard data={item} />;
      case 'header_two':
        return (
          <View style={styles.header_styles}>
            <TitleHeader
              title={item.title}
              isShowAll={true}
              showAllAction={() => navigation.navigate(ROUTES.AI_ASSISTANCE)}
            />
          </View>
        );
      case 'assistant_features':
        return <FeaturesCard data={item} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />
      <View style={styles.screenContainer}>
        <FlatList
          data={featuresForHome}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<SubscriptionCard />}
          renderItem={_renderFeaturesItem}
          keyExtractor={(item, index) => `${item.type}_${index}`}
          ListEmptyComponent={_renderEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.backgroundColor,
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: wp(2.5),
  },
  header_styles: {
    marginVertical: wp(1),
  },
  emptyContainer: {
    marginTop: SCREEN_HEIGHT / 3.8,
  },
  errorMessage: {
    color: theme?.backColor,
    fontFamily: FONT.notoSansRegular,
    fontSize: wp(3.3),
    textAlign: 'center',
  },
});

export default Home;
