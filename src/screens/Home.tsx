import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Components

// Imports
import {logoutUser} from '../utils/Firebase';
import {ROUTES} from '../routes/routes';

const Home = () => {
  const navigation: any = useNavigation();

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
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
