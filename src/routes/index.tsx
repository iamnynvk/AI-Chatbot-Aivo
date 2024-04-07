import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoardingScreen from '../screens/OnBoarding';
import InAppPurchase from '../screens/InAppPurchase';
import {ROUTES} from './routes';

const Stack = createNativeStackNavigator();

const index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={ROUTES.ONBOARDING} component={OnBoardingScreen} />
        <Stack.Screen name={ROUTES.INAPPPURCHASE} component={InAppPurchase} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
