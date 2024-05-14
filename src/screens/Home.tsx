import React from 'react';
import {FlatList, View} from 'react-native';
import useAppContext from '../context/useAppContext';
import ProfileHeader from '../components/Home/ProfileHeader';
import SubscriptionCard from '../components/InAppPurchase/SubscriptionCard';
import {POPULAR_FEATURES} from '../../assets/data';
import FeaturesCard from '../components/Home/FeaturesCard';
import TitleHeader from '../components/Header/TitleHeader';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {LABELS} from '../localization/labels';

const Home = () => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});

  const _renderPopularFeatures = () => {
    return (
      <React.Fragment>
        <FlatList
          data={POPULAR_FEATURES}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => {
            return (
              <React.Fragment>
                <SubscriptionCard />
                <TitleHeader title={LABELS.POPULAR} />
              </React.Fragment>
            );
          }}
          renderItem={({item}: any) => <FeaturesCard data={item} />}
          keyExtractor={() => String(Math.random())}
        />
      </React.Fragment>
    );
  };

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <View style={styles.screenContainer}>{_renderPopularFeatures()}</View>
    </View>
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
});

export default Home;
