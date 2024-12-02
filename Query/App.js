import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CurrencyConverterScreen from './CurrencyConverterScreen';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyConverterScreen />
    </QueryClientProvider>
  );
};

export default App;
