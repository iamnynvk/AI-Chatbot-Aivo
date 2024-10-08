import React, {useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
// Imports
import {ROUTES} from './routes';
import {getValueInAsync} from '../utils/AsyncStorage';
import {COLLECTIONS, DOC_NAME, ON_BOARDING_BUTTON} from '../enums';
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
import Setting from '../screens/Setting';
import AivoChat from '../screens/AivoChat';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';
import Mode from '../screens/Mode';

const Stack = createNativeStackNavigator();

const index = () => {
  const {theme, setAuthUser, fetchCurrentUserData, getCollectionData}: any =
    useAppContext();
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState();
  const [isSeenIntro, setIsSeenIntro] = useState<any>(null);

  // Actions
  async function onAuthStateChanged(user: any) {
    setUser(user);
    setAuthUser(user);
    if (user?.email) {
      await fetchCurrentUserData();
      await getCollectionData(COLLECTIONS?.AIVO, DOC_NAME?.APP_INFO);
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
          <Stack.Screen
            name={ROUTES.MAIN}
            component={TabNavigation}
            options={{animation: 'fade_from_bottom', presentation: 'modal'}}
          />
          <Stack.Screen
            name={ROUTES.AIVO_CHAT}
            component={AivoChat}
            options={{animation: 'fade_from_bottom', presentation: 'modal'}}
          />
          <Stack.Screen
            name={ROUTES.VOICE_CHAT}
            component={Chat}
            options={{animation: 'fade_from_bottom', presentation: 'modal'}}
          />
          <Stack.Screen
            name={ROUTES.PROFILE}
            component={Profile}
            options={{animation: 'fade_from_bottom', presentation: 'modal'}}
          />
          <Stack.Screen
            name={ROUTES.INAPPPURCHASE}
            component={InAppPurchase}
            options={{animation: 'fade_from_bottom', presentation: 'modal'}}
          />
          <Stack.Screen name={ROUTES.HOME} component={Home} />
          <Stack.Screen
            name={ROUTES.SETTING}
            component={Setting}
            options={{animation: 'fade_from_bottom', presentation: 'modal'}}
          />
          <Stack.Screen
            name={ROUTES.MODE}
            component={Mode}
            options={{animation: 'fade_from_bottom', presentation: 'modal'}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
