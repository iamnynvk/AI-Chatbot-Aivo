import React, {useEffect} from 'react';
import {Text, TextInput} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {PaperProvider} from 'react-native-paper';
// Import
import Routes from './src/routes';
import {ContextProvider} from './src/context/ContextProvider';
import {requestMultiplePermissions} from './src/utils/AskPermission';

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
    requestMultiplePermissions();
  }, []);

  return (
    <ContextProvider>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </ContextProvider>
  );
};

export default App;
