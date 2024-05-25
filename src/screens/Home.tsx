import React from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import useAppContext from '../context/useAppContext';
import ProfileHeader from '../components/Home/ProfileHeader';
import SubscriptionCard from '../components/InAppPurchase/SubscriptionCard';
import {FEATURES_FOR_HOME} from '../../assets/data';
import FeaturesCard from '../components/Home/FeaturesCard';
import TitleHeader from '../components/Header/TitleHeader';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../routes/routes';

const Home = () => {
  const navigation: any = useNavigation();
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});

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
          data={FEATURES_FOR_HOME}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<SubscriptionCard />}
          renderItem={_renderFeaturesItem}
          keyExtractor={(item, index) => `${item.type}_${index}`}
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
});

export default Home;
