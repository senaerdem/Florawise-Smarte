import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

// Axios Singleton Instance
const axiosInstance = axios.create({
  baseURL: 'https://api.github.com', // GitHub API'nin temel URL'si
  timeout: 5000, // İsteklerin zaman aşımı süresi 5 saniye
});

// Interceptors
// Request Interceptor: İstek yapılmadan önce loglama yapıyoruz
axiosInstance.interceptors.request.use(config => {
  console.log('İstek yapılıyor:', config.url); // Hangi URL'ye istek yapıldığını gösterir
  return config;
}, error => {
  console.error('İstek hatası:', error); // İstek sırasında hata olursa
  return Promise.reject(error);
});

// Response Interceptor: Yanıt alındığında veya hata oluştuğunda loglama yapıyoruz
axiosInstance.interceptors.response.use(response => {
  console.log('Yanıt alındı:', response.status); // Başarılı yanıtın durum kodunu loglar
  return response;
}, error => {
  console.error('Yanıt hatası:', error); // Yanıt sırasında hata olursa
  return Promise.reject(error);
});

const App = () => {
  const [data, setData] = useState(null); // API'den gelen veri burada tutulur
  const [loading, setLoading] = useState(false); // Yüklenme durumu
  const [error, setError] = useState(null); // Hata durumu

  // Axios ile GitHub API'den Veri Çekme
  const fetchDataWithAxios = async () => {
    setLoading(true); // Yüklenme durumunu aktif ediyoruz
    setError(null); // Hata mesajını sıfırlıyoruz
    try {
      const response = await axiosInstance.get('/users/senaerdem');  // GitHub'dan veri çekiyoruz
      setData(response.data); // Gelen veriyi state'e atıyoruz
    } catch (err) {
      setError('Veri çekme başarısız oldu'); // Hata varsa hata mesajını set ediyoruz
    } finally {
      setLoading(false); // İstek bittiğinde yüklenme durumunu kapatıyoruz
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {data && (
        <View>
          <Text style={styles.title}>Kullanıcı: {data.login}</Text>
          <Text>Bio: {data.bio}</Text>
          <Text>Takipçi: {data.followers}</Text>
          <Text>Takip Ettikleri: {data.following}</Text>
          <Text>Repositories: {data.public_repos}</Text>
        </View>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      
      <Button title="GitHub'dan Veri Çek" onPress={fetchDataWithAxios} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
});

export default App;
