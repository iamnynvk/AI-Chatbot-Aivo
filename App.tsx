import React, {useEffect} from 'react';
import {Text, TextInput} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
// Import
import Routes from './src/routes';
import {ContextProvider} from './src/context/ContextProvider';

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ContextProvider>
      <Routes />
    </ContextProvider>
  );
};

export default App;
