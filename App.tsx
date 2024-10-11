import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Amplify } from 'aws-amplify';
import React from 'react';
import { StyleSheet } from 'react-native';
import { MD2LightTheme, PaperProvider, configureFonts } from 'react-native-paper';
 import Navigation from './src/navigation/StackNavigation';
import { fontConfig } from './src/theme/fonts';
import { UserContextProvider } from './src/context/user/UserContext';

const cognitoConfig = {
  identityPoolId: '',
  region: "us-east-1",
  userPoolId: "us-east-1_or29XtyUl",
  userPoolWebClientId: "3i7ifajeluo7np0uhf9lu0rt3h"
}


function App(): React.JSX.Element {
  Amplify.configure(cognitoConfig);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        retryDelay: 2000,
      }
    },
  });

  const theme = {
    ...MD2LightTheme,
    fonts: configureFonts({ config: fontConfig, isV3: false }),
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <PaperProvider theme={theme}>
            <Navigation />
          </PaperProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {},
});

export default App;
