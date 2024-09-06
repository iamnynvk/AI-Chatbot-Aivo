import {createContext, useState} from 'react';
import {Alert, Appearance, StatusBar} from 'react-native';
// Imports
import {color, COLORS} from '../constants';
import {FEEDBACK, MODE} from '../enums';
import {
  getUserData,
  handleAuthError,
  signInWithEmailPassword,
  signUpWithEmailPassword,
} from '../utils/Firebase';
import {firebase} from '@react-native-firebase/auth';
import {getValueInAsync} from '../utils/AsyncStorage';
import {LABELS} from '../localization/labels';

export const AppContext = createContext({});

export const ContextProvider = ({children}: any) => {
  const systemScheme = Appearance.getColorScheme();
  const [colorScheme, setColorScheme] = useState<any>(systemScheme);
  const [themeMode, setThemeMode] = useState('');
  const theme: any = color[colorScheme];
  const [authUser, setAuthUser] = useState<any>();
  const [feedBack, setFeedBack] = useState({
    show: false,
    message: '',
    type: null,
  });

  return (
    <AppContext.Provider
      value={{
        systemScheme,
        colorScheme,
        setColorScheme,
        theme,
        feedBack,
        setFeedBack,
        authUser,
        setAuthUser,
        themeMode,
        setThemeMode,
        signUpUser: async (email: string, password: string) => {
          try {
            const confirmation: any = await signUpWithEmailPassword(
              email,
              password,
            );
            return confirmation;
          } catch (e: any) {
            handleAuthError(e, (message: any) => {
              Alert.alert('Aivo', message);
            });
            return e;
          }
        },
        signInUser: async (email: string, password: string) => {
          try {
            const confirmation = await signInWithEmailPassword(email, password);
            return confirmation;
          } catch (e) {
            handleAuthError(e, (message: any) => {
              Alert.alert('Aivo', message);
            });
            return e;
          }
        },
        fetchCurrentUserData: async () => {
          try {
            const userCollection: any = await getUserData(authUser?.uid);
            const getUserThemeMode: any = await getValueInAsync(
              LABELS?.DARK_MODE,
            );
            setThemeMode(getUserThemeMode);
            setAuthUser(userCollection?._data);
            if (getUserThemeMode?.value != 'default') {
              setColorScheme(getUserThemeMode?.value);
            }
          } catch (e) {
            handleAuthError(e, (message: any) => {
              Alert.alert('Aivo', message);
            });
            return e;
          }
        },
        sendResetLink: async (email: string) => {
          try {
            await firebase.auth().sendPasswordResetEmail(email);
          } catch (e) {
            handleAuthError(e, (message: any) => {
              Alert.alert('Aivo', message);
            });
            return e;
          }
        },
      }}>
      <StatusBar
        animated={false}
        backgroundColor={
          feedBack?.type === FEEDBACK.SUCCESS
            ? COLORS.lightGreen
            : feedBack?.type === FEEDBACK.ERROR
            ? COLORS?.danger
            : theme?.backgroundColor
        }
        barStyle={
          colorScheme === MODE.DARK || feedBack?.type === FEEDBACK.SUCCESS
            ? MODE.LIGHT_CONTENT
            : colorScheme === MODE.LIGHT_CONTENT ||
              feedBack?.type === FEEDBACK.SUCCESS
            ? MODE.DARK_CONTENT
            : MODE.DARK_CONTENT
        }
      />
      {children}
    </AppContext.Provider>
  );
};
