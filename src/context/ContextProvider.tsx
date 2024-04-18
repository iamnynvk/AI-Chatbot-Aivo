import {createContext, useState} from 'react';
import {Alert, Appearance, StatusBar} from 'react-native';
// Imports
import {color} from '../constants';
import {MODE} from '../enums';
import {handleAuthError, signUpWithEmailPassword} from '../utils/Firebase';

export const AppContext = createContext({});

export const ContextProvider = ({children}: any) => {
  const systemScheme = Appearance.getColorScheme();
  const [colorScheme, setColorScheme] = useState<any>(systemScheme);
  const theme: any = color[colorScheme];

  return (
    <AppContext.Provider
      value={{
        systemScheme,
        colorScheme,
        setColorScheme,
        theme,
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
      }}>
      <StatusBar
        animated={false}
        backgroundColor={theme.backgroundColor}
        barStyle={
          colorScheme === 'dark' ? MODE.LIGHT_CONTENT : MODE.DARK_CONTENT
        }
      />
      {children}
    </AppContext.Provider>
  );
};
