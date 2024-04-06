import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
// Import
import Routes from './src/routes';
import {ContextProvider} from './src/context/ContextProvider';

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
