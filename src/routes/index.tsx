import React, {useEffect, useState} from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Imports
import {ROUTES} from './routes';
import {getValueInAsync} from '../utils/AsyncStorage';
import {ON_BOARDING_BUTTON} from '../enums';
// Screens
import OnBoarding from '../screens/OnBoarding';
import InAppPurchase from '../screens/InAppPurchase';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import useAppContext from '../context/useAppContext';

const Stack = createNativeStackNavigator();

const index = () => {
  const {theme}: any = useAppContext();
  const [isSeenIntro, setIsSeenIntro] = useState<any>(null);

  // Actions
  useEffect(() => {
    alreadyLaunched();
  }, []);

  // Functions
  const alreadyLaunched = async () => {
    const isAlreadyLaunched = await getValueInAsync(
      ON_BOARDING_BUTTON.ALREADYLAUNCHED,
    );
    setIsSeenIntro(isAlreadyLaunched === true ? true : false);
  };

  if (isSeenIntro === null) return null;

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: theme?.backgroundColor,
      background: theme?.backgroundColor,
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
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
