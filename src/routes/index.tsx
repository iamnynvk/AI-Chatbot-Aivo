import React, {useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
// Imports
import {ROUTES} from './routes';
import {getValueInAsync} from '../utils/AsyncStorage';
import {ON_BOARDING_BUTTON} from '../enums';
import NavigationService from './NavigationService';
import useAppContext from '../context/useAppContext';
// Screens
import OnBoarding from '../screens/OnBoarding';
import InAppPurchase from '../screens/InAppPurchase';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import ForgotPassword from '../screens/ForgotPassword';
import TabNavigation from './TabNavigator';

const Stack = createNativeStackNavigator();

const index = () => {
  const {theme, setAuthUser, fetchCurrentUserData}: any = useAppContext();
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState();
  const [isSeenIntro, setIsSeenIntro] = useState<any>(null);

  // Actions
  function onAuthStateChanged(user: any) {
    setUser(user);
    setAuthUser(user);
    if (user?.email) {
      fetchCurrentUserData();
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    alreadyLaunched();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const alreadyLaunched = async () => {
    const isAlreadyLaunched = await getValueInAsync(
      ON_BOARDING_BUTTON.ALREADY_LAUNCHED,
    );
    setIsSeenIntro(isAlreadyLaunched === true ? true : false);
  };

  if (isSeenIntro === null) return null;

  if (initializing) return null;

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: theme?.backgroundColor,
      background: theme?.backgroundColor,
    },
  };

  return (
    <NavigationContainer
      ref={NavigationService.navigationRef}
      onReady={() => {
        NavigationService.isReadyRef.current = true;
        NavigationService.routeNameRef.current =
          NavigationService.navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={() => {
        const currentRouteName =
          NavigationService.navigationRef.current.getCurrentRoute().name;
        NavigationService.routeNameRef.current = currentRouteName;
      }}
      theme={MyTheme}>
      <Stack.Navigator
        initialRouteName={
          !isSeenIntro ? ROUTES.ONBOARDING : user ? ROUTES.MAIN : ROUTES.SIGN_IN
        }
        screenOptions={{headerShown: false}}>
        <Stack.Group>
          <Stack.Screen name={ROUTES.ONBOARDING} component={OnBoarding} />
          <Stack.Screen name={ROUTES.SIGN_IN} component={SignIn} />
          <Stack.Screen name={ROUTES.SIGN_UP} component={SignUp} />
          <Stack.Screen
            name={ROUTES.FORGOT_PASSWORD}
            component={ForgotPassword}
          />
          <Stack.Screen name={ROUTES.MAIN} component={TabNavigation} />
          <Stack.Screen name={ROUTES.INAPPPURCHASE} component={InAppPurchase} />
          <Stack.Screen name={ROUTES.HOME} component={Home} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
