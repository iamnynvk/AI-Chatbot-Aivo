import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Imports
import {logoutUser} from '../utils/Firebase';
import {ROUTES} from '../routes/routes';
import useAppContext from '../context/useAppContext';

const Home = () => {
  const {theme}: any = useAppContext();
  const styles = getStyles({theme});
  const navigation: any = useNavigation();

  const crashApp = () => {
    // throw new Error('This is a test crash!');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        onPress={() =>
          logoutUser()
            .then(() => {
              navigation?.reset({
                index: 0,
                routes: [{name: ROUTES.SIGN_IN}],
              });
            })
            .catch(e => {
              console.log('error : ', e);
            })
        }
        style={{color: '#fff'}}>
        Home
      </Text>

      <Button title="Crash the App" onPress={crashApp} />
    </View>
  );
};

const getStyles = ({theme}: any) => ({});

export default Home;
