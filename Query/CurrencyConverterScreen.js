import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useQuery } from '@tanstack/react-query';

const fetchCurrencyRates = async (currency) => {
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency.toUpperCase()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch currency data');
  }
  return response.json();
};

const CurrencyConverterScreen = () => {
  const [currency, setCurrency] = useState('');

  const { data: rates, error, isFetching, refetch } = useQuery({
    queryKey: ['currencyRates', currency],  // queryKey nesne içinde
    queryFn: () => fetchCurrencyRates(currency),  // queryFn nesne içinde
    enabled: false,  // Sayfa yüklendiğinde otomatik sorgu yapılmasın
    refetchOnWindowFocus: false,  // Odağa geldiğinde tekrar sorgulama
  });

  const handleFetchRates = () => {
    if (currency) {
      refetch();  // Döviz kodu girildiğinde sorguyu manuel olarak tetikleme
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Enter currency code (e.g., USD)"
        value={currency}
        onChangeText={setCurrency}
        style={{
          borderBottomWidth: 1,
          marginBottom: 20,
          width: 200,
          textAlign: 'center',
        }}
      />
      <Button title="Get Rates" onPress={handleFetchRates} />

      {isFetching && <Text>Loading...</Text>}

      {error && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: 'red' }}>Error: {error.message}</Text>
        </View>
      )}

      {rates && (
        <View style={{ marginTop: 20 }}>
          <Text>EUR: {rates.rates.EUR}</Text>
          <Text>USD: {rates.rates.USD}</Text>
          <Text>TRY: {rates.rates.TRY}</Text>
          <Text>JPY: {rates.rates.JPY}</Text>
        </View>
      )}
    </View>
  );
};

export default CurrencyConverterScreen;
