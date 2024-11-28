import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import useAppContext from '../context/useAppContext';
import {LABELS} from '../localization/labels';
import Header from '../components/Header/Header';

const History = () => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});

  return (
    <SafeAreaView style={styles.container}>
      <Header isLogo={true} title={LABELS.HISTORY} />
    </SafeAreaView>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default History;
