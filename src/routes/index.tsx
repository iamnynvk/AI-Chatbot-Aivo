import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from './routes';
import {getValueInAsync} from '../utils/AsyncStorage';
import {ON_BOARDING_BUTTON} from '../enums';
// Screens
import OnBoarding from '../screens/OnBoarding';
import InAppPurchase from '../screens/InAppPurchase';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const Stack = createNativeStackNavigator();

const index = () => {
  const [isSeenIntro, setIsSeenIntro] = useState<any>(null);

  useEffect(() => {
    alreadyLaunched();
  }, []);

  const alreadyLaunched = async () => {
    const isAlreadyLaunched = await getValueInAsync(
      ON_BOARDING_BUTTON.ALREADYLAUNCHED,
    );
    setIsSeenIntro(isAlreadyLaunched === true ? true : false);
  };

  if (isSeenIntro === null) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isSeenIntro ? ROUTES.SIGNIN : ROUTES.ONBOARDING}
        screenOptions={{headerShown: false}}>
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
