import {createContext, useState} from 'react';
import {Appearance, StatusBar} from 'react-native';
import {color} from '../constants';
import {MODE} from '../enums';

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
      <StatusBar
        animated={false}
        backgroundColor={theme.statusBarColor}
        barStyle={MODE.LIGHT_CONTENT}
      />
      {children}
    </AppContext.Provider>
  );
};
