import {createContext, useState} from 'react';
import {Appearance} from 'react-native';
import {color} from '../constants';

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
      }}>
      {children}
    </AppContext.Provider>
  );
};
