import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {globalStyles} from './src/styles/global';
import {ContextProvider} from './src/context/ContextProvider';
import Routes from './src/routes';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ContextProvider>
      <View style={globalStyles.container}>
        <StatusBar
          animated={false}
          backgroundColor={'#FFFFFF'}
          barStyle={'dark-content'}
        />
        <Routes />
      </View>
    </ContextProvider>
  );
};

export default App;
