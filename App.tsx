import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux'
import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';
import { DatabaseProvider, AuthProvider } from './src/firebase';

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AuthProvider>
            <DatabaseProvider>
              <SafeAreaProvider>
                <Navigation />
                <StatusBar />
              </SafeAreaProvider>
            </DatabaseProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    );
  }
}
