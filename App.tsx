import React, {useEffect} from 'react';
import {Text, TextInput} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {PaperProvider} from 'react-native-paper';

// Import
import Routes from './src/routes';
import AlertPopUp from './src/components/AlertPopUp';
import {ContextProvider} from './src/context/ContextProvider';
import {requestMultiplePermissions} from './src/utils/AskPermission';
import {initFirebase} from './src/utils/Firebase';

// Prevent font-scaling
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
    initFirebase();
    requestMultiplePermissions();

    const splashTime = setTimeout(() => {
      SplashScreen.hide();
    }, 1500);

    return () => clearTimeout(splashTime);
  }, []);

  return (
    <ContextProvider>
      <PaperProvider>
        <AlertPopUp />
        <Routes />
      </PaperProvider>
    </ContextProvider>
  );
};

export default App;
