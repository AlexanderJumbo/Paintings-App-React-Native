import {NavigationContainer} from '@react-navigation/native';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs()
import React from 'react';
import {AuthProvider} from './hooks/useAuth';
import StatckNavigator from './StackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatckNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
