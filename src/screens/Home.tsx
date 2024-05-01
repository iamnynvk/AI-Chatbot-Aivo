import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useAppContext from '../context/useAppContext';
import ProfileHeader from '../components/ProfileHeader';

const Home = () => {
  const {theme}: any = useAppContext();
  const styles = getStyles({theme});

  return (
    <View style={styles.container}>
      {/* Header */}
      <View>
        <ProfileHeader />
      </View>
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
