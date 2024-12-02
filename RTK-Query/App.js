import React from 'react';
import { Provider } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
import store from './store';
import { useGetUsersQuery } from './userApi';

const UserList = () => {

  // RTK Query hook'u olan useGetUsersQuery ile API'den verileri çekiyoruz
  const { data, error, isLoading } = useGetUsersQuery();

  if (error) return <Text>Bir hata oluştu</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 18 }}>{item.name}</Text>
          <Text>{item.email}</Text>
        </View>
      )}
    />
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, padding: 50 }}>
        <UserList />
      </View>
    </Provider>
  );
}
