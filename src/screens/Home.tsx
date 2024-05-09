import React from 'react';
import {FlatList, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import useAppContext from '../context/useAppContext';
import ProfileHeader from '../components/ProfileHeader';
import {useNavigation} from '@react-navigation/native';
import SubscriptionCard from '../components/InAppPurchase/SubscriptionCard';

const Home = () => {
  const navigation: any = useNavigation();
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});

  return (
    <View style={styles.container}>
      {/* Header */}
      <ProfileHeader />

      {/* Body */}
      <FlatList
        data={[]}
        ListHeaderComponent={() => <SubscriptionCard />}
        renderItem={() => <></>}
        keyExtractor={() => String(Math.random())}
      />
    </View>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.backgroundColor,
  },
});

export default Home;
