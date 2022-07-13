import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from "@expo-google-fonts/poppins"
import theme from './src/global/styles/theme';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { Dashboard } from './src/screens/Dashboard'; 

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_700Bold
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <View onLayout={onLayoutRootView} style={{flex: 1}}>
        <Dashboard />
      </View>
    </ThemeProvider>
  );
}