import * as React from 'react';
import { StatusBar } from 'react-native';

import ReactQueryProvider from './src/providers/ReactQueryProvider';
import NavigationContainer from './src/routes/NavigationContainer';

function App() {
  return (
    <>
      <StatusBar />

      <ReactQueryProvider>
        <NavigationContainer />
      </ReactQueryProvider>
    </>
  );
}

export default App;
