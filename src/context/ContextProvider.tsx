import {createContext, useState} from 'react';
import {Alert, Appearance, StatusBar} from 'react-native';
// Imports
import {color, COLORS} from '../constants';
import {COLLECTIONS, FEEDBACK, MODE} from '../enums';
import {
  getCollectedData,
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
  const [themeMode, setThemeMode] = useState<any>('');
  const theme: any = color[colorScheme];
  const [authUser, setAuthUser] = useState<any>();
  const [appInfo, setAppInfo] = useState<any>();
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
        appInfo,
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
              setFeedBack({
                show: true,
                message: message,
                type: FEEDBACK.ERROR,
              });
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
              setFeedBack({
                show: true,
                message: message,
                type: FEEDBACK.ERROR,
              });
            });
            return e;
          }
        },
        fetchCurrentUserData: async (userId: any) => {
          try {
            const userCollection: any = await getUserData(userId);
            setAuthUser(userCollection?._data);
            // Configure theme modes
            const getUserThemeMode: any = await getValueInAsync(
              LABELS?.DARK_MODE,
            );
            if (
              getUserThemeMode == null ||
              getUserThemeMode?.value == undefined
            ) {
              setThemeMode({label: 'System Default', value: 'default'});
              setColorScheme(systemScheme);
            } else {
              if (getUserThemeMode?.value != 'default') {
                setColorScheme(getUserThemeMode?.value);
              }
              setThemeMode(getUserThemeMode);
            }
          } catch (e) {
            handleAuthError(e, (message: any) => {
              setFeedBack({
                show: true,
                message: message,
                type: FEEDBACK.ERROR,
              });
            });
            return e;
          }
        },
        getCollectionData: async (collectionName: string, docName?: string) => {
          try {
            const collectionData: any = await getCollectedData(
              collectionName,
              docName,
            );
            setAppInfo(collectionData);
          } catch (error) {}
        },
        sendResetLink: async (email: string) => {
          try {
            await firebase.auth().sendPasswordResetEmail(email);
          } catch (e) {
            handleAuthError(e, (message: any) => {
              setFeedBack({
                show: true,
                message: message,
                type: FEEDBACK.ERROR,
              });
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
