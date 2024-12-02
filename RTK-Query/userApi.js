import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK Query ile bir API oluşturuyoruz
export const userApi = createApi({

  reducerPath: 'userApi', // Bu API için Redux store'da bir ad veriyoruz.

  // Base URL, API isteklerinin yapılacağı temel adres
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),

  // API'nin endpoint'lerini tanımlıyoruz
  endpoints: (builder) => ({
    // Kullanıcıları almak için bir endpoint tanımlıyoruz
    getUsers: builder.query({
      query: () => 'users', // Bu endpoint, 'users' URL'ine bir GET isteği yapar
    }),
  }),
});

// RTK Query, bu API'yi kullanabilmek için bir hook oluşturur.
// Hook'un ismi otomatik olarak 'use' ile başlar ve endpoint ismiyle devam eder.
export const { useGetUsersQuery } = userApi;
