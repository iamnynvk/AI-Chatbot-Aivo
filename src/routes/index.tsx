import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from './routes';
// Screens
import OnBoarding from '../screens/OnBoarding';
import InAppPurchase from '../screens/InAppPurchase';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const Stack = createNativeStackNavigator();

const index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Group>
          <Stack.Screen name={ROUTES.ONBOARDING} component={OnBoarding} />
          <Stack.Screen name={ROUTES.SIGNIN} component={SignIn} />
          <Stack.Screen name={ROUTES.SIGNUP} component={SignUp} />
          <Stack.Screen name={ROUTES.INAPPPURCHASE} component={InAppPurchase} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
