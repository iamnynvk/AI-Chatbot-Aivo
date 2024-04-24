import {createContext, useState} from 'react';
import {Alert, Appearance, StatusBar} from 'react-native';
// Imports
import {color} from '../constants';
import {MODE} from '../enums';
import {
  getUserData,
  handleAuthError,
  signInWithEmailPassword,
  signUpWithEmailPassword,
} from '../utils/Firebase';
import {firebase} from '@react-native-firebase/auth';

export const AppContext = createContext({});

export const ContextProvider = ({children}: any) => {
  const systemScheme = Appearance.getColorScheme();
  const [colorScheme, setColorScheme] = useState<any>(systemScheme);
  const theme: any = color[colorScheme];
  const [authUser, setAuthUser] = useState<any>();

  return (
    <AppContext.Provider
      value={{
        systemScheme,
        colorScheme,
        setColorScheme,
        theme,
        authUser,
        setAuthUser,
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
            setAuthUser(userCollection?._data);
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
        backgroundColor={theme.backgroundColor}
        barStyle={
          colorScheme === MODE.DARK ? MODE.LIGHT_CONTENT : MODE.DARK_CONTENT
        }
      />
      {children}
    </AppContext.Provider>
  );
};
