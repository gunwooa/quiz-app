import * as React from 'react';
import { StatusBar } from 'react-native';

import NavigationContainer from './src/routes/NavigationContainer';

function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer />
    </>
  );
}

export default App;
