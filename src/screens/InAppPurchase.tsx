import React, {useEffect} from 'react';
import {View} from 'react-native';
import useAppContext from '../context/useAppContext';
import {globalStyles} from '../styles/globalStyles';

const InAppPurchase = (props: any) => {
  const {theme}: any = useAppContext();
  const styles = globalStyles({theme});

  useEffect(() => {
    props?.route?.params?.from && watchOnBoarding();
  }, []);

  const watchOnBoarding = () => {
    console.log('Once user seen on-boarding screen');
  };

  return <View style={styles.container}></View>;
};

export default InAppPurchase;
