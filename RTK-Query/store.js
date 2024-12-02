import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './userApi';

const store = configureStore({
  reducer: {
    // RTK Query API için reducer ekliyoruz. Bu, RTK Query'nin verileri saklaması ve yönetmesi için gerekli.
    [userApi.reducerPath]: userApi.reducer,
  },
  // RTK Query'nin middleware'ini ekliyoruz. Bu middleware, cache yönetimi, veri güncellemeleri vb. için kullanılır.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
